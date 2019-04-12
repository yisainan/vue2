<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="room">
      <ul>
        <li><mt-button size="large" @click="indicator1">Indicator1</mt-button></li>
        <li><mt-button size="large" @click="indicator2">Indicator2</mt-button></li>
        <li><mt-button size="large" @click="indicator3">Indicator3</mt-button></li>
      </ul>
      
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  name: 'Indicator',
  data (){
    return {
      examplename: 'Indicator'
    }
  },
  mounted (){

  },
  methods:{
    indicator1 () {
      Indicator.open();
      setTimeout(()=>{
        Indicator.close();
      },3000)
    },
    indicator2 () {
      Indicator.open('加载中');
      setTimeout(()=>{
        Indicator.close();
      },3000)
    },
    indicator3 () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      setTimeout(()=>{
        Indicator.close();
      },3000)
    }
  }
}
</script>
<style scoped>
.room {
  padding: 10px 10px;
}
li:first-child {
  margin-top: 30px; 
}
li {
  margin-bottom: 20px;
}
</style>
