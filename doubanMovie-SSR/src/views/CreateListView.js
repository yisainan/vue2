import moving from '../views/moving.vue'
/**
 * 工厂函数 可以动态创建视图
 * @param type
 * @returns {*}
 */
export function createListView (type) {
  return {
    name: type,
    // this will be called during SSR to pre-fetch data into the store!
    preFetch (store) {
      return store.dispatch('getMoving')
    },
    render (h) {
      return h(moving, { props: { type }})
    }
  }
}
