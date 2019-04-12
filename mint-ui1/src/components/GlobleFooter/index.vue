<template>
  <div id="footer" v-if="footerIsShow">
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'G-footer',
  data(){
    return {
      msg: '页面底部'
    }
  },
  props: {
    footerIsShow:{
      type: Boolean,
      default: true
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style scoped>
  #footer {
    text-align: center;
  }
</style>
