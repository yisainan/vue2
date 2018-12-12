/**
 * @author monkeywang
 * Date: 17/3/15
 */
export const getters = {
  title: state => {
    return state.title
  },
  movingList: state => {
    // for (let subject of state.movingList.subjects) {
    //   subject.rating.average = subject.rating.average / 2
    // }
    return state.movingList
  },
  loadingMoving: state => {
    return state.loadingMoving
  },
  upcomBody: state => {
    return state.upcomBody
  },
  pageload: state => {
    return state.pageload
  },
  city: state => {
    return state.city
  },
  loadingUpComing: state => {
    return state.loadingUpComing
  },
  searchList: state => {
    // for (let subject of state.searchList.subjects) {
    //   subject.rating.average = subject.rating.average / 2
    // }
    return state.searchList
  },
  searchText: state => {
    return state.searchText
  },
  searchLoading: state => {
    return state.searchLoading
  },
  ranking250: state => {
    return state.ranking250
  },
  start: state => {
    return state.start
  },
  id: state => {
    return state.id
  },
  movieDetail: state => {
    state.movieDetail.rating.average = state.movieDetail.rating.average / 2
    return state.movieDetail
  },
  loadingDetail: state => {
    return state.loadingDetail
  },
  movieComment: state => {
    return state.movieComment
  }

}
