<template>
  <div id="header" class="clearfix" v-if="headerIsShow">
    <router-link to="/" class="tohomepage">首页</router-link>
    <span class="examplename">{{examplename}}</span>
    <a href="javascript:;" @click="goBack" class="goback">返回</a>
  </div>
</template>
<script>
export default {
  name: 'G-header',
  data(){
    return {
      msg: '页面顶部'
    }
  },
  props: {
    headerIsShow: {
      type: Boolean,
      default: true
    },
    examplename: {
      type: String,
      default: ''
    }
  },
  mounted(){

  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
  #header {
    text-align: center;
  }
</style>
