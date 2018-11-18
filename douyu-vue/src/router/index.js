import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/home')
    },
    {
      path: '/category/:type',
      name: 'category',
      component: () => import('@/views/category')
    },
    {
      path: '/rooms/:name',
      name: 'rooms',
      props: true,
      component: () => import('@/views/rooms')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/detail')
    },
    {
      path: '*',
      component: () => import('@/views/home')
    }
  ]
})
