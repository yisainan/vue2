// 入口文件
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'     //实时查看修改日志
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 判断当前环境
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,
    plugins:debug ? [createLogger()] : []
})
