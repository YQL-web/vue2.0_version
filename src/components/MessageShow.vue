<template>
  <div>
    <el-row v-for="(item,index) in message" :key="index" class="collapse">
      <div class="information-container">
        <div v-for="option in item.rowData">
          <el-col :span="option.keySpan"><p class="key">{{option.key}}</p></el-col>
          <el-col :span="option.valSpan"><p class="val">{{option.value}}</p></el-col>
        </div>
        <!--<el-col :span="3"><p class="key">手机号:</p></el-col>-->
        <!--<el-col :span="5"><p class="val">18445365421</p></el-col>-->
        <!--<el-col :span="3"><p class="key">联系人:</p></el-col>-->
        <!--<el-col :span="5"><p class="val">汪老板</p></el-col>-->
      </div>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        message:[
//          {
//            rowData:[
//              {key:'客户名称:',value:'美美乐超市',keySpan:3,valSpan:5},
//              {key:'手机号:',value:'18445365421',keySpan:3,valSpan:5},
//              {key:'联系人:',value:'汪老板',keySpan:3,valSpan:5}
//            ]
//          },
//          {
//            rowData:[
//              {key:'客户分类:',value:'普通客户',keySpan:3,valSpan:5},
//              {key:'手机号:',value:'18445365421',keySpan:3,valSpan:13}
//            ]
//          }
        ]
      }
    },
    props:['data'],
    methods:{

    },
    created(){
      this.message = this.data;
    }
  }
</script>

<style lang="scss">
  .key{  background: #eff2f7; text-align: right;font-weight: bold }
  .information-container{overflow: hidden;*zoom:1;border:1px solid #d6d9ea;
  p{margin:0;height: 35px;line-height: 35px;padding: 0 10px;border-right: 1px solid #d6d9ea}
  }
  .collapse{margin-top:-1px}
</style>
