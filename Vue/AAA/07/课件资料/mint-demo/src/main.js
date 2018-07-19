import Vue from 'vue'
import App from './App.vue'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);

new Vue({
  el: '#app',
  render: h => h(App)
})
