<template>
  <div class="comm-class">
    <el-select v-model="unit" class="from-select-height" placeholder="请选择">
      <el-option v-for="(item,index) in units" :key="index" :value="item.unit_name"
                 :label="item.unit_name"></el-option>
    </el-select>
  </div>
</template>

<script>
  import axios from '../axios'
  export default {
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        unit: "",
        units: []
      }
    },
    watch: {
      value(val){
        this.unit = val;
      },
      unit(val){
        this.$emit("input", val)
      }
    },
    mounted(){
      this.$http.zmGet(this.server.unitList,{})
        .then(res => {
          this.units = res.data.list;
        })
        .catch(err => {
          this.$message.error(this.server.serverError)
        })
    },
  }
</script>

<style scoped>
  .comm-class {
    display: inline-block;
  }
</style>
