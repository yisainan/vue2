import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./views/Home')
const Category = () => import('./views/Category')
const ShoppingCart = () => import('./views/ShoppingCart')
const My = () => import('./views/My')
const Details = () => import('./views/Details')
const Login = () => import('./views/Login')
const Address = () => import('./views/Address')
const AddressEdit = () => import('./views/AddressEdit')
const Collection = () => import('./views/Collection')
const MyOrder = () => import('./views/MyOrder')
const City = () => import('./views/City')
const ShoppingPayMent = () => import('./views/ShoppingPayMent')
const Evaluate = () => import('./views/Evaluate')
const Aevaluated = () => import('./views/Aevaluated')
const Rate = () => import('./views/Rate')
const Browse = () => import('./views/Browse')
import store from './store'
Router.prototype.animate = 0    // 定义路由跳转动画
Vue.use(Router)
/**
 * requireAuth 该页面登录了就不让进去
 * keepAlive  需要缓存的页面
 */
const router = new Router({
    // mode: 'history',
    routes: [
        { path: '/', redirect: '/home' },             //  首页
        { path: '/home', name: 'Home', component: Home, meta: { keepAlive: true } },//  首页
        { path: '/category', name: 'Category', component: Category, meta: { keepAlive: true } },// tab分类
        { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },// tab购物车
        { path: '/details', name: 'Details', component: Details, props: (route) => ({ id: route.query.id }), meta: { keepAlive: true } },      // 商品详情
        { path: '/my', name: 'My', component: My },                   // 个人中心
        { path: '/order', component: MyOrder, name: 'MyOrder' },     // 我的订单
        { path: '/collection', name: 'Collection', component: Collection },// 我的收藏
        { path: '/browse', name: 'Browse', component: Browse },      // 我的浏览记录
        { path: '/evaluate', component: Evaluate, name: 'Evaluate' }, // 我的评价记录
        { path: '/aevaluated', component: Aevaluated, name: 'Aevaluated', props: (route) => ({ id: route.query.id }) },// 查看已经评价
        { path: '/rate', component: Rate, name: 'Rate', props: (route) => ({ id: route.query.id }) },            // 评价商品
        { path: '/address', name: 'Address', component: Address }, // 地址
        { path: '/addressEdit', name: 'AddressEdit', component: AddressEdit }, // 新增和编辑地址
        { path: '/login', name: 'Login', component: Login, meta: { requireAuth: false} }, // 登入
        { path: '/city', component: City, name: 'City' },   // 城市选择
        { path: '/shoppingPayMent', name: 'ShoppingPayMent', component: ShoppingPayMent }, // 支付页面
        { path: '*', redirect: '/home' },   // 首页
    ]
})

// 设置title
const TITLE = {
    Home: '首页',
    Category: '商品分类',
    ShoppingCart: '购物车',
    Details: '商品详情',
    My: '个人中心',
    MyOrder: '我的订单',
    Collection: '我的收藏',
    Browse: '浏览历史',
    Evaluate: '评价中心',
    Aevaluated: '查看评价',
    Rate: '评价商品',
    Address: '地址列表',
    AddressEdit: '地址编辑',
    Login: '注册登录',
    City: '城市选择',
    ShoppingPayMent: '订单结算',
}



router.beforeEach((to, from, next) => {
    document.title = TITLE[to.name]
    if (to.meta.requireAuth === false) { 
        /* 
          从Vuex拿出token码，说明已登陆
        */
        if (store.state.token) {
            next({path: '/home',})
        } else {
            next() 
        }
    } else { 
        next();
    }
})


export default router
