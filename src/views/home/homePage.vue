<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div v-loading="loading">
        <div class="order-data">
          <div class="order-data-item">
            <div class="item-content">
              <span class="order-icon">
                <i class="icon-shouye_icon_1"></i>
              </span>
              <div class="order-message">
                <div class="item title">待确认</div>
                <div class="item number">{{pendingData.wait_confirm}}</div>
              </div>
            </div>
          </div>
          <div class="order-data-item">
            <div class="item-content">
              <span class="order-icon">
                <i class="icon-shouye_icon_2"></i>
              </span>
              <div class="order-message">
                <div class="item title">待配货</div>
                <div class="item number">{{pendingData.wait_picking}}</div>
              </div>
            </div>
          </div>
          <div class="order-data-item">
            <div class="item-content">
             <span class="order-icon">
                <i class="icon-shouye_icon_3"></i>
              </span>
              <div class="order-message">
                <div class="item title">待配送</div>
                <div class="item number">{{pendingData.wait_distribution}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-item">
          <div class="content-title">
            <span class="tip">今日订单情况</span>
            <span class="time">{{toDay}}</span>
          </div>
          <div class="order-table trade-table">
            <el-table
              :data="todayData"
              border
              class="aaa"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="类目">
              </el-table-column>
              <el-table-column
                prop="online_number"
                label="在线订单">
              </el-table-column>
              <el-table-column
                prop="for_number"
                label="代下单">
              </el-table-column>
              <el-table-column
                prop="total_number"
                label="总计">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="order-item">
          <div class="content-title">
            <span class="tip">当月订单情况</span>
            <span class="time">{{month}}</span>
          </div>
          <div class="order-table trade-table">
            <el-table
              :data="monthData"
              border
              class="aaa"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="类目">
              </el-table-column>
              <el-table-column
                prop="online_number"
                label="在线订单">
              </el-table-column>
              <el-table-column
                prop="for_number"
                label="代下单">
              </el-table-column>
              <el-table-column
                prop="total_number"
                label="总计">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loading: false,
        pendingData: {
          "wait_picking":1,                //类型：Number  必有字段  备注：待配货
          "wait_distribution":1,          //类型：Number  必有字段  备注：待配送
          "wait_confirm":1                //类型：Number  必有字段  备注：待确认
        },
        toDay: "",
        month: "",
        crumbList: [
          {
            crumb: "首页",
            path: ""
          }
        ],
        tableData: new Array(2),
        monthData: [],
        todayData: []
      }
    },
    mounted(){
      this.renderList();
      this.formatTime();
    },
    methods: {
      renderList(){
        this.loading = true;
        this.$http.zmPost(this.server.home,{}).then(res=>{
          if(res.code == 200){
            let data = res.data;
            this.loading = false;
            this.pendingData = data.pending;
            let tSales =  data.today.sales ,tOrder = data.today.order;
            this.todayData[0] = {name:'订单数', online_number:tOrder.online_order_number, for_number:tOrder.for_order_number, total_number:tOrder.total_number}
            this.todayData[1] = {name:'销售额', online_number:tSales.online_order_amount, for_number:tSales.for_order_amount, total_number:tSales.total_amount}
            let mSales =  data.month.sales ,mOrder = data.month.order;
            this.monthData[0] = {name:'订单数', online_number:mOrder.online_order_number, for_number:mOrder.for_order_number, total_number:mOrder.total_number}
            this.monthData[1] = {name:'销售额', online_number:mSales.online_order_amount, for_number:mSales.for_order_amount, total_number:mSales.total_amount}
          }
        }).catch(function (error) {
          this.loading = false;
        });
      },
      formatTime(){
        let date = new Date();
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
        let D = (date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate());
        this.toDay = Y+"/"+M+"/"+D;
        this.month = Y+"/"+M;
      }
    }
  }
</script>

<style scoped>

</style>
