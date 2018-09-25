import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import uploadImg from '@/components/uploadImg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: uploadImg
    }
  ]
})
