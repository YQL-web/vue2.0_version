<template>
  <div class="crumbs">
    <template v-for="(item,index) in crumbs">
      <span @click="jumpUrl(item.path)" v-if="index < crumbs.length-1" class="crumbs-name">{{item.crumb}}</span>
      <span @click="jumpUrl(item.path)" v-if="index == crumbs.length-1" class="crumbs-name crumbs-black">{{item.crumb}}</span>
      <span v-if="index < crumbs.length-1" class="crumbs-splice">/</span>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      crumbs: {
        type: Array,
        default: []
      }
    },
    data () {
      return {}
    },
    methods:{
      jumpUrl(path){
        this.$router.push({path:path})
      }
    }
  }
</script>

<style scoped>
  .crumbs {
    position: absolute;
    top: 1px;
    left: 0;
    width: 100%;
    height: 47px;
    font-size: 14px;
    padding-left: 24px;
    text-align: left;
    line-height: 48px;
    border-bottom: 1px solid #d3dce6;
  }

  .crumbs-name {
    cursor: pointer;
  }

  .crumbs-splice {
    display: inline-block;
    width: 16px;
    text-align: center;
  }

  .crumbs-black {
    font-weight: 600;
  }
</style>
