<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">商品管理</span>
          <div class="right-but">
            <el-button @click="dialogImport = true" class="trade-btn">导入</el-button>
            <el-button @click="exportGoods" v-loading="loadingExport" class="trade-btn">导出</el-button>
            <el-button @click="showGoodsModel(1)" class="trade-btn" type="primary">添加</el-button>
            <el-button @click="delAll" class="trade-btn" type="danger">删除</el-button>
          </div>
        </div>
        <div class="trade-table">
          <div class="condition-search">
            <div class="search-item">
              <el-input @keyup.enter.native="search" v-model="keywords" clearable class="trade-input"
                        placeholder="按商品名称/条码查询"></el-input>
            </div>
            <div class="search-item">
              <span class="title">商品分类：</span>
              <commodity-class v-model="category" @changeCategory="changeCategory"></commodity-class>
            </div>
            <div class="search-item">
              <span class="title">品牌：</span>
              <brand-select v-model="brandId" @change="changeBrand"></brand-select>
            </div>
            <div class="search-item">
              <span class="title">是否停售：</span>
              <el-select @change="search" v-model="saleStatus" class="trade-select" placeholder="请选择">
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="销售中"></el-option>
                <el-option value="2" label="停售"></el-option>
              </el-select>
            </div>
            <div class="search-item">
              <span class="title">有无图：</span>
              <el-select @change="search" v-model="isImg" class="trade-select" placeholder="请选择">
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="有"></el-option>
                <el-option value="0" label="无"></el-option>
              </el-select>
            </div>
            <div class="search-item">
              <el-button @click="search" class="trade-btn" type="primary">查询</el-button>
            </div>
            <el-button @click="clearSearch" class="trade-btn clear-condition" type="text">清空筛选条件</el-button>
          </div>
          <div v-loading="loading" class="margin-tab">
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark"
                      @selection-change="handleSelectionChange"
                      style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="图片"
                width="120">
                <template v-if="scope.row.goods_pic.length>0" slot-scope="scope">
                  <img @click="showImageModel(scope.row.goods_pic)" class="comm-img"
                       :src="scope.row.goods_pic[0].img_url">
                </template>
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
                prop="brand_name"
                label="品牌">
              </el-table-column>
              <el-table-column
                prop="category_name"
                label="商品分类">
              </el-table-column>
              <el-table-column
                prop="goods_rule"
                label="规格">
              </el-table-column>
              <el-table-column
                prop="goods_unit"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="address"
                label="售价">
                <template slot-scope="scope">{{scope.row.sale_price}}</template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否停售">
                <template slot-scope="scope">
                  <span v-if="scope.row.sale_status==1">销售中</span>
                  <span v-if="scope.row.sale_status==2">停售</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                prop="address"
                label="操作">
                <template slot-scope="scope">
                  <div class="edit-btn">
                    <el-button @click="showGoodsModel(2,scope.row.goods_id)" type="text">编辑</el-button>
                    <el-button class="del-btn-color" @click="delGoods(scope.row.goods_id)" type="text">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page :pageData="pageData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange"></page>
        </div>
      </div>

      <!------------添加商品Dialog-------------->


      <el-dialog class="rea" :visible.sync="dialogImages" width="500px">
        <div class="dialog-img">
          <el-carousel indicator-position="outside" height="380px">
            <el-carousel-item v-for="(item,index) in goodsPic" :key="index">
              <img class="img-item" :src="item.img_url">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-dialog>


      <import-goods-dialog v-if="dialogImport" :visible="dialogImport"
                           templateAddress="http://zmai-prod.oss-cn-hangzhou.aliyuncs.com/default/template/%E5%95%86%E8%B4%B8%E5%AF%BC%E5%85%A5%E5%95%86%E5%93%81%E6%A8%A1%E6%9D%BF-2017-12-27.xlsx"
                           :address="urlsTemplate"
                           @close="closeImport"
                           @success="successImport"
                           :importParams="importParams">

      </import-goods-dialog>

      <add-goods :visible="dialogVisible" @success="goodsSuccess" :goodsType="goodsType" :goodsId="goodsId"
                 @close="closeGoodsModel"></add-goods>
    </div>
  </div>
</template>

