/**
 * @author monkeywang
 * Date: 17/3/22
 */
import {Utils} from '../util'

let utils = new Utils()
export const actions = {
  /**
   * 获取电影列表
   * @param commit
   */
  getMoving ({commit, state}) {
    utils.get('/movie/in_theaters', {city: state.city}).then(res => {
      commit('MOVING_LIST', {list: res})
      commit('MOVING_LOADING', {loading: false})
    })
  },
  /**
   *获取电影详情
   * @param commit
   */
  getMovieDetail ({commit, state}) {
    utils.get(`/movie/subject/${state.id}`, {}).then(res => {
      commit('DETAIL_LOADING', {loading: false})
      commit('MOVING_DETAIL', {movieDetail: res})
    })
  },
  /**
   * 获取当前城市即将上映电影列表
   * @param commit
   * @param state
   */
  getUpcoming ({commit, state}) {
    utils.get('/movie/coming_soon', {city: state.city, start: state.upcomBody.start + 1}).then(res => {
      if (state.upcomBody.subjects && state.upcomBody.subjects.length) {
        res.subjects = state.upcomBody.subjects.concat(res.subjects)
        commit('PAGE_LOAD', {pageload: false})
      }
      // res.start = state.upcomBody.start + 1;
      // console.log(res,state.upcomBody)
      commit('UP_COMBODY', {upcomBody: res})
      commit('UP_COMING', {loading: false})
    })
  },
  /**
   * 获取排名250
   * @param commit
   * @param state
   */
  loadingtop250 ({commit, state}) {
    utils.get('/movie/top250', {start: state.start, count: 7}).then(res => {
      console.log(res)
      commit('LOAD_TOP250', {ranking250: res})
      commit('MOVING_LOADING', {loading: false})
    })
  },
  /**
   * 获取搜索列表
   * @param commit
   * @param state
   */
  getSearchList ({commit, state}) {
    console.log(state.searchText)
    utils.get('/movie/search', {q: state.searchText}).then(res => {
      commit('SEARCH_LIST', {searchList: res})
      commit('SEARCH_LOADING', {loading: false})
    })
  },
  /**
   * 获取电影短评
   * @param commit
   * @param state
   */
  getMovieList ({commit, state}) {
    utils.get(`/movie/subject/${state.id}/comments`, {}).then(res => {
      commit('MOVIE_COMMENT', {comment: res})
    })
  }
}