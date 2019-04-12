// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import './assets/css/iconfont.css'
import './assets/css/indexicon.css'
import './assets/css/font-awesome.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mint-ui/lib/style.css'
// import 'jquery/dist/jquery.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/globle.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
