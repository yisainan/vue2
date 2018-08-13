import Vue from 'vue'
import App from './App.vue'

import Progress from '../../src/index.js'
// Vue.component('vm-progress', Progress)
Vue.use(Progress)

import VueDemonstration from 'vue-demonstration'
Vue.component('demonstration', VueDemonstration)

import { Button, ButtonGroup } from 'vue-multiple-button'
import 'vue-multiple-button/lib/button.css'
Vue.component('vm-button', Button)
Vue.component('vm-button-group', ButtonGroup)

new Vue({
  el: '#app',
  render: h => h(App)
})
