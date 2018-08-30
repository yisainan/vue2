<template>
  <div id="container">
    <header class="mui-bar mui-bar-nav">
      <a v-if="isShow" @click="goback" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
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
        <span class="mui-icon mui-icon-upload"><span class="mui-badge">{{count}}</span></span>
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
  import { getItems } from './common/localstorageHelp.js'

  //引入其它模块
  import { objVue } from './communication.js'

  objVue.$on('updatebadge', (count) => {
    ///console.log("update" + count);

    let badge = document.querySelector('.mui-badge')
    badge.innerHTML = parseInt(badge.innerHTML) + count;

  })

  //从本地存储中获取商品的个数，更新界面
  objVue.$on('update', () => {
    //获取本地存储中 商品总数
      let array = getItems();

      let count = 0;
      array.forEach((item) => {
        count += item.count;
      });

       let badge = document.querySelector('.mui-badge')
      badge.innerHTML = count;
  })

  //导出当前组件
  export default {
    data() {
      return {
        count: 0,
        isShow: false
      }
    },
    created() {
      this.getbadge();

      this.isShow = true;
      let array = ['/home', '/member', '/shopcar', '/search'];
      //判断数组中 是不是存在指定的内容
      if(array.includes(this.$route.path)) {
        this.isShow = false;
      }
    },
    methods: {
      getbadge() {
        //获取本地存储中 商品总数
        let array = getItems();

        let count = 0;
        array.forEach((item) => {
          count += item.count;
        })
         this.count = count;
      },
      //返回
      goback() {

        this.$router.go(-1);
      }
    },
    watch: {
      '$route': function (newValue, oldValue) {
      //newValue 是跳转之后的路由对象  newValue.path 路由地址
        this.isShow = true;

        let array = ['/home', '/member', '/shopcar', '/search'];
        //判断数组中 是不是存在指定的内容
        if(array.includes(newValue.path)) {
          this.isShow = false;
        }
        
      }
    }
  }



</script>

<style scoped>

  .clr {
    background-color: red;
  
  }


</style>