<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">商品管理</span>
          <div class="right-but">
            <el-button @click="showModel" class="trade-btn tip-btn" type="primary">添加品牌</el-button>
          </div>
        </div>
        <div class="trade-table">
          <div class="condition-search">
            <Search @search="search"></Search>
          </div>
          <div class="margin-tab">
            <el-table
              v-loading="tableLoading"
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="brand_name"
                label="品牌">
              </el-table-column>
              <el-table-column
                prop="goods_number"
                label="品牌商品数">
              </el-table-column>
              <el-table-column
                fixed="right"
                prop="address"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit(scope)">编辑</el-button>
                  <el-button type="text" @click="del(scope)">删除</el-button>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <Page :pageData="pageData" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></Page>
        </div>
      </div>
    </div>
    <el-dialog
      title="添加品牌"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>品牌名称：</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-input class="from-input" v-model="brand_name"></el-input>
                    <div class="error-tip">{{errorTip}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="from-sub">
        <el-button class="trade-btn" type="primary" @click="save">保存</el-button>
      </div>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        dialogVisible: false,//弹窗
        errorTip:'',//添加|编辑错误信息
        brand_name:'',//商品名称
        brand_id:'',
        handleState:'',//添加|编辑的标识,0添加,1编辑
        keywords:'',//搜索商品名称关键字
        crumbList: [
          {
            crumb: "商品管理",
            path: ""
          },
          {
            crumb: "品牌列表",
            path: ""
          }
        ],
        tableData: [
//          {
//            brand_id: 1,
//            brand_name: "娃哈哈",
//            goods_number: "200"
//          }
        ],
        tableLoading:false,
        pageData:{}
      }
    },
    created(){
      let data = {
        keywords:this.keywords
      }
      this.getList(data);
    },
    methods: {
      /**
       * 添加品牌
       */
      showModel(){
        this.handleState = 0;
        this.dialogVisible = true;
        this.brand_name = '';
        this.errorTip = '';
      },
      /**
       * 编辑信息
       */
      edit(target){
        this.handleState = 1;
        this.dialogVisible = true;
        this.brand_name =  target.row.brand_name;
        this.brand_id = target.row.brand_id;
        this.errorTip = '';
      },
      /**
       * 删除品牌
       */
      del(target){
        this.brand_id = target.row.brand_id;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {brand_id:this.brand_id}
          this.$http.zmPost(this.server.brandDelete,data).then(res=>{
            if(res.code == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList({});
            }else{
              this.$message({
                type: 'success',
                message: res.data
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
      /**
       * 查询
       */
      search(res){
        this.keywords = res;
        let data = {
          keywords:this.keywords
        }
        this.getList(data);
      },
      handleSizeChange(){

      },
      /**
       * 页码跳转
       */
      handleCurrentChange(currentPage){
        if(currentPage==this.pageData.currentPage) return false;
        this.pageData.currentPage = currentPage;
        let data = {
          keywords:this.keywords,
          page:this.pageData.currentPage
        }
        this.getList(data);
      },
      /**
       * 保存品牌信息，添加|编辑
       */
      save(){
        if(!this.brand_name){
          this.errorTip = '请填写品牌名称'
          return false;
        }
        if(this.handleState == 0){
          let data = {brand_name:this.brand_name}
          this.$http.zmPost(this.server.brandCreate,data).then(res=>{
            if(res.code == 200){
              this.dialogVisible = false;
              this.errorTip = '';
              this.brand_name = '';
              this.getList({});
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            }else{
              this.errorTip = res.message;
            }
          }).catch(error=>{
            Promise.reject(error)
          })
        }else if(this.handleState == 1){
          let data = {brand_id:this.brand_id,brand_name:this.brand_name}
          this.$http.zmPost(this.server.brandModify,data).then(res=>{
            if(res.code == 200){
              this.dialogVisible = false;
              this.errorTip = '';
              this.brand_name = '';
              this.getList({});
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
            }else{
              this.errorTip = res.message;
            }
          }).catch(error=>{
            Promise.reject(error);
          })
        }
      },
      /**
       * 获取列表信息
       */
      getList(data){
        this.tableLoading = true;
        this.$http.zmPost(this.server.brandList,data).then(res=>{
          if(res.code == 200){
            let result = res.data;
            this.pageData = {
              total:result.pagination.total_num,
              size:result.pagination.limit,
              currentPage:result.pagination.page,
              describe:'个商品'
            }
            this.tableData = result.list;
            this.tableLoading = false;
          }else{
            this.$message({
              type: 'error',
              message:res.message
            });
            this.tableLoading = false;
          }
        }).catch(error=>{
          Promise.reject(error);
          this.tableLoading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
