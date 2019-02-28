import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // routes: routes // 可以简写为
  routes
})
