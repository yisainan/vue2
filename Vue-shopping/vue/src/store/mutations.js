import * as types from './mutations-type'
const matutaions = {
    [types.CATEGORY](state,category) {
        state.category = category
    },
    [types.CATEGORY_TAB_LIST](state,categoryTabList) {
        state.categoryTabList = categoryTabList
    },
    [types.GOODS_DETAILS](state,goodsDetails) {
        state.goodsDetails = goodsDetails
    },
    [types.USERNAME](state,userName) {
        state.userName = userName
    },
    [types.ADDRESS_INFO](state,addressInfo) {
        state.addressInfo = addressInfo
    },
    [types.BROWSE](state,browse) {
        state.browse = browse
    },
    [types.SHOP_ORDER_LIST](state,shopOrderList) {
        state.shopOrderList = shopOrderList
    },
    [types.TEMP_ORARY_ADDRESS](state,temporaryAddress) {
        state.temporaryAddress = temporaryAddress
    },
    [types.CITY](state,city) {
        state.city = city
    },
    [types.SEARCH_HISTORY_LIST](state,searchHistoryList) {
        state.searchHistoryList = searchHistoryList
    },
    [types.TOKEN](state,token) {
        state.token = token
    }
}

export default matutaions