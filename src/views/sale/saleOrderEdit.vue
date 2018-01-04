<template>
  <div class="saleOrderEdit">
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body" @click="leaveEdit($event)">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">编辑订单</span>
          <!--<div class="right-but">-->
            <!--<el-button  class="trade-btn">删除</el-button>-->
          <!--</div>-->
        </div>
        <div class="trade-table">
          <div class="information">
            <p class="information-title bold">订单客户</p>
            <MessageShow :data="customerInfo"></MessageShow>
          </div>
          <div class="information">
            <p class="information-title bold">订单信息</p>
            <MessageShow :data="orderInfo"></MessageShow>
          </div>
          <div class="information clear-both" style="margin:20px 0px">
            <Search></Search>
            <el-button class="batchDel trade-btn">删除</el-button>
          </div>
          <div class="margin-tab">
            <el-table
              ref="table"
              :data="tableData"
              border
              tooltip-effect="dark"
              :summary-method="getSummaries"
              show-summary
              @cell-dblclick="editNumber"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="bar_code"
                label="商品条码">
                <template slot-scope="scope">
                  <span v-show="!scope.row.add_bar_code">{{scope.row.bar_code}}</span>
                  <el-row v-show="scope.row.add_bar_code">
                    <el-col :span="24"><el-input size="small" v-model="scope.row.bar_code"  class=""  @keyup.native="getGoodsInfo(scope.row,$event)"></el-input></el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="goods_rule"
                label="商品规格">
              </el-table-column>
              <el-table-column
                prop="goods_number"
                label="数量">
                <template slot-scope="scope">
                  <span v-show="!scope.row.editNumberStatus">{{scope.row.goods_number_t}}</span>
                  <el-row v-show="scope.row.editNumberStatus">
                    <el-col :span="12" class="edit-number">
                      <el-col :span="16"><el-input size="small" v-model="scope.row.num1"  class="num1"></el-input></el-col>
                      <el-col :span="8">件</el-col>
                    </el-col>
                    <el-col :span="12" class="edit-number">
                      <el-col :span="16"><el-input size="small" v-model="scope.row.num2"  class="num2"></el-input></el-col>
                      <el-col :span="8">{{scope.row.goods_unit}}</el-col>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_unit"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="sale_price_t"
                label="单价">
                <template slot-scope="scope">
                  <span v-show="!scope.row.editPriceStatus">{{scope.row.sale_price_t}}</span>
                  <el-row v-show="scope.row.editPriceStatus">
                    <el-col :span="24"><el-input size="small" v-model="scope.row.sale_price"  class="price"></el-input></el-col>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column
                prop="total_price_t"
                label="金额">
              </el-table-column>
              <el-table-column fixed="right" prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button type="text"  class="theme-color" @click="delOrder(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="goods-table" :style="{left:goodsTable.left,top:goodsTable.top}" v-show="goods_table">
              <p v-show="goods_table_tips" class="tips">暂无此商品</p>
              <el-table
                :data="goodsData"
                border
                tooltip-effect="dark"
                height="200" v-show="!goods_table_tips"
                @row-dblclick="chooseGoods"
                >
                <el-table-column
                  prop="bar_code"
                  label="商品条码">
                </el-table-column>
                <el-table-column
                  prop="goods_name"
                  label="商品名称">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="btns">
            <el-button class="trade-btn">取消</el-button>
            <el-button class="sure-btn trade-btn">保存</el-button>
            <el-button class="sure-btn trade-btn">发送给客户</el-button>
            <el-button class="sure-btn trade-btn">客户已确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  function getElemPos(obj){
    var pos = {"top":0, "left":0};
    if (obj.offsetParent){
      while (obj.offsetParent){
        pos.top += obj.offsetTop;
        pos.left += obj.offsetLeft;
        obj = obj.offsetParent;
      }
    }else if(obj.x){
      pos.left += obj.x;
    }else if(obj.x){
      pos.top += obj.y;
    }
    return {x:pos.left, y:pos.top};
  }
  import MessageShow from '../../components/MessageShow.vue'
  export default {
    data () {
      return {
        crumbList:[
          {crumb: '销售管理', path: ''},
          {crumb: '销售订单', path: ''},
          {crumb: '编辑订单', path: ''}
        ],
        customerInfo:[
          {
            rowData:[
              {key:'客户名称:',value:'',keySpan:3,valSpan:5},
              {key:'联系人:',value:'',keySpan:3,valSpan:5},
              {key:'手机号:',value:'',keySpan:3,valSpan:5}
            ]
          },
          {
            rowData:[
              {key:'客户分类:',value:'',keySpan:3,valSpan:5},
              {key:'地址:',value:'',keySpan:3,valSpan:13}
            ]
          }
        ],
        orderInfo:[
          {
            rowData:[
              {key:'订单号:',value:'1215454154',keySpan:3,valSpan:5},
              {key:'订单类型:',value:'代下单',keySpan:3,valSpan:13}
            ]
          },
        ],
        tableData:[],
        goodsData:[
//          {bar_code:'1231221321',goods_name:'娃哈哈'}
        ],
        goodsTable:{
          left:"",
          top:""
        },
        goods_table:false,
        goods_table_tips:false,
        details:{},
        currentGoods:''
      }
    },
    components:{MessageShow},
    methods:{
      /**
       *获取订单商品列表
       */
      getList(){
        let data = {
          order_id:this.$route.query.id
        }
        this.$http.zmGet(this.server.orderGoodsList,data).then(res=> {
          let list = res.data.list;
          let length = list.length;
          list.forEach(item=> {
            item.sale_price_t = '¥' + item.sale_price.toFixed(2);
            item.total_price_t = '¥' + item.total_price.toFixed(2);
            item.whole_ratio = item.whole_ratio == 0 ? 10 : item.whole_ratio;
            item.num1 = parseInt(item.goods_number / item.whole_ratio);
            item.num2 = item.goods_number % item.whole_ratio;
            item.goods_number_t = `${item.goods_number}(${item.num1}件${item.num2}${item.goods_unit})`;
            item.editNumberStatus = false;
            item.editPriceStatus = false;
            this.tableData.push(item)
          })
          let num = length < 10 ? 9 - length : 1;
          let baseObj = {};
          for (let i in list[0]) {
            baseObj[i] = ''
          }
          for (let i = 0; i <= num; i++) {
            let item = {}
            for(let k in baseObj){
              item.k = baseObj.k;
              item.add_bar_code = false;
            }
            if(i==0){
              item.add_bar_code = item.editNumberStatus = item.editPriceStatus =true;
            }
            this.tableData.push(item)
          }
        }).catch(error=>{
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      },
      /**
       *获取订单详情
       */
      getDetails(){
        let data = {
          order_id:this.$route.query.id
        }
        this.$http.zmGet(this.server.orderDetails,data).then(res=>{
          if(res.code == 200){
            this.details = res.data;;
            this.customerInfo[0].rowData[0].value = this.details.shipping_shop_name;
            this.customerInfo[0].rowData[1].value = this.details.shipping_shop_contact;
            this.customerInfo[0].rowData[2].value = this.details.shipping_shop_phone;
            this.customerInfo[1].rowData[0].value = this.details.custom_category_name;
            this.customerInfo[1].rowData[1].value = this.details.shipping_address;
            this.orderInfo[0].rowData[0].value = this.details.order_code;
            this.$store.state.sale.order_type.forEach(item=>{
              if(item.value == this.details.order_type)
                this.orderInfo[0].rowData[1].value = item.label;
            })
            if(this.details.order_type == 1){
              this.orderInfo[0].rowData[1].valSpan = 5;
              this.orderInfo[0].rowData.push({key:'配送时间:',value:this.details.shipping_expect_date,keySpan:3,valSpan:5})
            }
            let status =  this.details.order_status;
            if(this.details.remark.length>0){
              this.customerInfo.push(
                {
                  rowData:[
                    {key:'备注:',value:this.details.remark.length,keySpan:3,valSpan:21},
                  ]
                }
              )
            }
          }else{
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }).catch(error=>{
          this.$message.error(this.server.errorCode(error.code, error.message))
        })
      },
      /**
       *根据条码获取商品信息
       */
      getGoodsInfo(row,e){
        if(row.bar_code.length==7){
          let dom = e.target;
          var positionObj = getElemPos(dom)
          var gObj = getElemPos(document.getElementsByClassName('margin-tab')[0])
          this.goodsTable.left = (positionObj.x - gObj.x)+'px';
          this.goodsTable.top = (positionObj.y-gObj.y+dom.offsetHeight)+'px';
          let data = {
            keywords:row.bar_code
          }
          this.$http.zmGet(this.server.getGoods,data).then(res=>{
            this.goods_table = true;
            this.goods_table_tips = false;
            this.goodsData = res.data.list;
            if(res.data.list.length==0){
              this.goods_table = true;
              this.goods_table_tips = true;
              setTimeout(()=>{
                this.goods_table = this.goods_table_tips = false;
              },2000)
            }
          }).catch(error=>{
            this.goods_table = true;
            this.goods_table_tips = true;
            setTimeout(()=>{
              this.goods_table = this.goods_table_tips = false;
            },2000)
          })
        }
      },
      /**
       *从弹出框中选择商品
       */
      chooseGoods(row, event){
        console.log(row)
        let remark = false;
        this.tableData.forEach(item=>{
          if(item.bar_code == row.bar_code){
            remark = true;
          }
        })
        if(remark){
          this.$message({
            type: 'warning',
            message:'该商品已在列表中'
          });
          return false;
        }
//        row.bar_code =
      },
      /**
       * 合计
       * @param param
       */
      getSummaries(param){
        const { columns, data } = param;
        let sums = ['合计'];
        sums.push(`商品种数:${data.length}`)
        let number = 0,total = 0;
        data.forEach(item=>{
          item.goods_number = item.goods_number==''?0:item.goods_number
          item.total_price = item.total_price==''?0:item.total_price
          number += item.goods_number;
          total += item.total_price;
        })
        total = total.toFixed(2);
        sums.push(`商品数量:${number}`)
        sums.push(`总金额:¥${total}`)
        return sums;
      },
      /**
       * 编辑商品数量
       */
      editNumber(row, column, cell, event){
        let className = event.target.parentNode.className
        if(className.indexOf('num1')>=0||className.indexOf('num2')>=0)return false;
        if(column.property == 'goods_number'){
          row.editNumberStatus = true;
          this.currentGoods = row.goods_id;
          setTimeout(function(){
            cell.getElementsByTagName("input")[0].focus();
          },1)
        }else{
          this.currentGoods = false;
          row.editNumberStatus = false;
        }
      },
      /**
       *离开编辑状态
       */
      leaveEdit(e){
        if(!this.currentGoods) return false;
        let dom = e.target || e.srcElement;
        let className = e.target.parentNode.className
        if(className.indexOf('num1')>=0||className.indexOf('num2')>=0)return false;
        let regExp = /^[0-9]+$/;
        this.tableData.forEach(item=>{
          if(item.goods_id == this.currentGoods){
            if(regExp.test(item.num1)&&regExp.test(item.num2)){
              item.editNumberStatus = false;
              item.goods_number = Number(item.whole_ratio*item.num1)+Number(item.num2);
              item.goods_number_t = `${item.goods_number}(${item.num1}件${item.num2}${item.goods_unit})`;
              item.total_price_t = '¥'+(item.sale_price*item.goods_number).toFixed(2);
              return false;
            }
            else{
              this.$message({
                type: 'error',
                message: '请填写正整数'
              });
              return false;
            }
          }
        })
      },
      /**
       * 删除当前行
       * @param row 当前行数据
       */
      delOrder(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            goods_ids:[row.goods_id],
            order_id:this.$route.query.id
          }
          this.$http.zmPost(this.server.orderDelete,data).then(res=>{
            if(res.code == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
            }else{
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          }).catch(error=>{
            Promise.reject(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    created(){
      this.getList();
      this.getDetails();
    }
  }
</script>

<style lang="scss">
  .saleOrderEdit{
  .information-title{line-height: 36px;background:#eff2f7;margin:20px 0;padding: 0 10px}
  .btns{margin:30px auto;width: 490px;}
  .btns .el-button{width: 112px}
  .search{float: left}
  .batchDel{float: right}
  .margin-tab{position: relative}
  .goods-table{position: absolute;width: 300px;}
  .goods-table .tips{
    border: 1px solid #000000;
    width: 120px;
    font-size: 14px;
    padding: 20px;
    background: #ffffff;
    border-radius: 5px;;
  }
  }
</style>
