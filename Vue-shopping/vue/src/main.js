import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './Api'
Vue.prototype.Api = Api           // 请求接口类
import './vant'                   // 有赞组件库
import FastClick from 'fastclick' // 解决300毫秒延时
FastClick.attach(document.body)
// import NProgress from 'nprogress' // 路由进度条
// import 'nprogress/nprogress.css'
import 'vant/lib/index.css'
import 'css/reset.css'
import 'swiper/dist/css/swiper.css'
import 'css/border.css'
import 'css/index.css'
import 'css/icon.styl'
import 'css/cropper.css'

Vue.config.productionTip = false


// 如果是非线上环境，加载 VConsole
// if (process.env.NODE_ENV !== 'production') {
//     var VConsole = require('vconsole/dist/vconsole.min.js');
//     var vConsole = new VConsole();
// }
// NProgress.configure({
//     easing: 'ease',  // 动画方式    
//     speed: 500,  // 递增进度条的速度    
//     showSpinner: false, // 是否显示加载ico    
//     trickleSpeed: 200, // 自动递增间隔    
//     minimum: 0.3 // 初始化时的最小百分比
// })

// router.beforeEach((to, from , next) => {
//     // 每次切换页面时，调用进度条
//     NProgress.start();
//     // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
//     next();
// });

// router.afterEach(() => {  
//     // 在即将进入新的页面组件前，关闭掉进度条
//     NProgress.done()
// })

Vue.filter('toFixed', function (val) {
    val = Number(val)
    return val.toFixed(2)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
