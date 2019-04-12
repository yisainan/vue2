<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <ul>
      <li><mt-button size="large" @click="ToastA">默认Toast</mt-button></li>
      <li><mt-button size="large" @click="ToastB">带Icon标志的Toast</mt-button></li>
      <li><mt-button size="large" @click="ToastC">自定义位置Toast</mt-button></li>
    </ul> 
    <gfooter></gfooter> 
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  name: 'Toast',
  data(){
    return {
      examplename: "Toast"
    }
  },
  mounted(){

  },
  methods:{
    ToastA(){
      Toast('默认Toast');
    },
    ToastB(){
      Toast({
        message: '操作成功',
        iconClass: 'fa fa-check fa-2x'
      });
    },
    ToastC(){
      Toast({
        message: '自定义位置',
        position: 'bottom',
        duration: 5000
      });
    }
  }
}
</script>
<style scoped>
  ul {
    padding-left: 10px;
    padding-top: 20px;
    padding-right: 10px;
  }
  li {
    margin: 20px 0;
  }
</style>

