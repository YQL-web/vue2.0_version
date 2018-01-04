import XLSX from "xlsx";
import tools from '../util/tools'
import http from '../axios'

// 上传基础类
class Upload {
  constructor() {}

  // 导入上传，解析excel
  uploadImport(verifyData) {
    // 打开数据准备界面
    verifyData.dialogs.dataInput = false;
    verifyData.dialogs.dataWait = true;
    let reader = new FileReader();
    reader.onload = function (e) {
      // pre-process data
      var binary = "";
      var bytes = new Uint8Array(e.target.result);
      var length = bytes.byteLength;
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      /* read workbook */
      var wb = XLSX.read(binary, {type:'binary', cellDates:true});
      /* grab first sheet */
      var wsname = wb.SheetNames[0];
      var ws = wb.Sheets[wsname];

      /* generate json */
      // _batchWay.call(this, XLSX.utils.sheet_to_json(ws, {raw: true}), verifyData);
      _batchWay(XLSX.utils.sheet_to_json(ws, {raw: true}), verifyData);
    };

    //解析excel表格错误处理
    try {
      reader.readAsArrayBuffer(verifyData.file);
    } catch (e) {
      verifyData.dialogs.dataWait = false;
      verifyData.dialogs.dataInput = true;
      verifyData.importData.errorTip("解析失败")
    }
  }
}



/*** 私有方法***/
// 前端验证规则
function _validateExcel(arr, verifyData){

  // 验证是excel否有数据
  if(arr.length === 0){
    verifyData.importData.tableData.push(`请填写导入数据`);
    return false
  }
  switch (verifyData.importData.excelType) {
    // 商品管理导入
    case "goods":
      arr.forEach((item)=>{
        // 验证商品条码，必填且整数部分长度小于10
        _validateCommomRequset("*商品条码", /^[a-zA-Z0-9]{3,32}$/, verifyData, item);

        // 验证商品名称，必填且长度<50
        _validateCommomRequset("*商品名称", /^.{1,49}$/, verifyData, item);

        // 验证进价，必填、正数且整数部分<10位
        _validateCommomRequset("*起批数量", /^([1-9][0-9]{0,8}|0)(\.[0-9]{1,4})?$/, verifyData, item);

        // 验证后售价，必填、正数且整数部分小于10位
        _validateCommomRequset("*销售价格(元)", /^([1-9][0-9]{0,8}|0)(\.[0-9]{1,4})?$/, verifyData, item);

      })
      break;
  }

  // 循环遍历后，如果有错误返回fasle
  if(verifyData.importData.tableData.length > 0){
    return false;
  }else{
    return true;
  }
}

