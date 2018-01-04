<template>
  <div class="textarea">
    <el-input
      type="textarea"
      :rows="row"
      :placeholder="placeholder"
      v-model="text"
      resize="none"
      :maxlength="maxlength"
      @blur="getText"
      @change="getNumber">
    </el-input>
    <p class="number-tip"><span>{{text.length}}</span>/<span>{{maxlength}}</span></p>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data(){
    return {
      row:4,
      placeholder:'不能大于100字',
      text:'',
      maxlength:100,
    }
  },
  props:['configure'],
  methods:{
    /**
     * 获取输入内容
     */
    getText(){
      this.$emit('getTextarea',this.text)
    }
  },
  created(){
    this.row = this.configure.row
    this.placeholder = this.configure.placeholder
    this.text = this.configure.text
    this.maxlength = this.configure.maxlength
  }
}

</script>

<style scoped lang="scss">
  .textarea{position: relative}
  .number-tip{color:#dcdcdc;position: absolute;bottom:0;right:0;line-height: 30px;text-align: right;padding-right: 15px;font-weight:100;}
</style>
