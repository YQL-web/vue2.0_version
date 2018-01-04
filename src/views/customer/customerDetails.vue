<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">客户销量</span>
          <div class="right-but">
            <el-button  class="trade-btn" type="primary">补货提示</el-button>
            <el-button  class="trade-btn" type="primary">代下单</el-button>
          </div>
        </div>
        <div class="trade-table">
          <div class="information">
            <MessageShow :data="message"></MessageShow>
          </div>
          <div class="search-c">
            <Search></Search>
          </div>
          <div class="margin-tab">
            <el-table
              ref="table"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="code"
                label="条形码">
              </el-table-column>
              <el-table-column
                prop="goods_name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="goods_spec"
                label="商品规格">
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="inventory"
                label="库存">
              </el-table-column>
              <el-table-column
                prop="last_number"
                label="上次送货量">
              </el-table-column>
              <el-table-column
                prop="last_date"
                label="上次送货日期">
              </el-table-column>
              <el-table-column
                prop="sales_volume"
                label="近30日销量">
              </el-table-column>
              <el-table-column
                prop="single_quantity"
                label="代下单数量">
              </el-table-column>
            </el-table>
          </div>
          <Page v-bind:pageData="pageData"></Page>
          <div class="center_align">
            <el-button @click="returnTo" class="trade-btn">返回</el-button>
          </div>
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
          {crumb: '客户管理', path: ''},
          {crumb: '客户管理', path: ''},
          {crumb: '客户销量', path: ''}
        ],
        message:[
          {
            rowData:[
              {key:'客户名称:',value:'美美乐超市',keySpan:3,valSpan:5},
              {key:'手机号:',value:'18445365421',keySpan:3,valSpan:5},
              {key:'联系人:',value:'汪老板',keySpan:3,valSpan:5}
            ]
          },
          {
            rowData:[
              {key:'客户分类:',value:'普通客户',keySpan:3,valSpan:5},
              {key:'手机号:',value:'18445365421',keySpan:3,valSpan:13}
            ]
          }
        ],
        tableData:[
          {
            code:12222222,
            goods_name:'娃哈哈',
            goods_spec:'250ml',
            unit:'瓶',
            inventory:'100',
            last_number:'200',
            last_date:'2017.12.12',
            sales_volume:'100',
            single_quantity:'200'
          }
        ],
        pageData:{
          total:200,
          size:100,
          currentPage:1,
          describe:'个客户'
        }
      }
    },
    components:{MessageShow},
    methods:{
      returnTo(){
        this.$router.push('/customer/customerList')
      }
    },
    mounted(){
    },
    created(){

    },
    beforeDestroy(){

    }
  }
</script>

<style scoped lang="scss">
  .search-c{margin:20px 0}
  .total{margin-top:26px;float:left}
  .clear-float{overflow: hidden;*zoom:1;min-width: 650px;}
</style>
