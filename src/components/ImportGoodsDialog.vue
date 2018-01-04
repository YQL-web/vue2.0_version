<!--
 * @Author: 曾崇云
 * @Date: 2017年5月24日 10:12:25
 * @Last Modified by: 曾崇云
 * @Last Modified time: 2017年5月24日 10:12:31
 * @Description: 导入excel
 -->
<style>
  .importGoodsDialog .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .importGoodsDialog .row {
    height: 35px;
    overflow: hidden;
  }

  .importGoodsDialog .title {
    color: #000000;
  }

  .importGoodsDialog .el-dialog--small {
    min-width: 650px;
    max-width: 650px;
    position: absolute;
  }

  .importGoodsDialog .marginL-15 {
    margin-left: 15px
  }

  .importGoodsDialog .tipData {
    padding: 20px 0 0;
    color: red;
  }

  .importGoodsDialog .success {
    color: green;
  }

  .importGoodsDialog .dangerous {
    color: red;
  }

  .importGoodsDialog .repeat {
    color: #f7b52c;
  }

  .importGoodsDialog .dataWait {
    text-align: center;
  }

  .rotate:before {
    font-size: 104px;
    color: #20a0ff;
    display: inline-block;
    -webkit-animation: rotate 1s linear infinite;
    -moz-animation: rotate 1s linear infinite;
    -o-animation: rotate 1s linear infinite;
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
    }
  }

  .dataImport {
    position: relative;
    width: 500px;
  }

  .dataImport .tip {
    position: relative;
    width: 500px;
    font-weight: bold;
  }

  .dataImport .tatal {
    position: absolute;
    top: 24px;
    left: 510px;
  }

  .importGoodsDialog .dataImport .title {
    font-weight: bold;
    margin-bottom: 6px;
  }

  .importGoodsDialog .dataImport .progress {
    height: 20px;
    margin-bottom: 6px;
    overflow: hidden;
    background-color: #ddd;
    border-radius: 4px;
  }

  .importGoodsDialog .dataImport .progressBar {
    width: 0%;
    height: 100%;
    background-color: #337ab7;
    -webkit-transition: width .6s ease;
    -o-transition: width .6s ease;
    transition: width .6s ease;

    animation: all 20s linear infinite;

    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, .15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, .15) 50%,
      rgba(255, 255, 255, .15) 75%,
      transparent 75%,
      transparent
    );
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, .15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, .15) 50%,
      rgba(255, 255, 255, .15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
  }

  @keyframes all {
    from {
      background-position: 0
    }

    to {
      background-position: 1000px;
    }
  }

  .errorCon {
    margin-top: 20px;
    font-size: 14px;
    border: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .errorCon .tit {
    line-height: 25px;
    background-color: #eff2f7;
    padding: 0 10px;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
    margin-bottom: 5px;
  }

  .errorCon span {
    overflow: auto;
    color: red;
    line-height: 20px;
    display: block;
    width: 100%;
    padding-left: 10px;
  }

  .float-left {
    float: left;
  }

  .class-title {
    height: 30px;
    line-height: 30px;
  }

  .import-input {
    width: 200px;
  }

  .upload-panel {
    overflow: hidden;
    margin-top: 10px;
  }

  .red-tip {
    color: #FF4949;
  }

  .text-center {
    text-align: center;
  }

  .marginT-15 {
    margin-top: 20px;
  }
</style>
<template>
  <div>
    <el-dialog
      title="导入"
      class="importGoodsDialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape='true'
      @close="closeModel"
      width="580px">
      <!-- 数据上传界面 -->
      <div v-show="dialogs.dataInput" class="dataInput">
        <div class="row">
          <span class="title">1.</span>
          <a :href="templateAddress">
            <el-button class="from-text-btn" type="text">
              <i class="icon-icon_download"></i>下载导入模板
            </el-button>
          </a>
        </div>
        <div class="row">
          <span class="title">2.&nbsp;选择导入分类</span>
        </div>
        <div v-if="category"
             class="row middle_category">
          <!-- 联动组件 -->
          <span class="float-left class-title">商品分类：</span>
          <commodity-class :isAll="0" v-model="categoryData" @changeCategory="changeCategory"
                           class="float-left"></commodity-class>
        </div>
        <div class="upload-panel">
          <span class="float-left class-title">导入文件：</span>
          <div class="upload-selector">
            <input type="text"
                   autocomplete="off"
                   class="el-input__inner"
                   v-model="path">
            <button type="button"
                    class="el-button textBtnblue el-button--text">
              <span>选择文件</span>
            </button>
            <input type="file"
                   accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                   id="JS_upload_member"
                   @change="selectFile">
          </div>
          <el-button class="trade-btn" type="primary" @click="importMember">上传</el-button>
        </div>
        <div class="upload-panel red-tip">
          *导入文件为.xls的excel文件，最高导入1万条
        </div>
      </div>
      <!-- 准备数据dialog -->
      <div v-if="dialogs.dataWait"
           class="dataWait">
        <i class="zm-icomoon-common_icon_loading rotate"></i>
        <p>数据准备中，请稍候...</p>
      </div>

      <!-- 导入数据dialog -->
      <div v-if="dialogs.dataImport"
           class="dataImport">
        <p class="title">{{importData.titleTip}}</p>
        <div class="progress">
          <div class="progressBar"
               :style="importData.styleObject">
          </div>
        </div>
        <div class="tatal">
          <span>{{importData.dealData}}/{{importData.totalData}}</span>
        </div>
        <div class="tip">
          <span class="success">成功导入{{importData.successData}}条，</span>
          <span class="dangerous">{{importData.failData}}条失败，</span>
          <span class="repeat"
                v-if="importData.excelType === 'goods' || 'member'">{{importData.repeatData || 0}}条重复</span>
        </div>

      </div>

      <!-- 错误提示方式 -->
      <div v-if="importData.tableData.length > 0"
           class="errorCon">
        <div class="tit">错误内容</div>
        <div style="max-height:300px;overflow-y:auto;overflow-x:hidden;">
          <span v-for="item in importData.tableData">{{item}}；</span>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div v-if="dialogs.dataImport"
           class="text-center oper_button marginR-0 marginT-15">
        <el-button v-if="!importData.comfirmBunShow"
                   :loading="importData.loading"
                   class="trade-btn"
                   @click="cancelImport">取 消
        </el-button>
        <el-button v-if="importData.comfirmBunShow"
                   type="primary"
                   class="trade-btn"
                   @click="closeModel">关 闭
        </el-button>
      </div>
      <!-- 底部操作按钮 -->
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
  //加载相关依赖
  import CommodityClass from './CommodityClass'
  import upload from '../util/upload';

  export default {
    props: {
      category: {
        type: Boolean,
        default: true
      },
      address: {
        require: true
      },
      importParams: {
        require: true
      },
      templateAddress: {
        require: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible(val){
        this.dialogVisible = val;
      }
    },
    data() {
      return {
        categoryData: {  //初始化商品分类
          categoryId: "",
          childId: ""
        },
        //模态框开关
        dialogVisible: false,

        // 导入文件
        file: "",

        //显示文件路径
        path: '',

        //分类ID
        category_id: '',

        // 导入模态框相关数据，该数据需要使用引用类型，传入其他方法中处理
        importData: {
          // 导入说明条
          titleTip: "文件导入中，请稍候...",
          // 文件进度条
          styleObject: {
            width: "0%",
            backgroundColor: "rgb(23,191,106)"
          },

          // 导入表头
          exportTitle: this.importParams.exportTitle,
          // 导入excel名字，方便根据不用execl验证问题
          excelType: this.importParams.excelType,
          // excel表格数据字段头
          excelArrName: this.importParams.excelArrName,

          // 已经处理的数目
          dealData: 0,
          // 处理成功数目
          successData: 0,
          // 处理失败数目
          failData: 0,
          // 处理重复数目
          repeatData: 0,
          // 总数目
          totalData: 0,
          // 错误提示
          tableData: [],

          // 是否继续发送请求，针对取消
          requestOn: true,

          // 是否将确认取消替换为确认按钮，当导入数据中断或者数据完成的时候
          comfirmBunShow: false,

          // 取消按钮的loading状态，针对取消
          loading: false,
          errorTip: (err) => {
            this.$message.error(err)
          },
          successTip: (res) => {
            this.$message.success(res)
            this.$emit("success", 1)
          }
        },

        // 相关模态框
        dialogs: {
          dataInput: true,
          dataWait: false,
          dataImport: false
        },

      }
    },
    mounted(){
      this.dialogVisible = this.visible;
    },
    methods: {

      changeCategory(category_id){
        this.category_id = category_id;
      },
      //选择文件
      selectFile() {
        this.file = document.querySelector("#JS_upload_member").files[0];
        if (this.file) {
          this.path = this.file.name;
        } else {
          this.path = "";
        }
      },

      //点击上传
      importMember() {
        // 点击上传判断，文件是否存在
        if (!this.file) {
          this.$message.error('请选择文件');
          return;
        }
        if (!this.category_id) {
          this.$message.error('请选择分类');
          return;
        }
        if (!this.categoryData.childId) {
          this.$message.error('请选择第二级分类');
          return;
        }
        // 组装上传参数
        let verifyData = {
          file: this.file,
          url: this.address,
          custom: Object.assign(
            {"category_id": this.category_id ? this.category_id : 0},
            _.cloneDeep(this.importParams.custom)
          ),
          importData: this.importData,
          dialogs: this.dialogs
        };

        // 每次上传之前，清空错误提示
        this.importData.tableData = [];

        upload.uploadImport(verifyData);

      },

      // 取消上传
      cancelImport(){
        this.$confirm("确定要取消本次导入操作吗？", "提示", {type: "warning"})
          .then(_ => {
            this.importData.requestOn = false;
            this.importData.loading = true;
          }).catch(x => {
        });
      },

      closeModel() {
        this.$emit('close')
      },
    }
    ,
    components: {
      CommodityClass
    }
  }

</script>
