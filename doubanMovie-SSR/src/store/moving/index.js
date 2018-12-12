/**
 * @author monkeywang
 * Date: 17/3/15
 */
import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
const state = {
  title: 'doubanMovie', // App 标题
  movingList: {  // 正在上映列表
    subjects: []
  },
  searchList: {  // 搜索列表
    subjects: []
  },
  searchText: '', // 搜索内容
  loadingMoving: true, // 正在上映是否显示loading
  loadingUpComing: true, // 即将上映是否显示loading
  searchLoading: true, // 搜索列表是否显示loading
  pageload: false, // 是否正在加载分页
  upcomBody: {  // 即将上映的电影列表
    subjects: [],
    start: 0
  },
  loadingDetail: true, // 电影详情是否显示loading
  ranking250: {}, // top 250列表
  city: '杭州', // 当前城市 默认'杭州'
  movieDetail: { // 电影详情
    rating: {},
    images: {}
  },
  id: '', // 电影ID
  start: 0, // top 250分页起点
  movieComment: {} // 电影短评
}

export default {
  state,
  getters,
  actions,
  mutations
}
