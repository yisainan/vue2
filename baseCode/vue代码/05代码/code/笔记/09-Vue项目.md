## Vue项目

### 打包
new CopyWebpackPlugin([
    {from: 'statics', to:'statics'}
]),
// 压缩js
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    comments: false //去掉版权信息等注释
}),
// 代码顺序优化
new webpack.optimize.OccurrenceOrderPlugin()

### vue-router地址

https://router.vuejs.org/zh-cn/


### 为移动端页面设置meta标签

<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

### 搭建好底部导航

- 路由配置

//配置路由
let router = new vueRouter({
	//点击router-link时候，添加的激活样式
	linkActiveClass: 'mui-active',
	routes: [
		//路由跳转 访问/ 是跳转到#/home
		{name: 'Root', path: '/', redirect: '/home'},
		{name: 'Home', path: '/home', component: Home},
		{name: 'Member', path: '/member', component: Member},
		{name: 'Shopcar', path: '/shopcar', component: Shopcar},
		{name: 'Search', path: '/search', component: Search}
	]
});

- 配置不同路由的页面标题

//设置不同路由的标题
router.afterEach((to, from, next) => {
  document.title = to.name;
})


- 设置tabbar的按钮激活

let router = new vueRouter({
	//点击router-link时候，添加的激活样式
	linkActiveClass: 'mui-active',
	…………

### Home页

- 9宫格 mui
- 9宫格 动态获取数据
- 轮播图  mint
- 把轮播图封装成组件

### 新闻资讯

- 两边对其

.container {
	display: flex;
	justify-content: space-between;
}

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

- 新闻列表超出后显示省略号

.mui-media-body{
	overflow: hidden; 
	text-overflow:ellipsis; 
	white-space: nowrap;
}

- 日期格式化模块

+ 官网

http://momentjs.cn/

+ 下载

cnpm install moment --save  

+ 使用
import moment from 'moment'
//全局过滤器
Vue.filter('fmtdate', function(input, format) {
	return moment(input).format(format);
});

//使用过滤器
{{item.add_time | fmtdate('YYYY-MM-DD}}


### 新闻详细页面

- 搭建布局
- 设置路由，设置路由参数

<router-link v-bind='{to:"/news/"+ item.id}'></router-link>

- 获取路由参数
	this.$route.params.id

- 评论

+ 设置评论子组件
+ 获取评论列表
+ 发表评论
+ 加载更多


### 图片分享

- 搭建页面布局
- 设置路由
- 动态获取数据
- 操作dom

+ 标签上设置ref

<ul ref='cateUL'>

+ 通过$refs获取元素

this.$refs.cul.style.width = 65 * (response.body.message.length + 1) + 'px';

### 图片分享详细页面

- 搭建页面布局
- 设置路由
- 动态获取数据
- 9宫格展示图片
- 加载评论组件
- 图片预览插件

https://github.com/LS1231/vue-preview


### 商品购买

- 搭建页面布局
- 设置路由
- 动态获取数据
- 跳转到商品详情
<router-link v-bind='{to: "/buy/" + item.id}'></router-link>

### 商品详情

- 搭建页面布局
- 设置路由
- 轮播图
- 图文介绍、商品评论
- 实现购买数量的子组件
- 点击 加入购物车，添加动画

1. 设置标签
<transition name="fade" 
                 v-on:before-enter="beforeEnter"
                 v-on:enter="enter"
                 v-on:after-enter="afterEnter"
                 >
                    <div v-if="isShow" class="ball"></div>
                 </transition>

2. 设置动画相关方法和事件

	addshopcar() {
		this.isShow = !this.isShow;
	},
	beforeEnter(el) {
		el.style.transform = 'translate3d(0,0,0)';
	},
	enter(el, done) {
		let span = document.querySelector('.mui-badge');

		let elX = el.getBoundingClientRect().left;
		let elY = el.getBoundingClientRect().top;

		let spanX = span.getBoundingClientRect().left;
		let spanY = span.getBoundingClientRect().top;

		let x = spanX - elX;
		let y = spanY - elY;

		el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px,0)';

		done();
	},
	afterEnter(el) {
		this.isShow = !this.isShow;
	}
3. 样式 

.ball {
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
        /*display: none;*/
    }

+ number.vue子组件通知buydetail.vue父组件，值变化

1. number.vue中，this.$emit('getcount', this.value);   触发事件
2. buydetail.vue中 

	<number @getcount="getcount"></number>
	 //自定义的事件，接受number组件发送过来的count
	getcount(count) {
		this.count = count;
		console.log(this.count);
	}
+ 加入购物车实现思路

1. 点击+ - 的时候让number.vue通知详细页面值发生变化，并记录值
2. 点击加入购物车，实现动画，见上面
3. 把当前商品id和商品的count存储到localStorage中
4. 计算totalcount（购物车中商品的总数），把值显示到badge中
5. 其它：在首页加载的时候，获取localStorage中的商品总数，显示到badge中

- 代码

1. 加入购物车的代码

```
    //获取localStorage中之前的所有count
    let totalCount = 0;
    let goods = getItem();
    goods.forEach((item) => {
        totalCount += item.count;
    })

    //加上当前的count
    totalCount += this.count;


    //把本次的count记录到localStorage中
    setItem({
        goodsId: this.$route.params.id,
        count: this.count
    })
    //通过一个通信用的vue实例，把badge数据更新
    vueObj.$emit('updatebadge', totalCount);
```

``` app.vue中
import {vueObj} from './communication.js'

vueObj.$on('addBadge', function(totalCount) {
    console.log(totalCount)
})
```

### 购物车

实现思路，购物车的数据存储在localStorage中，先写一个localStorageHelp的模块，封装读写localStorage的方法

1. 在商品详情页中，点击加入购物车按钮，把商品id和商品数量存储在localStorage中
2. 购物车页面，首先从localStorage中把localStorage中存储的数据读取出来，把商品的id构造成 1,2,3的形式
3. 向服务器发送请求，获取数据并绑定到页面上显示
4. 在number组件中显示商品数量
5. 处理多个switch控件的选中和不选中，设置values数组，并在获取服务器方法中设置默认值为false
6. 点击删除按钮，根据商品id找到找到goodslist索引，删除values和goodslist中对应的项，根据商品id删除localStorage中的数据
7. 处理number组件 + -的时候更新localStorage和badge
	number组件中，触发事件，传递参数
	this.$emit('count', {type:this.type, goodsId:this.goodsId, count:this.count});
	购物车中更新界面和localStorage
	 getcount(obj) {
                if (obj.type == 'add') {
                    setItem({
                        goodsId: obj.goodsId,
                        count: 1
                    });
                    this.updategoodslist(obj.goodsId, 1);
                } else if (obj.type == 'sub') {
                    subtractItem(obj.goodsId);
                    this.updategoodslist(obj.goodsId, -1);
                }
            },
            //更新goodslist
            updategoodslist(goodsId, num) {
                this.getTotalPrice();
                let count = 0;
                this.goodslist.forEach(item => {
                    if (item.id == goodsId) {
                        item.count = item.count + num;
                    }
                    count += item.count;
                })
                let span = document.querySelector('.mui-badge');
                span.innerHTML = count;
            }
8. 监听以选择商品数量和总价
	computed: {
            getTotalCount() {
                let array = this.values.filter(c => c);
                let totalCount = array.length;

                this.getTotalPrice();

                return totalCount;
            }
        }

	getTotalPrice() {
                this.totalPrice = 0;
                this.values.forEach((item, index) => {
                    if (item) {
                        this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
                    }
                });
            }


- 购物车中的代码

```
 export default {
        data() {
            return {
                values: [],
                goodslist: [],
                totalPrice: 0
            }
        },
        components: {
            number
        },
        created() {
            this.initpage();
        },
        methods: {
            getcount(obj) {
                if (obj.type == 'add') {
                    setItem({
                        goodsId: obj.goodsId,
                        count: 1
                    });
                    this.updategoodslist(obj.goodsId, 1);
                } else if (obj.type == 'sub') {
                    subtractItem(obj.goodsId);
                    this.updategoodslist(obj.goodsId, -1);
                }
            },
            //更新goodslist
            updategoodslist(goodsId, num) {
                this.getTotalPrice();
                let count = 0;
                this.goodslist.forEach(item => {
                    if (item.id == goodsId) {
                        item.count = item.count + num;
                    }
                    count += item.count;
                })
                let span = document.querySelector('.mui-badge');
                span.innerHTML = count;
            },
            initpage() {
                //0 获取localStorage中的数据，反馈{goodsId: count}的形式
                function getItems() {
                    let obj = {};
                    let goods = getItem();
                    goods.forEach((item) => {
                        if (obj[item.goodsId]) {
                            obj[item.goodsId] += item.count;
                        } else {
                            obj[item.goodsId] = item.count;
                        }
                    })
                    return obj;
                }
                //1 获取购物车所有商品的id，构造成 1,2,3的形式
                let obj = getItems();
                let ids = [];
                for (let key in obj) {
                    ids.push(key);
                }
                if (ids.length === 0) {
                    return;
                }
                ids = ids.join(',');

                //2 发送ajax请求，获取购物车数据
                let url = this.config.apiHost + 'goods/getshopcarlist/' + ids;
                this.$http.get(url).then((response) => {
                    if (response.body.status === 0) {
                        this.goodslist = response.body.message;

                        //给goodslist中的每一个商品添加上count属性，记录总个数
                        this.goodslist.forEach((item, index) => {
                                item.count = obj[item.id];
                                this.values[index] = false;
                            })
                            //全部初始化为false

                    }
                }, () => {
                    this.$toast('服务器内部错误');
                })

            },
            delItem(goodsId) {
                let index = this.goodslist.findIndex(item => item.id === goodsId);
                if (index >= 0) {
                    this.goodslist.splice(index, 1);
                    this.values.splice(index, 1);
                }
                //删除localStorage中对应的项目
                removeItem(goodsId);

                //更新badge
                let badge = 0;
                this.goodslist.forEach(item => {
                    badge += item.count;
                });

                let span = document.querySelector('.mui-badge');
                span.innerHTML = badge;

            },
            getTotalPrice() {
                this.totalPrice = 0;
                this.values.forEach((item, index) => {
                    if (item) {
                        this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
                    }
                });
            }
        },
        computed: {
            getTotalCount() {
                let array = this.values.filter(c => c);
                let totalCount = array.length;

                this.getTotalPrice();

                return totalCount;
            }
        }
    }
```

### 全局处理返回按钮，App.vue中

- 添加返回按钮，使用mui的样式 

<a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>

- 注册点击事件

	v-on:click="goback"

	methods: {
		//返回
		goback() {
			this.$router.go(-1);
		}
	}

- 监视路由的变化

	watch: {
            '$route': function(newValue, oldValue) {
                var paths = ['/home', '/member', '/shopcar', '/search'];
                if (paths.includes(newValue.path.toLowerCase())) {
                    this.isShow = false;
                } else {
                    this.isShow = true;
                }
            }
        }

- 绑定

	v-if="isShow"

	data() {
		return {
			isShow: true
		}
	}

- 解决刷新的问题

	created() {
            var paths = ['/home', '/member', '/shopcar', '/search'];
            if (paths.includes(this.$route.path.toLowerCase())) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        },



- localStorageHelp

// {goods: [{goodsId:1, count1}]}


//获取所有数据
export function getItem() {
    return JSON.parse(localStorage.getItem('goods') || '[]')
}

//添加一项
export function setItem(json) {
    let goods = JSON.parse(localStorage.getItem('goods') || '[]');

    let hasItem = false;
    goods.forEach(item => {
        if (item.goodsId == json.goodsId) {
            item.count += json.count;
            hasItem = true;
            return;
        }
    })
    if (!hasItem) {
        goods.push(json);
    }
    localStorage.setItem('goods', JSON.stringify(goods));
}

//给某项 -1
export function subtractItem(goodsId) {
    let goods = JSON.parse(localStorage.getItem('goods') || '[]');

    goods.forEach(item => {
        if (item.goodsId == goodsId) {
            item.count -= 1;
            return;
        }
    })
    localStorage.setItem('goods', JSON.stringify(goods));

}

export function removeItem(goodsId) {
    let array = JSON.parse(localStorage.getItem('goods') || '[]');
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].goodsId == goodsId) {
            array.splice(i, 1);
        }
    }
    localStorage.setItem('goods', JSON.stringify(array));
}