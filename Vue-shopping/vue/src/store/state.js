import {tab,address,recentlyBrowse,city,searchHistory,token} from 'js/cache'
const state = {
    category: tab.getTab(),   //分类条目
    categoryTabList:{}, // 分类页面tab对应数据缓存
    goodsDetails: {},   // 商品详情
    userName: null,       // 用户信息
    addressInfo: address.getAddress(),    //  保存要修改的地址
    browse: recentlyBrowse.getBrowse(), // 最近浏览
    shopOrderList: [],      // 购物车去结算的时候存入vuex
    temporaryAddress: '',   // 结算时候选择的地址
    city: city.getCity(),
    searchHistoryList: searchHistory.getHistory(),   // 搜索历史
    token: token.getToken(),      //判断用户有没有登录
}

export default state