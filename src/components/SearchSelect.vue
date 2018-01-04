<template>
  <div class="search-select">
    <span class="title">{{defaultData.title}}</span>
    <el-select v-model="currentData" size="small" @change="broadcast">
      <el-option
        v-for="item in defaultData.data"
        :key="item.value"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        defaultData:{
          title:'客户分类：',
          data:[
//            {
//              value:'0',
//              label:'普通客户'
//            },
//            {
//              value:'1',
//              label:'普通会员'
//            },
//            {
//              value:'2',
//              label:'超级会员'
//            }
          ]
        },
        currentData:'全部',
        code:''
      }
    },
    props:['eventName','rawData'],
    methods:{
      broadcast(){
        this.defaultData.data.forEach(item=>{
          if(item.label === this.currentData)
            this.code = item.value
        })
        this.$emit(this.eventName,this.code)
      }
    },
    created(){
      this.defaultData = this.rawData;
    },
    destroyed(){
      this.$off(this.eventName)
    },
    watch:{

    }
  }
</script>

<style lang="scss">
  .search-item .el-select{width: 112px}
</style>
