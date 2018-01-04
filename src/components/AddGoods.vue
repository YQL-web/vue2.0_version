<template>
  <div>
    <el-dialog :close-on-click-modal="false"
               :close-on-press-escape='true'
               class="trade-model" :title="dialogTitle"
               :visible.sync="dialogVisible"
               @close="closeModel"
               width="864px">
      <div v-loading="loadingAddModel">
        <div class="moduleTitlt">基本信息</div>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>商品条码：</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-input :class="{'error-border':error.bar_code}" v-model.trim="goods.bar_code"
                              @blur="getGoodsByCode"
                              @keydown.enter.native="getGoodsByCode"
                              @keyup.native="goods.bar_code=goods.bar_code.replace(/\s/g,'')"
                              :disabled="disabledBarCode"
                              class="from-input"></el-input>
                    <div class="error-tip">{{error.bar_code}}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>商品名称：</div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <el-input :class="{'error-border':error.goods_name}" v-model.trim="goods.goods_name"
                              @blur="checkGoods('goodsName')"
                              class="from-input"></el-input>
                    <div class="error-tip">{{error.goods_name}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>商品分类：</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <commodity-class :class="{'error-border':error.category_id}" :isDefault="true" :isAll="0"
                                     v-model="category"
                                     @changeCategory="changeCategoryGoods"></commodity-class>
                    <div class="error-tip">{{error.category_id}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required"></i>商品规格：</div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <el-row>
                      <el-col :span="10">
                        <div class="grid-content bg-purple-light">
                          <el-input v-model.trim="goods.goods_rule" class="from-input"></el-input>
                          <div class="error-tip"></div>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="grid-content bg-purple-light">
                          <el-row>
                            <el-col :span="10">
                              <div style="text-align: center" class="commodity-item grid-content bg-purple">单位：</div>
                            </el-col>
                            <el-col :span="14">
                              <div class="grid-content bg-purple-light">
                                <unit v-model="goods.goods_unit"></unit>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>起批数量：</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-input
                      @blur="checkGoods('minSales')"
                      :class="{'error-border':error.min_sales}"
                      @keyup.native="goods.min_sales=goods.min_sales.replace(/[^\d\.]/g,'')"
                      v-model="goods.min_sales" class="from-input"></el-input>
                    <div class="error-tip">{{error.min_sales}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>销售价格：</div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple-light">
                    <el-row>
                      <el-col :span="10">
                        <div class="from-pos-input grid-content bg-purple">
                          <el-input
                            @blur="checkGoods('salePrice')"
                            @keyup.native="goods.sale_price=goods.sale_price.replace(/[^\d\.]/g,'')"
                            :class="{'error-border':error.sale_price}"
                            v-model="goods.sale_price" class="from-input"></el-input>
                          <span class="unit">元</span>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div style="text-align: center" class="grid-content bg-purple">
                          <el-button @click="customerModel" class="from-text-btn" type="text">分客定价</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="error-tip">{{error.sale_price}}</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required"></i>商品品牌：</div>
                </el-col>
                <el-col :span="16">
                  <el-row>
                    <el-col :span="12">
                      <div style="overflow: hidden" class="grid-content bg-purple-light">
                        <brand-select :refresh="refreshBrand" v-model="goods.brand_id"></brand-select>
                        <div class="error-tip"></div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="text-align: center" class="grid-content bg-purple">
                        <el-button @click="dialogBrand = true" class="from-text-btn" type="text">添加品牌</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required"></i>是否停售：</div>
                </el-col>
                <el-col :span="16">
                  <div class="commodity-item grid-content bg-purple-light">
                    <el-radio v-model="goods.sale_status" :label="1">销售中</el-radio>
                    <el-radio v-model="goods.sale_status" :label="2">停销</el-radio>
                  </div>
                  <div class="error-tip"></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required"></i>整件数量：</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-input
                      @blur="checkGoods('wholeRatio')"
                      :class="{'error-border':error.whole_ratio}"
                      @keyup.native="goods.whole_ratio=goods.whole_ratio.replace(/[^\d\.]/g,'')"
                      v-model="goods.whole_ratio" class="from-input"></el-input>
                    <div class="error-tip">{{error.whole_ratio}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="3">
                  <div class="commodity-item grid-content bg-purple"><i class="required"></i>商品图片：</div>
                </el-col>
                <el-col :span="21">
                  <div class="from-images grid-content bg-purple-light">
                    <div v-for="(item,index) in goods.goods_pic" class="from-img">
                      <img :src="item.img_url" alt="">
                      <img v-if="index==0" class="cover" src="../assets/images/shangpin_img_label.png" alt="">
                      <span @click="delImg(index)" class="del-img"><i
                        class="close-icon el-icon-circle-close-outline"></i></span>
                    </div>
                    <div @click="clickUpload" class="from-upload">
                      <i class="el-icon-plus"></i>
                      <div class="text">点击上传</div>
                      <input class="upload-file" @change="uploadImg" type="file">
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="from-sub grid-content bg-purple">
              <el-button @click="saveGoods(1)" class="trade-btn">继续添加</el-button>
              <el-button @click="saveGoods(2)" class="trade-btn" type="primary">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>


    <el-dialog title="添加品牌" :visible.sync="dialogBrand" width="432px">
      <div v-loading="loadingBrand">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-row>
                <el-col :span="6">
                  <div class="commodity-item grid-content bg-purple"><i class="required">*</i>品牌名称：</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-input :class="{'error-border':error.brandName}" v-model="brandName"
                              class="from-input"></el-input>
                    <div class="error-tip">{{error.brandName}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="from-sub">
        <el-button @click="saveBrand" class="trade-btn" type="primary">保存</el-button>
      </div>
      </span>
    </el-dialog>

    <el-dialog class="trade-model" title="分客定价" :visible.sync="dialogCustomer" width="432px">
      <div class="trade-table" style="padding: 0">
        <el-table ref="multipleTable" :data="goods.custom_price" border tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="custom_name" align="center" label="客户分类">
          </el-table-column>
          <el-table-column align="center" label="售价价格">
            <template slot-scope="scope">
              <el-input
                :class="{'error-border':scope.row.error}"
                @blur="checkCustom"
                @keyup.native="scope.row.sale_price=scope.row.sale_price.replace(/[^\d\.]/g,'')"
                v-model="scope.row.sale_price" class="from-input"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <div class="from-sub">
          <el-button @click="dialogCustomer=false" class="trade-btn" type="primary">保存</el-button>
        </div>
        </span>
      </div>
    </el-dialog>

    <el-dialog class="cut-model" title="剪裁图片" :visible.sync="dialogUpload" width="864px">
      <div v-loading="loadingCut">
        <div class="img-base64">
          <img v-if="imgBase64" :src="imgBase64" alt="">
        </div>
        <canvas id="cutCanvas" :width="proportionW*2" :height="proportionH*2"></canvas>
      </div>
      <div class="from-sub">
        <el-button @click="dialogUpload = false" class="trade-btn">取消</el-button>
        <el-button @click="cutImg" class="trade-btn" type="primary">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog class="cut-model" title="选择商品" :visible.sync="dialogGoodsTab" width="580px">
      <div>
        <el-table
          :data="goodsTab"
          highlight-current-row
          @current-change="handleCurrentChange"
          @row-dblclick="dbCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            property="bar_code"
            align="center"
            label="商品条码">
          </el-table-column>
          <el-table-column
            property="goods_name"
            align="center"
            label="商品名称">
          </el-table-column>
        </el-table>
      </div>
      <div class="from-sub">
        <el-button @click="dialogGoodsTab = false" class="trade-btn">取消</el-button>
        <el-button @click="analysisCurrentGoods" class="trade-btn" type="primary">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import CommodityClass from './CommodityClass'
  import BrandSelect from './BrandSelect'
  import Unit from './Unit'
  import _ from 'lodash';

  const maxMoney = 99999999;

  export default {
    props: {
      goodsType: {
        type: [Number, String],
        default: 1
      },
      goodsId: {
        type: [Number, String],
        default: ""
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    components: {
      CommodityClass,
      BrandSelect,
      Unit
    },
    watch: {
      visible(val){
        this.dialogVisible = val;
      },
      goodsType(){
        if (this.goodsType == 1) {
          this.dialogTitle = "添加商品";
          this.disabledBarCode = false;
          this.initEntity();
        } else if (this.goodsType == 2) {
          this.dialogTitle = "编辑商品";
          this.disabledBarCode = true;
          this.getGoodsDetail();
        }
      }
    },
    data () {
      return {
        category: {  //初始化商品分类
          categoryId: "",
          childId: ""
        },
        goods: {   //商品实体
          goods_id: this.goodsId,
          bar_code: "",
          goods_name: "",
          goods_pic: [],
          min_sales: 1, //起批数量默认为1
          sale_status: 1,
          custom_price: []
        },
        error: {},  //错误信息提示
        brandName: "", //品牌名称
        goodsTab: [],   //根据条形码查询出来的商品列表
        currentGoods: {},  //当前选中的商品
        dialogVisible: false,
        disabledBarCode: false,
        loadingAddModel: false,
        dialogUpload: false,
        loadingCut: false,
        dialogBrand: false,
        dialogCustomer: false,
        loadingBrand: false,
        dialogGoodsTab: false,
        refreshBrand: false, //刷新品牌列表
        dialogTitle: "添加商品",
        imgBase64: "",
        jcropApi: null,
        checkMap: null,
        proportionW: 130,
        proportionH: 130
      }
    },
    mounted(){
      if (this.goodsType == 1) {
        this.dialogTitle = "添加商品";
        this.initEntity();
      } else if (this.goodsType == 2) {
        this.dialogTitle = "编辑商品";
        this.disabledBarCode = true;
        this.getGoodsDetail();
      }
      this.checkRule();
    },
    methods: {
      //初始化实体
      initEntity(){
        this.goods = {   //商品实体
          goods_id: "",
          bar_code: "",
          goods_name: "",
          min_sales: 1, //起批数量默认为1
          goods_pic: [],
          sale_status: 1,
          custom_price: []
        }
      },
      clickUpload(){
        if (this.jcropApi) {
          this.jcropApi.destroy();
          let canvas = document.getElementById("cutCanvas");
          let context = canvas.getContext("2d");
          context.clearRect(0, 0, this.proportionW, this.proportionH);
        }
        this.imgBase64 = "";
        $(".upload-file").val('');
        $(".upload-file").click()
      },
      uploadImg(e){
        this.loadingAddModel = true;
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        reader.onload = function (e) {
          that.dialogUpload = true;
          that.loadingAddModel = false;
          that.imgBase64 = this.result;
          that.$nextTick(function () {
            $('.img-base64 img').Jcrop({
              onChange: that.showCoords,
              onSelect: that.showCoords,
              boxWidth: 824,
              aspectRatio: that.proportionW / that.proportionH,
            }, function () {
              that.jcropApi = this;
              that.jcropApi.animateTo([0, 0, that.proportionW, that.proportionH]);
            });
          })
        }
      },
      showCoords(c){
        if (parseInt(c.w) > 0) {
          // Show image preview
          let imageObj = $(".img-base64 img")[0];
          let canvas = document.getElementById("cutCanvas");
          let context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(imageObj, c.x, c.y, c.w, c.h, 0, 0, canvas.width, canvas.height);
        }
      },
      cutImg() {
        this.loadingCut = true;
        let canvas = document.getElementById("cutCanvas");
        let data = canvas.toDataURL();
        this.$http.zmPost(this.server.upload, {type: 1, img: data})
          .then(res => {
            this.loadingCut = false;
            this.dialogUpload = false;
            this.goods.goods_pic.push({"img_path": res.data.file_path, "img_url": res.data.file_url})
          })
          .catch(err => {
            this.loadingCut = false;
            this.$message.error(this.server.errorCode(err.code, err.message))
          })
      },
      delImg(index){
        this.goods.goods_pic.splice(index, 1);
      },

      customerModel(){
        if (!this.goods.sale_price) {
          this.$set(this.error, "sale_price", "请先设置商品销售价格")
          return false
        }
        this.$http.zmGet(this.server.customerList, {limit: 0})
          .then(res => {
            if (res.data.list.length > 0) {
              this.dialogCustomer = true;
              if (this.goods.custom_price.length == 0) {
                for (let item of res.data.list) {
                  let obj = {
                    custom_category_id: item.category_id,
                    custom_name: item.name,
                    sale_price: this.goods.sale_price
                  }
                  this.goods.custom_price.push(obj)
                }
              } else {
                let arr = [];
                for (let item of res.data.list) {
                  let obj = {
                    custom_category_id: item.category_id,
                    custom_name: item.name,
                    sale_price: ""
                  }
                  for (let cus of this.goods.custom_price) {
                    if (item.category_id == cus.custom_category_id) {
                      obj.sale_price = cus.sale_price
                    }
                  }
                  arr.push(obj)
                }
                this.goods.custom_price = arr;
              }
            } else {
              this.$confirm('请到客户管理中设置客户分类', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(() => {

              }).catch(() => {

              });
            }
          })
          .catch(err => {

          })
      },
      changeCategoryGoods(categoryId){
        this.goods.category_id = categoryId;
        this.checkGoods('categoryId');
      },
      checkRule(){
        this.checkMap = new Map();
        this.checkMap.set("barCode", () => {
          if (!this.goods.bar_code) {
            this.$set(this.error, "bar_code", "商品条码不能为空")
            return false
          }
          if (!this.regExp.BAR_CODE.test(this.goods.bar_code)) {
            this.$set(this.error, "bar_code", "商品条码格式不正确")
            return false
          }
          if (this.goods.bar_code.length < 3 || this.goods.bar_code.length > 32) {
            this.$set(this.error, "bar_code", "商品条码长度为3-32位")
            return false
          }
          this.$set(this.error, "bar_code", "")
          return true
        })
        this.checkMap.set("goodsName", () => {
          if (!this.goods.goods_name) {
            this.$set(this.error, "goods_name", "商品名称不能为空")
            return false
          }
          if (this.goods.goods_name.length > 30) {
            this.$set(this.error, "goods_name", "商品名称长度为30字以内")
            return false
          }
          this.$set(this.error, "goods_name", "")
          return true
        })
        this.checkMap.set("categoryId", () => {
          if (!this.goods.category_id) {
            this.$set(this.error, "category_id", "请选择商品分类")
            return false
          }
          if (!this.category.childId) {
            this.$set(this.error, "category_id", "请选择商品第二级分类")
            return false
          }
          this.$set(this.error, "category_id", "")
          return true
        })
        this.checkMap.set("minSales", () => {
          if (!this.goods.min_sales) {
            this.$set(this.error, "min_sales", "起批数量不能为空")
            return false
          }
          if (isNaN(this.goods.min_sales)) {
            this.$set(this.error, "min_sales", "起批数量必须为数值")
            return false
          }
          if (this.goods.min_sales < 0 || this.goods.min_sales > 999) {
            this.$set(this.error, "min_sales", "起批数量只能在1-999之间")
            return false
          }
          this.$set(this.error, "min_sales", "")
          return true
        })
        this.checkMap.set("salePrice", () => {
          if (!this.goods.sale_price) {
            this.$set(this.error, "sale_price", "销售价格不能为空")
            return false
          }
          if (!this.regExp.REF_MONEY.test(this.goods.sale_price)) {
            this.$set(this.error, "sale_price", "销售价格格式不正确（保留2位小数）")
            return false
          }
          if (this.goods.sale_price > maxMoney || this.goods.sale_price < 0) {
            this.$set(this.error, "sale_price", "销售价格只能在0-99999999之间")
            return false
          }
          this.$set(this.error, "sale_price", "")
          return true
        })
        this.checkMap.set("wholeRatio", () => {
          if (this.goods.whole_ratio) {
            if (!this.regExp.REG_INTEGER.test(this.goods.whole_ratio)) {
              this.$set(this.error, "whole_ratio", "整件数量必须为整数")
              return false
            }
            if (this.goods.whole_ratio < 0 || this.goods.whole_ratio > maxMoney) {
              this.$set(this.error, "whole_ratio", "整件数量只能在0-99999999之间")
              return false
            }
          }
          this.$set(this.error, "whole_ratio", "")
          return true
        })
      },
      checkGoods(key){
        if (key) {
          return this.checkMap.get(key)();
        } else {
          let flag = true;
          for (let check of this.checkMap) {
            let res = check[1]()
            if (!res && flag) {
              flag = res;
            }
          }
          return flag
        }
      },
      saveGoods(type){
        //保存时验证goods实体 和 分客定价
        if (this.checkGoods() && this.checkCustom()) {
          this.loadingAddModel = true;
          this.$http.zmPost(this.server.goodsSave, this.goods)
            .then(res => {
              this.loadingAddModel = false;
              this.$message({
                message: this.dialogTitle + '成功',
                type: 'success'
              })
              if (type == 2) {
                this.dialogVisible = false;
              } else if (type == 1) {
                this.disabledBarCode = false;
                this.dialogTitle = "添加商品";
                this.category.categoryId = "";
                this.category.childId = "";
                this.initEntity();
              }
              this.$emit("success", type)
            })
            .catch(err => {
              this.loadingAddModel = false;
              this.$message.error(this.server.errorCode(err.code, err.message))
            })
        }
      },
      closeModel(){
        this.$emit("close", true)
      },
      getGoodsDetail(){
        this.loadingAddModel = true;
        this.$http.zmGet(this.server.goodsDetail, {goods_id: this.goodsId})
          .then(res => {
            this.loadingAddModel = false;
            this.goods = res.data;
            let cat = res.data.category_ids;
            this.category.categoryId = cat[0];
            if (cat.length == 2) {
              this.category.childId = cat[1]
            }
          })
          .catch(err => {
            this.loadingAddModel = false;
            this.$message.error(this.server.errorCode(err.code, err.message))
          })
      },
      saveBrand(){
        if (!this.brandName) {
          this.$set(this.error, "brandName", "品牌名称不能为空")
          return false
        }
        this.loadingBrand = true;
        this.$http.zmPost(this.server.brandCreate, {brand_name: this.brandName})
          .then(res => {
            this.loadingBrand = false;
            this.dialogBrand = false;
            this.refreshBrand = true;
            this.$set(this.goods, "brand_id", res.data.brand_id)
            this.$message({
              message: "添加品牌成功",
              type: "success"
            })
          })
          .catch(err => {
            this.loadingBrand = false;
            this.$message.error(this.server.errorCode(err.code, err.message))
          })
      },
      checkCustom(){
        let flag = true;
        let tip = "";
        for (let i = 0; i < this.goods.custom_price.length; i++) {
          if (this.goods.custom_price[i].sale_price) {
            if (!this.regExp.REF_MONEY.test(this.goods.custom_price[i].sale_price)) {
              this.$set(this.goods.custom_price[i], "error", "金额格式正确")
              tip = "分客定价销售价格格式不正确";
              flag = false;
              continue
            }
            if (this.goods.custom_price[i].sale_price < 0 || this.goods.custom_price[i].sale_price > maxMoney) {
              this.$set(this.goods.custom_price[i], "error", "销售价格只能在0-99999999之间")
              tip = "分客定价销售价格只能在0-99999999之间";
              flag = false;
              continue
            }
          }

          this.$set(this.goods.custom_price[i], "error", "")
        }
        if (!flag) {
          this.$message.error(tip)
        }
        return flag
      },
      getGoodsByCode(){
        if (this.checkGoods('barCode')) {
          if (this.goods.bar_code.length < 7) {
            return false
          }
          this.loadingAddModel = true;
          this.$http.zmGet(this.server.goodsSearch, {keywords: this.goods.bar_code, search_cloud: 1})
            .then(res => {
              this.loadingAddModel = false;

              if (res.data.list.length == 1) {
                this.currentGoods = res.data.list[0];
                this.analysisCurrentGoods();
              }
              /* else if (res.data.list.length > 1) {
               this.dialogGoodsTab = true;
               this.goodsTab = res.data.list
               }*/
            })
            .catch(err => {
              this.loadingAddModel = false;
              this.$message.error(this.server.errorCode(err.code, err.message))
            })
        }
      },
      handleCurrentChange(val){
        this.currentGoods = val;
      },
      dbCurrentChange(val){
        this.currentGoods = val;
        this.analysisCurrentGoods();
      },
      analysisCurrentGoods(){
        this.dialogGoodsTab = false;
        /*        if (this.currentGoods.goods_id > 0) {
         this.$set(this.goods, "goods_id", this.currentGoods.goods_id)
         } else {
         this.$set(this.goods, "goods_id", "")
         }*/
        this.$set(this.goods, "bar_code", this.currentGoods.bar_code)
        this.$set(this.goods, "goods_name", this.currentGoods.goods_name)
        this.$set(this.goods, "goods_rule", this.currentGoods.goods_rule)
        this.$set(this.goods, "goods_unit", this.currentGoods.goods_unit)
        this.$set(this.goods, "category_id", this.currentGoods.category_id)
        this.$set(this.goods, "sale_price", this.currentGoods.sale_price)
        this.$set(this.goods, "goods_pic", this.currentGoods.goods_pic)
        let cat = this.currentGoods.category_ids;
        this.category.categoryId = cat[0];
        if (cat.length == 2) {
          this.category.childId = cat[1]
        }
      }
    }
  }
</script>

<style scoped>

</style>
