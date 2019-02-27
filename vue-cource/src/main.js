import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/font/iconfont.js'
import '@/assets/font/iconfont.css'
import IconFont from '_c/icon-font'
import IconSvg from '_c/icon-svg'
if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.component('icon-font', IconFont)
Vue.component('icon-svg', IconSvg)
Vue.use(iview)

const handleClick = event => {
  console.log(event)
  event.stopPropagation()
}

let list = [{name: 'lison'}, {name: 'lili'}]
const getLiEleArr = (h) => {
  return list.map((item, index) => h('li', {
    on: {
      'click': handleClick
    },
    key: `list_item_${index}`
  }, item.name))
}

new Vue({
  router,
  store,
  // render: h => {
  //   return h(CountTo, {
  //     'class': [],
  //     attrs: {},
  //     style: {},
  //     props: {
  //       endVal: 100
  //     },
  //     // domProps: {
  //     //   innerHTML: '123'
  //     // },
  //     on: {
  //       'on-animation-end': (val) => {
  //         console.log('animation end!')
  //       }
  //     },
  //     nativeOn: {
  //       'click': () => {
  //         console.log('click!')
  //       }
  //     },
  //     directives: [],
  //     scopedSlots: {},
  //     slot: '',
  //     key: '',
  //     ref: ''
  //   })
  // }
  // render: h => h('div', [
  //   h('ul', {
  //     on: {
  //       'click': handleClick
  //     }
  //   }, getLiEleArr(h))
  // ])
  render: h => h(App)
}).$mount('#app')