// 循环发送请求方法
function _batchWay(arr, verifyData){
  // 解析完成，前端开始验证规则
  if(_validateExcel(arr, verifyData)){
    // 验证成功，发送ajax
    verifyData.dialogs.dataWait = false;
    verifyData.dialogs.dataImport = true;
    verifyData.importData.totalData = arr.length;
  }else{
    // 验证失败，返回导入页面
    verifyData.dialogs.dataWait = false;
    verifyData.dialogs.dataInput = true;
    return false;
  };
  let user = tools.zmGetUser();
  // 参数
  let params = {
    "token": user.token,
  };
  //添加自定义字段
  Object.keys(verifyData.custom).forEach((key) =>{
    params[key] = verifyData.custom[key];
  });
  // 发送请求
  (async() => {
    for(let i =0;i<Math.ceil(arr.length/200);i++){

      // 确认是否取消传输
      if(!verifyData.importData.requestOn){
        return;
      }
      // 拼装数据
      for(let j =0;j<200;j++){
        if( i*200+j+1 > arr.length){
          break;
        }else{
          // 循环组装数组其他参数
          let configObject = {};
          Object.keys(verifyData.importData.exportTitle).forEach((key)=>{
            if(key === "excel_id"){
              // 遍历到excel_id修改index
              configObject[key] = arr[i*200+j].__rowNum__ +1;
            }else{
              // 保证0可以正确导入
              configObject[key] = String(arr[i*200+j][verifyData.importData.exportTitle[key]] !== undefined ? arr[i*200+j][verifyData.importData.exportTitle[key]] : "").trim();
            }
          })

          params[verifyData.importData.excelArrName].push(configObject);
        }
      }
      // 在每次发送之前加上表头
      params[verifyData.importData.excelArrName].unshift(verifyData.importData.exportTitle);
      // 服务器不能接受太大字段，故转成json字符串,php表单限制为1000行
      params[verifyData.importData.excelArrName] = JSON.stringify(params[verifyData.importData.excelArrName]);
      // 给服务器传送批次，从1开始
      params.import_id += i;
      await http.zmPost(verifyData.url, params, 60000)
            .then((req)=>{
            // 请求数据，成功返回后，增加已处理数据,-1因为加上了数据头
            verifyData.importData.dealData += JSON.parse(params[verifyData.importData.excelArrName]).length-1;
            // 改变进度条width
            verifyData.importData.styleObject = {
              width: `${verifyData.importData.dealData/verifyData.importData.totalData*100}%`,
              backgroundColor: "rgb(32,161,254)"
            };

            // 导入完成
            if(verifyData.importData.dealData == verifyData.importData.totalData){
              verifyData.importData.successTip("导入完成")
              verifyData.importData.styleObject.backgroundColor = "rgb(26,189,106)";
              verifyData.importData.titleTip = "数据导入完成";
              verifyData.importData.comfirmBunShow = true;
            }


            // 如果错误添加错误提示
            if(req.code != 200){
              // 服务器异常，整条请求失败，增加失败条数，,-1因为加上了数据头
              verifyData.importData.failData += JSON.parse(params[verifyData.importData.excelArrName]).length-1;
              if(req.message){
                let arr = req.data.message.split("|");
                arr.forEach((item)=>{
                  verifyData.importData.tableData.push(item);
                })
              }
            }else{
              // 服务器返回正常，增加成功条数
              verifyData.importData.successData += req.data.success;
              // 服务器返回正常，增加失败条数
              verifyData.importData.failData += req.data.error;
              // 服务器返回正常，增加重复条数，暂时只支持商品，服务器问题
              if(verifyData.importData.excelType == "goods" || "member"){
                verifyData.importData.repeatData += req.data.repeat;
              }
              if(req.message){
                let arr = req.message.split("|");
                arr.forEach((item)=>{
                  verifyData.importData.tableData.push(item);
                })
              }

              // 如果是进货单，则需要在第二次请求中，添加第一次请求返回order_id
              // params["order_id"] = req.data.order_id;
            }

            // 每次处理完成之后，清空goods数组，便于重新请求
            params[verifyData.importData.excelArrName] = [];
            if(!verifyData.importData.requestOn){
              // 每次处理完成的时候，判断是否处于中断状态
              verifyData.importData.titleTip = "文件导入中断";
              verifyData.importData.styleObject.backgroundColor =  "rgb(238,63,20)";
              verifyData.importData.comfirmBunShow = true;
              verifyData.importData.loading = false;
            }
          })
          .catch((e)=>{
            verifyData.importData.requestOn = false;
            verifyData.importData.titleTip = "文件导入中断";
            verifyData.importData.styleObject.backgroundColor =  "rgb(238,63,20)";
            verifyData.importData.comfirmBunShow = true;
            // 每次处理完成之后，清空goods数组，便于重新请求
            params[verifyData.importData.excelArrName] = [];
            if(e.response){
              verifyData.importData.errorTip(e.response.data.message)
            }else{
              verifyData.importData.errorTip("网络错误，请稍后重试!")
            }
          })
    }
  })();
}

// 必填验证
function _validateCommomRequset(name, Reg, verifyData, item, extraValidate){
  // 保证0可以正确导入
  if(item[name] !== undefined && String(item[name]).trim()){
    let reg = new RegExp(Reg);
    if(!reg.test(String(item[name]).trim())
        || (extraValidate ? extraValidate : false)){
      verifyData.importData.tableData.push(`【第${item.__rowNum__ +1}行】${name}有误`);
      return false;
    }
    return true;
  }else{
    verifyData.importData.tableData.push(`【第${item.__rowNum__ +1}行】${name}必填`);
    return false;
  }
}

// 非填验证
function _validateCommomNotRequset(name, Reg, verifyData, item, extraValidate){
  // 保证0可以正确导入
  if(item[name] !== undefined && String(item[name]).trim()){
    let reg = new RegExp(Reg);
    if(!reg.test(String(item[name]).trim())
        || (extraValidate ? extraValidate : false)){
      verifyData.importData.tableData.push(`【第${item.__rowNum__ +1}行】${name}有误`);
      return false;
    }
    return true;
  }else{
    return true;
  }
}

export default new Upload();
