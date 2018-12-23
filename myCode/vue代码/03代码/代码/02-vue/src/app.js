
//加载vue
import Vue from 'vue'

//加载mint-UI组件   全局导入
import mintUI from 'mint-ui'
Vue.use(mintUI);

//导入mint-引入mui的样式
import '../node_modules/mint-ui/lib/style.css'


//加载组件
import app from './app.vue'

//引入mui的样式
import '../statics/css/mui.css'

import '../statics/css/style.css'



//引用vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);

//引入路由模块
import VueRouter from 'vue-router'
//使用路由模块
Vue.use(VueRouter);

//加载组件  
//记载底部导航栏对应的组件
import home from './components/Home/home.vue';
import member from './components/Member/member.vue';
import shopcar from './components/Shopcar/shopcar.vue';
import search from './components/Search/search.vue';
//

//创建路由对象
let router = new VueRouter({
  //配置router-link 指向的路由发生变化时候，当前a标签增加的激活样式
  linkActiveClass: 'mui-active',
  routes: [
    //如果是/路径的话跳转到 /home
    {name: 'Root', path: '/', redirect: '/home'},
    //底部导航栏的路由
    {name: 'Home', path: '/home', component: home},
    {name: 'Member', path: '/member', component: member},
    {name: 'Shopcar', path: '/shopcar', component: shopcar},
    {name: 'Search', path: '/search', component: search}
    
  ]
})




var vm = new Vue({
  el: '#app',
  render: h => h(app),    //h 是 createElement这个函数  编译app.vue组件
  //使用路由对象
  router: router
});