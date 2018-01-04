<template>
  <div class="">
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">销售订单</span>
        </div>
        <div class="trade-table">
          <div class="condition-search">
            <div class="search-item">
              <TimeSlot @changeTime="getTime"></TimeSlot>
            </div>
            <div class="search-item">
              <el-button size="small" class="sure-btn" @click="search">查询</el-button>
            </div>
          </div>
          <div class="condition-search">
            <div class="search-item">
              <el-input placeholder="请输入内容" v-model="searchData.keywords" size="small" class="search-input">
              </el-input>
            </div>
            <div class="search-item">
              <SearchSelect :rawData="order_type" :eventName="order_typeEvent" @getorder_type="getorder_type"></SearchSelect>
            </div>
            <div class="search-item">
              <SearchSelect :rawData="order_status" :eventName="order_statusEvent" @getorder_status="getorder_status"></SearchSelect>
            </div>
            <div class="search-item ads">
              <span class="title">地区：</span>
              <AdsSelect @getAds="getAds" class="select-content" :size="size" ></AdsSelect>
            </div>
            <div class="search-item">
              <p class="clear-condition">清空筛选条件</p>
            </div>
          </div>
          <div class="margin-tab">
            <el-table
              v-loading="tableLoading"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="order_code"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="下单时间">
              </el-table-column>
              <el-table-column
                prop="shop_name"
                label="超市名称">
              </el-table-column>
              <el-table-column
                prop="shop_contact"
                label="超市联系人">
              </el-table-column>
              <el-table-column
                prop="shop_phone"
                label="联系电话">
              </el-table-column>
              <el-table-column
                prop="area"
                label="地区">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="订单金额">
              </el-table-column>
              <el-table-column
                prop="order_type_name"
                label="订单类型">
              </el-table-column>
              <el-table-column
                prop="order_status_name"
                label="处理状态">
              </el-table-column>
              <el-table-column
                fixed="right"
                prop="handle"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text"  @click="handleClick(scope.row)" class="el-button--text">{{scope.row.order_status==0?'编辑':'详情'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <Page :pageData="pageData" @handleCurrentChange="handleCurrentChange"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TimeSlot from '../../components/TimeSlot.vue'
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  function formatRegion(data,...option){
    let province_name = '',city_name = '',area_name = '';
    let [province_id,city_id,area_id] = option;
    data.forEach(item=>{
      if(item.province_id == province_id){
        province_name = item.province_name|| ''
        item.child.forEach(op=>{
          if(op.city_id == city_id){
            city_name = op.city_name || ''
            item.child.forEach(t=>{
              if(t.area_id == area_id)
                area_name = t.area_name || ''
            })
          }
        })
      }
    })
    let des = province_name+' '+city_name+' '+area_name
    return des;
  }
  function getCodeName(code,data){
    let name = '';
    for(let i in data){
      if(code == data[i].value)
        name = data[i].label
    }
    return name;
  }

  export default {
    data () {
      return {
        crumbList:[
          {crumb: '销售管理', path: ''},
          {crumb: '销售订单', path: ''},
        ],
        size:'small',
        searchData:{
          start_time:'',
          end_time:'',
          keywords:'',
          order_type:'',
          order_status:'',
          province_id:'',
          city_id:'',
          area_id:'',
          page:''
        },
        order_type:{
          title:'订单类型：',
          data:[]
        },
        order_typeEvent:'getorder_type',
        order_status:{
          title:'处理状态：',
          data:[]
        },
        order_statusEvent:'getorder_status',
        tableData:[
//          {
//            order_code:1122112211,
//            create_time:'12.12',
//            shop_name:'红旗超市',
//            shop_contact:'小黑狗',
//            shop_phone:1866542441,
//            area:'成都市 高新区',
//            amount:"10000",
//            order_type_name:'代下单',
//            order_status_name:'处理中',
//            state:0
//          }
        ],
        tableLoading:false,
        pageData:{
          total:200,
          size:100,
          currentPage:1,
          describe:'个商品'
        },
        adsData:[]
      }
    },
    components:{TimeSlot},
    methods:{
      /**
       *获取地区列表
       */
      getRegion(){
        return this.$http.zmGet(this.server.getRegion,{}).then(res=>{
          if(res.code == 200){
            let data =  res.data.list
            data.unshift({
              province_id:'',
              province_name:'全部',
              child:[{
                city_id:'',
                city_name:'全部',
                child:[{
                  area_id:'',
                  area_name:'全部'
                }]
              }]
            })
            this.adsData = data;
          }else{

          }
        }).catch(error=>{
          Promise.reject(error)
        })
      },
      /**\
       * 获取订单类型
       */
      getorder_type(res){
        this.searchData.order_type = res;
      },
      /**
       *获取订单状态
       */
      getorder_status(res){
        this.searchData.order_status = res;
      },
      /**
       * 得到地区信息
       */
      getAds(res){
        this.searchData.province_id =  res.province.id;
        this.searchData.city_id =  res.city.id;
        this.searchData.area_id =  res.area.id;
      },
      /**
       * 获取日期
       */
      getTime(start_time,end_time){
        this.searchData.start_time = start_time;
        this.searchData.end_time = end_time;
      },
      /**
       *初始化下拉框数据
       */
      initSelectData(){
        this.order_type.data = this.$store.state.sale.order_type;
        this.order_status.data = this.$store.state.sale.order_status
      },
      /**
       * 点击按钮
       * @param row当前行数据对象
       */
      handleClick(row){
        if(row.order_status == 0){
          this.$router.push({path: 'saleOrderEdit' , query: {id:row.order_id}});
        }else if(row.order_status == 3){
          this.$router.push({path: 'saleOrderSure' , query: {id:row.order_id}});
        }else{
          this.$router.push({path: 'saleOrderDetails' , query: {id:row.order_id}});
        }
      },
      /**
       * 搜索
       */
      search(){
        this.searchData.page = this.pageData.currentPage = 1;
        this.getList(this.searchData)
      },
      /**
       *分页跳转
       */
      handleCurrentChange(currentPage){
        if(currentPage==this.pageData.currentPage) return false;
        this.pageData.currentPage = currentPage;
        this.searchData.page = currentPage;
        this.getList(this.searchData)
      },
      /**
       * 获取列表信息
       * @param data
         */
      getList(data){
        this.tableLoading = true;
        this.$http.zmGet(this.server.orderList,data).then(res=>{
          if(res.code == 200){
            let result = res.data;
            this.pageData = {
              total:result.pagination.total_num,
              size:result.pagination.limit,
              currentPage:result.pagination.page,
              describe:'个商品'
            }
            this.tableLoading = false;
            this.tableData = [ ];
            result.list.forEach(item=>{
              item.create_time = new Date(item.create_time*1000).Format('yyyy/MM/dd hh:mm')
              item.area = formatRegion(this.adsData,item.province_id,item.city_id);
              item.amount = '¥'+item.amount.toFixed(2);
              item.order_type_name = getCodeName(item.order_type,this.$store.state.sale.order_type)
              item.order_status_name = getCodeName(item.order_status,this.$store.state.sale.order_status)
              this.tableData.push(item)
            })
          }
          else{
            this.$message({
              type: 'error',
              message:res.message
            });
            this.tableLoading = false;
          }
        }).catch(error=>{
          Promise.reject(error)
        })
      }
    },
    created(){
      this.getRegion().then(res=>{
        return this.getList(this.searchData)
      })
      this.initSelectData()
    }
  }
</script>

<style scoped>
  .ads{min-width: 525px;}
  .clear-condition{line-height: 32px;}
</style>
