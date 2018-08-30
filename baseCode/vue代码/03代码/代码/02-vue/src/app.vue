<template>
  <div id="container">
    <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">vue-cms</h1>
    </header>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
        
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-upload"><span class="mui-badge">9</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
      
    </nav>
    

    <router-view></router-view>
  </div>
</template>

<script>
  //引入其它模块

  //导出当前组件
  export default {
    data() {
      return {
        msg: 'Hello vue  xxxxxx'
      }
    }
  }

</script>

<style scoped>

  .clr {
    background-color: red;
  
  }


</style>