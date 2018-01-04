<template>
  <div class="comm-class">
    <div class="grid-content bg-purple">
      <el-select v-model="brand" class="trade-select" placeholder="请选择">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="(item,index) in brandList" :key="index" :value="item.brand_id"
                   :label="item.brand_name"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import axios from '../axios'
  export default {
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      refresh: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        brand: "",
        brandList: [],
        dialogBrand: false
      }
    },
    watch: {
      value(val){
        val = val == 0 ? "" : val;
        this.brand = val;
      },
      brand(val){
        this.$emit("input", val)
        this.$emit("change", val)
      },
      refresh(val){
        if (val) {
          this.getBrandList();
        }
      }
    },
    mounted(){
      this.getBrandList();
    },
    methods: {
      getBrandList(){
        this.$http.zmGet(this.server.brandList, {limit: 0})
          .then(res => {
            if (res.code == 200) {
              this.brandList = res.data.list
            } else {
              this.$message.error(this.server.serverError);
              console.error("获取品牌列表失败")
            }
          })
          .catch(err => {
            this.$message.error(this.server.errorCode(err.code, err.message))
          })
      }
    }
  }
</script>

<style scoped>
  .comm-class {
  }

  .comm-class .grid-content {
  }
</style>
