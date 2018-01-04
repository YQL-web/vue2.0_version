<template>
  <div class="search">
    <el-input placeholder="请输入内容" v-model="input" size="small" class="search-input">
      <el-button slot="append" @click="search">查询</el-button>
    </el-input>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        input:''
      }
    },
    methods:{
      search(){
        this.$emit('search',this.input)
      },
//      keyEnter(event){
//        console.log(111)
//        let key = event.keycode;
//        console.log(key)
//      }
    },
    created(){
      document.body.onkeydown = event=>{
        let e = event || window.event;
        let src = e.target || e.srcElement;
        if(src.nodeName.toLocaleLowerCase() == 'input'&& src.parentNode.className.indexOf('search-input')>=0){
          if(e.keyCode == 13){
            this.search();
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .search .el-input{width:auto}
  .search .el-input--small .el-input__inner{width: 200px;}
  .search .el-input-group__append, .el-input-group__prepend{padding:0 15px;cursor: pointer;color:#2c3e50}
</style>
