import Progress from './components/progress.vue'
import './styles/less/index.less'

const install = function (Vue, opts = {}) {
  if (install.installed) return
  Vue.component('VmProgress', Progress)
}

if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('VmProgress', Progress)
}

Progress.install = install

export default Progress
