import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// We are using Webpack code splitting here so that each route's associated
// component code is loaded on-demand only when the route is visited.
// It's actually not really necessary for a small project of this size but
// the goal is to demonstrate how to do it.
//
// Note that the dynamic import syntax should actually be just `import()`
// but buble/acorn doesn't support parsing that syntax until it's stage 4
// so we use the old System.import here instead.
//
// If using Babel, `import()` can be supported via
// babel-plugin-syntax-dynamic-import.

const createListView = name => () =>
  System.import('../views/CreateListView').then(m => m.createListView(name))
const Top250 = () => System.import('../views/Top250.vue')
const MoviesDetail = () => System.import('../views/moviesDetail.vue')
const Search = () => System.import('../views/searchList.vue')
const moving = () => System.import('../views/moving.vue')
const Upcoming = () => System.import('../views/Upcoming.vue')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/moving',
      component: createListView('moving')
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: Upcoming
    },
    {
      path: '/top250',
      name: 'Top250',
      component: Top250
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/moviesDetail',
      name: 'moviesDetail',
      component: MoviesDetail
    },
    {
      path: '/',
      redirect: '/moving'
    }
  ]
})
