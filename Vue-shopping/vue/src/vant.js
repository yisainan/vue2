// 用到的部分 vant 组件
import Vue from 'vue'
import {
    Tabbar, TabbarItem, Tab, Tabs, Sku, Tag, Col, Icon,
    Cell, CellGroup, Swipe, SwipeItem, GoodsAction, GoodsActionBigBtn,
    GoodsActionMiniBtn, Search, Row, Lazyload, Checkbox, SubmitBar,
    AddressList, AddressEdit, Area, Button, Popup, Field, DatetimePicker, Picker,
    Rate, Uploader, Loading, NavBar
} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Sku)
    .use(Tag).use(Col).use(Icon).use(Cell).use(CellGroup)
    .use(Swipe).use(SwipeItem).use(GoodsAction)
    .use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(Search)
    .use(Row).use(Checkbox).use(SubmitBar)
    .use(AddressList).use(AddressEdit).use(Area).use(Button).use(Popup)
    .use(Field).use(DatetimePicker).use(Picker).use(Rate).use(Uploader)
    .use(Loading).use(NavBar)

Vue.use(Lazyload, {
    preLoad: 1.3,
    loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547386902287&di=1b9b396eb26d9b74ba874b464ac49631&imgtype=0&src=http%3A%2F%2Ffiles.57gif.com%2Fwebgif%2F0%2F8%2Fcc%2F4b3e361e788ed8b2c2194d214e699.gif',
    attempt: 1
})