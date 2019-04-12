<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="page-wrap">  
      <div>  
        <mt-cell class="page-part" title="当前选中" :value="selected" />  
      </div>  
      <!-- tabcontainer -->  
      <mt-tab-container class="page-tabbar-container" v-model="selected">  
        <mt-tab-container-item id="外卖">  
          <mt-cell v-for="(n,index) in 10" :key="index" :title="'餐厅 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="订单">  
          <mt-cell v-for="(n,index) in 5" :key="index" :title="'订单 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="发现">  
          <mt-cell v-for="(n,index) in 7" :key="index" :title="'发现 ' + n" />  
        </mt-tab-container-item>  
        <mt-tab-container-item id="我的">  
          <div class="page-part">  
           <!-- cell -->  
            <mt-cell v-for="(n,index) in 12" :key="index" :title="'我的 ' + n" />  
          </div>  
          <router-link to="/">  
           <!-- button -->  
            <mt-button type="danger" size="large">退出</mt-button>  
          </router-link>  
        </mt-tab-container-item>  
      </mt-tab-container>  
    </div>  
    <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="外卖">  
        <img slot="icon" src="../../assets/img/tabbardefault.png">  
        外卖  
      </mt-tab-item>  
      <mt-tab-item id="订单">  
        <img slot="icon" src="../../assets/img/tabbardefault.png"> 
        订单  
      </mt-tab-item>  
      <mt-tab-item id="发现">  
        <img slot="icon" src="../../assets/img/tabbardefault.png"> 
        发现  
      </mt-tab-item>  
      <mt-tab-item id="我的">  
        <img slot="icon" src="../../assets/img/tabbardefault.png"> 
        我的  
      </mt-tab-item>  
    </mt-tabbar>  
  </div>
</template>
<script>
export default {
  name: 'Tabbar',
  data(){
    return {
      selected: '外卖',
      examplename: 'Tabbar'
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>
<style scoped>
  .mint-tabbar.is-fixed {
    height: 55px;
  }
  /* .mint-tab-item {
    line-height: 40px;
  } */
  .page-tabbar-container {
    margin-bottom: 55px;
  }
</style>
