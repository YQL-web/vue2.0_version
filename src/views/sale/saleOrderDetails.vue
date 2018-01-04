<template>
  <div class="saleOrderDetails">
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">订单详情</span>
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
          <div class="margin-tab">
            <el-table
              ref="table"
              :data="tableData"
              border
              tooltip-effect="dark"
              :summary-method="getSummaries"
              show-summary
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="bar_code"
                label="商品条码">
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
                prop="goods_number_t"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="goods_unit"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="sale_price_t"
                label="单价">
              </el-table-column>
              <el-table-column
                prop="total_price_t"
                label="金额">
              </el-table-column>
            </el-table>
          </div>
          <div class="center_align" v-if="cargoDispatching">
            <el-button class="sure-btn trade-btn"  @click="cargoDispatchDone">配送</el-button>
            <el-button class="trade-btn">打印</el-button>
          </div>
          <div class="center_align" v-if="dispatching">
            <el-button class="sure-btn trade-btn"  v-if="!dispatchingDone" @click="dispatchDone">配送完成</el-button>
            <el-button class="trade-btn">打印</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import MessageShow from '../../components/MessageShow.vue'
  export default {
    data () {
      return {
        crumbList:[
          {crumb: '销售管理', path: '/sale/saleOrderManage'},
          {crumb: '销售订单', path: '/sale/saleOrderManage'},
          {crumb: '订单详情', path: ''}
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
              {key:'客户分类:',value:'普通客户',keySpan:3,valSpan:5},
              {key:'地址:',value:'成都市高新区银泰中心',keySpan:3,valSpan:13}
            ]
          },
//          {
//            rowData:[
//              {key:'备注:',value:'不要辣椒不要辣椒不要辣椒不要辣椒',keySpan:3,valSpan:21},
//            ]
//          }
        ],
        orderInfo:[
          {
            rowData:[
              {key:'订单号:',value:'',keySpan:3,valSpan:5},
              {key:'订单类型:',value:'代下单',keySpan:3,valSpan:13}
            ]
          },
        ],
        tableData:[
//          {
//            bar_code:'1111',
//            goods_name:'11111',
//            goods_rule:'250ml',
//            goods_number:'2件',
//            goods_unit:'瓶',
//            sale_price:'2',
//            total_price:'120'
//          }
        ],
        cargoDispatching:false,//配货
        dispatching:false,//配送
        dispatchingDone:false //配送完成
      }
    },
    components:{MessageShow},
    created(){
      this.crumbList[2].path = `${this.$route.path}?id=${this.$route.query.id}`;
      this.getList();
      this.getDetails();
    },
    methods:{
      /**
       *获取订单商品列表
       */
      getList(){
        let data = {
          order_id:this.$route.query.id
        }
        this.$http.zmGet(this.server.orderGoodsList,data).then(res=>{
          if(res.code == 200){
            let list  = res.data.list;
            list.forEach(item=>{
              item.sale_price_t= '¥'+item.sale_price.toFixed(2);
              item.total_price_t = '¥'+item.total_price.toFixed(2);
              item.whole_ratio = item.whole_ratio==0?10:item.whole_ratio;
              item.num1= parseInt(item.goods_number/item.whole_ratio);
              item.num2 = item.goods_number%item.whole_ratio;
              item.goods_number_t = `${item.goods_number}(${item.num1}件${item.num2}${item.goods_unit})`;
              this.tableData.push(item)
            })
          }else{

          }
        }).catch(error=>{

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
            let result = res.data;
            this.customerInfo[0].rowData[0].value = result.shipping_shop_name;
            this.customerInfo[0].rowData[1].value = result.shipping_shop_contact;
            this.customerInfo[0].rowData[2].value = result.shipping_shop_phone;
            this.customerInfo[1].rowData[0].value = result.custom_category_name;
            this.customerInfo[1].rowData[1].value = result.shipping_address;
            this.orderInfo[0].rowData[0].value = result.order_code;
            this.$store.state.sale.order_type.forEach(item=>{
              if(item.value == result.order_type)
                this.orderInfo[0].rowData[1].value = item.label;
            })
            if(result.order_type == 1){
              this.orderInfo[0].rowData[1].valSpan = 5;
              this.orderInfo[0].rowData.push({key:'配送时间:',value:result.shipping_expect_date,keySpan:3,valSpan:5})
            }
            let status =  result.order_status;
            switch(true){
              case status == 2:
                this.dispatching = true;
                this.dispatchingDone = true;
                break;
              case status == 4:
                this.cargoDispatching = true;
                this.crumbList[2].crumb = '配货';
                  break;
              case status == 5:
                this.dispatching = true;
                this.dispatchingDone = false;
                    break;
            }
          }else{
            this.$message({
              type: 'success',
              message: res.data
            });
          }
        }).catch(error=>{
          Promise.reject(error)
        })
      },
      /**
       *配货状态=》配送状态
       */
      cargoDispatchDone(){
        let data = {
          order_status:5,
          order_id:this.$route.query.id
        }
        this.$http.zmPost(this.server.orderstatusUpdate,data).then(res=>{
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '配货完成,即将配送！'
            });
            this.$router.push('/sale/saleOrderManage')
          }else{
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }).catch(error=>{
          Promise.reject(error)
        })
      },
      /**
       * 配送完成
       */
      dispatchDone(){
        let data = {
          order_status:2,
          order_id:this.$route.query.id
        }
        this.$http.zmPost(this.server.orderstatusUpdate,data).then(res=>{
          if(res.code == 200){
            this.$message({
              type: 'success',
              message: '配送完成！'
            });
            this.$router.push('/sale/saleOrderManage')
          }else{
            this.$message({
              type: 'error',
              message: res.message
            });
          }
        }).catch(error=>{
          Promise.reject(error)
        })
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
          number += item.goods_number;
          total += item.total_price;
        })
        total = total.toFixed(2);
        sums.push(`商品数量:${number}`)
        sums.push(`总金额:¥${total}`)
        return sums;
      }
    }
  }
</script>

<style lang="scss">
  .saleOrderDetails{
  .information-title{line-height: 36px;background:#eff2f7;margin:20px 0;padding: 0 10px}
  .center_align{margin:30px 0}
  }
</style>
