// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib-flexible'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import FastClick from 'fastclick'
import Cookies from 'js-cookie'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import * as filters from './filters'
import 'swiper/dist/css/swiper.css'
import './assets/css/reset.css'
import '@/icons'

window.addEventListener('load', () => {
  FastClick.attach(document.body)
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.defineProperty(Vue.prototype, '$cookie', { value: Cookies })

Object.defineProperty(Vue.prototype, '$axios', { value: axios })

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
