<template>
  <div class="comm-class">
    <el-select v-model="categoryId" @change="categoryChange" class="trade-select" key="cate" placeholder="请选择">
      <el-option v-if="isAll==1" value="" label="全部"></el-option>
      <el-option v-for="(item,index) in category" :key="index" :value="item.category_id"
                 :label="item.category_name"></el-option>
    </el-select>
    <el-select v-model="childId" @change="childChange" class="trade-select" key="child" placeholder="请选择">
      <el-option v-for="(item,index) in childList" :key="index" :value="item.category_id"
                 :label="item.category_name"></el-option>
    </el-select>
  </div>
</template>

<script>
  import axios from '.././axios'
  export default {
    props: {
      value: {
        type: Object,
        default: {
          categoryId: "",
          childId: ""
        }
      },
      isAll: {
        type: Number,
        default: 1
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        categoryId: "",
        childId: "",
        category: [],
        childList: []
      }
    },
    watch: {
      'value.categoryId'(val){
        if (!val && this.isAll == 0 && this.isDefault) {
          this.categoryId = this.category[0].category_id;
        } else {
          this.categoryId = val;
        }
        for (let item of this.category) {
          if (item.category_id == this.categoryId) {
            this.childList = item.children;
            break;
          }
        }
        if (!val && this.isAll == 0 && this.isDefault) {
          this.childId = this.childList[0].category_id;
        } else {
          this.childId = this.value.childId;
        }
        this.$emit("input", {categoryId: this.categoryId, childId: this.childId})
        this.$emit("changeCategory", this.childId)
      }
    },
    mounted(){
      this.$http.zmGet(this.server.goodsClass, {is_all: this.isAll})
        .then(res => {
          this.category = res.data.list;
          if (this.isAll == 0 && !this.value.categoryId && this.isDefault) {
            this.categoryId = res.data.list[0].category_id;
          } else {
            this.categoryId = this.value.categoryId;
          }
          for (let item of this.category) {
            if (item.category_id == this.categoryId) {
              this.childList = item.children;
              break;
            }
          }
          if (this.isAll == 0 && !this.value.childId && this.isDefault) {
            this.childId = this.childList[0].category_id;
          } else {
            this.childId = this.value.childId;
          }
          this.$emit("input", {categoryId: this.categoryId, childId: this.childId})
          this.$emit("changeCategory", this.childId)
        })
        .catch(err => {
          this.$message.error(this.server.errorCode(err.code, err.message))
        })
    },
    methods: {
      categoryChange(val){
        if (!val) {
          this.childList = [];
          this.childId = "";
        } else {
          for (let item of this.category) {
            if (item.category_id == val) {
              this.childId = item.children[0].category_id;
              this.childList = item.children;
            }
          }
        }
        this.$emit("input", {categoryId: this.categoryId, childId: this.childId})
        this.$emit("changeCategory", val)
      },
      childChange(){
        this.$emit("input", {categoryId: this.categoryId, childId: this.childId})
        this.$emit("changeCategory", this.childId)
      }
    }
  }
</script>

<style>
  .comm-class {
    overflow: hidden;
  }

  .comm-class .trade-select {
    float: left;
    margin-left: 4px;
  }

  .comm-class .trade-select:first-child {
    margin-left: 0;
  }
</style>
