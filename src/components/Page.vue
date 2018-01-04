<template>
  <div v-if="total>0" class="clear-float">
    <div class="trade-pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <p class="total">共<span>{{total}}</span>{{describe}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    props: {
      pageData: {
        type: Object,
        default: {
          total: 0,
          page: 1,
          limit: 10,
          describe: ""
        }
      }
    },
    data() {
      return {
        currentPage: 1,
        size: 100,
        total: 500,
        describe: ''
      }
    },
    watch: {
      'pageData.total'(val){
        this.pageData.total = val;
        this.initData();
      },
      'pageData.page'(val){
        this.pageData.page = val;
        this.initData();
      },
      'pageData.limit'(val){
        this.pageData.limit = val;
        this.initData();
      },
      'pageData.describe'(val){
        this.pageData.describe = val;
        this.initData();
      }
    },
    mounted(){
      this.initData();
    },
    created(){

    },
    methods: {
      handleSizeChange(val) {
        this.$emit("handleSizeChange", val)
      },
      handleCurrentChange(val) {
        this.$emit("handleCurrentChange", val)
      },
      initData(){
        let {total, size, currentPage, describe} = this.pageData;
        this.currentPage = currentPage
        this.total = total
        this.size = size
        this.describe = describe
      }
    }
  };
</script>

<style>
  .clear-float {
    overflow: hidden;
    *zoom: 1;
    min-width: 650px;
  }

  .total {
    margin-top: 26px;
    float: left;
    font-size: 14px
  }
</style>