<script>
  import CommodityClass from '../../components/CommodityClass'
  import ImportGoodsDialog from '../../components/ImportGoodsDialog'
  import BrandSelect from '../../components/BrandSelect'
  import Unit from '../../components/Unit'
  import AddGoods from '../../components/AddGoods'
  export default {
    beforeRouteUpdate (to, from, next) {
      this.refreshFun();
      next();
    },
    components: {
      CommodityClass,
      ImportGoodsDialog,
      BrandSelect,
      Unit,
      AddGoods
    },
    data () {
      return {
        urlsTemplate: this.server.goodsImport,
        category: {  //初始化商品分类
          categoryId: "",
          childId: ""
        },
        keywords: "",  //关键字搜索
        brandId: "",  //品牌id
        isImg: "",  //是否有图
        saleStatus: "",  //是否停售
        categoryId: "", //商品分类Id
        loading: false,
        dialogImages: false,
        dialogImport: false,
        dialogVisible: false,
        loadingExport: false,
        goodsType: 1,
        goodsId: "",
        pageData: {
          total: 0,
          page: 1,
          limit: 10,
          describe: "条商品"
        },
        currentPage: 1,
        tableData: [],
        goodsPic: [],
        crumbList: [
          {
            crumb: "商品管理",
            path: ""
          },
          {
            crumb: "商品资料",
            path: "/commodity"
          }
        ],
        multipleSelection: [],
        // excel导入数据参数
        importParams: {
          exportTitle: {
            "excel_id": 1,
            "bar_code": "*商品条码",
            "goods_name": "*商品名称",
            "goods_rule": "商品规格",
            "goods_unit": "单位",
            "min_sales": "*起批数量",
            "sale_price": "*销售价格(元)",
            "whole_ratio": "整件数量"
          },
          // 自定义字段
          custom: {
            "goods": [],
            "import_id": 1
          },
          // excel表格数据字段头
          excelArrName: "goods",
          // 导入excel名字，方便根据不用execl验证问题
          excelType: "goods"
        },
        refresh: false,  //控制路由刷新
      }
    },
    watch: {
      keywords(val){
        if (!val) {
          this.renderList();
        }
      }
    },
    mounted(){
      this.renderList();
    },
    methods: {
      refreshFun(){
        this.refresh = !this.refresh;
        if (this.refresh) {
          this.renderList();
        }
      },
      renderList(type = 2){
        if (type == 2) {
          this.loading = true;
        }
        let param = {
          brand_id: this.brandId,
          category_id: this.categoryId,
          is_img: this.isImg,
          keywords: this.keywords,
          limit: this.pageData.limit,
          page: this.pageData.page,
          sale_status: this.saleStatus
        }
        this.$http.zmGet(this.server.goodsList, param)
          .then(res => {
            this.loading = false;
            this.refresh = false;
            [this.tableData, this.pageData.total] = [res.data.list, res.data.pagination.total_num]
          })
          .catch(err => {
            this.$message.error(this.server.errorCode(err.code, err.message))
          })
      },
      search(){
        this.renderList();
      },
      /**
       * 显示 AddGoods dialog
       * @param type  1 添加商品  2编辑商品
       * @param id  商品Id
       */
      showGoodsModel(type, id){
        [this.goodsType, this.goodsId, this.dialogVisible] = [type, id, true];
      },
      handleSizeChange(val){
        this.pageData.limit = val;
        this.pageData.page = 1;
        this.renderList();
      },
      handleCurrentChange(val){
        this.pageData.page = val;
        this.renderList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      delAll(){
        if (this.multipleSelection.length == 0) {
          this.$message({
            message: '请至少选择一条你要删除的商品',
            type: 'warning'
          });
          return false
        }
        let goods_ids = [];
        for (let item of this.multipleSelection) {
          goods_ids.push(item.goods_id)
        }
        this.$confirm('确定要删除你选中的商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.zmPost(this.server.goodsDelAll, {goods_ids: goods_ids})
            .then(res => {
              this.$message({
                message: "批量删除商品成功",
                type: "success"
              })
              this.renderList();
            })
            .catch(err => {
              this.$message.error(this.server.errorCode(err.code, err.message))
            })
        }).catch(() => {
        });
      },
      changeCategory(categoryId){
        this.categoryId = categoryId;
        this.renderList();
      },
      changeBrand(brandId){
        this.brandId = brandId;
        this.renderList();
      },
      clearSearch(){
        this.keywords = "";
        this.categoryId = "";
        this.brandId = "";
        this.isImg = "";
        this.saleStatus = "";
        this.category = {
          categoryId: "",
          childId: ""
        }
        this.renderList(2);
      },
      showImageModel(arr){
        this.dialogImages = true;
        this.goodsPic = arr;
      },
      closeGoodsModel(){
        this.dialogVisible = false;
      },
      goodsSuccess(type){
        this.renderList(type);
      },
      delGoods(id){
        this.$confirm('你确定要删除这条商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.zmPost(this.server.goodsDel, {goods_id: id})
            .then(res => {
              this.$message({
                message: "删除商品成功",
                type: "success"
              })
              this.renderList(2);
            })
            .catch(err => {
              this.$message.error(this.server.errorCode(err.code, err.message))
            })
        }).catch(() => {

        });
      },
      exportGoods(){
        let param = {
          brand_id: this.brandId,
          category_id: this.categoryId,
          is_img: this.isImg,
          keywords: this.keywords,
          sale_status: this.saleStatus
        }
        this.loadingExport = true;
        this.$http.zmGet(this.server.goodsExport, param)
          .then(res => {
            this.loadingExport = false;
            window.location.href = res.data.download_url;
          })
          .catch(err => {
            this.loadingExport = false;
            this.$message.error(this.server.errorCode(err.code, err.message))
          })
      },
      closeImport(){
        this.dialogImport = false;
      },
      successImport(){
        this.renderList(1);
      }
    }
  }
</script>

<style scoped>

</style>
