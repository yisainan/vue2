import {tab,address,recentlyBrowse,city ,searchHistory,token} from 'js/cache'
import * as types from './mutations-type'
export const setTab = function ({ commit }, tabs) {
    commit(types.CATEGORY, tab.setTab(tabs))
}

export const setCategoryTabList = ({commit,state},{id,list}) => {
    let newData = state.categoryTabList
    if (!newData[id]) {
        newData[id] = list
    }
    commit(types.CATEGORY_TAB_LIST,newData)
}

// 保存要修改的地址
export const setAddress = function({ commit }, list) {
    commit(types.ADDRESS_INFO, address.setAddress(list))
}

// 清楚要修改的地址
export const clearAddress = function({ commit }) {
    commit(types.ADDRESS_INFO, address.clearAddress())
}

// 最近浏览, 加入缓存
export const setBrowse = function({commit,state},data) {
    commit(types.BROWSE, recentlyBrowse.setBrowse(data))
}

// 清除一条，最近浏览
export const deleteOne = function ({commit},id) {
    commit(types.BROWSE, recentlyBrowse.deleteOne(id))
}

// 选择地址
export const selectCity = function ({commit},citys) {
    commit(types.CITY, city.setCity(citys))
}

// 搜索历史
export const setSearchHistory = function({commit},data) {
    commit(types.SEARCH_HISTORY_LIST, searchHistory.setHistory(data))
}

// 清空搜索历史
export const clearSearchHistory = function({commit}) {
    commit(types.SEARCH_HISTORY_LIST, searchHistory.clearHistory())
}

// token
export const setToken = function({commit},k) {
    commit(types.TOKEN, token.setToken(k))
}
export const clearToken = function({commit}) {
    commit(types.TOKEN, token.clearToken())
}
