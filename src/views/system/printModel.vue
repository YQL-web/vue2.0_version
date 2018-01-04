<template>
  <div>
    <crumbs :crumbs="crumbList"></crumbs>
    <div class="content-body">
      <div class="content-border">
        <div class="content-title">
          <span class="tip">打印模板</span>
        </div>
        <div class="trade-table">
          <div class="center_align">
            <el-radio v-model="radio" label="1" >单页打印</el-radio>
            <el-radio v-model="radio" label="2">双页打印</el-radio>
          </div>
          <div class="center_align img-content">
            <img />
          </div>
          <div class="center_align">
            <el-button  class="trade-btn">预览</el-button>
            <el-button  class="trade-btn sure-btn" type="primary">保存设置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        crumbList:[
          {crumb: '设置', path: ''},
          {crumb: '打印模板', path: ''}
        ],
        radio:'1'
      }
    }
  }
</script>

<style scoped>
  .center_align img{width: 500px;height: 430px;}
  .img-content{margin:20px 0}
</style>
