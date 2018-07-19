## vue-router

## 官网

https://router.vuejs.org/zh-cn/

### 单页应用

### 前端路由

根据不同的url(仅仅是#号后面不同)，加载不同的vue组件

### 路由规则

#/news/detail/13
#/Home
#/Home/news

#/Home/news/:id   要传递一个id的值
#/Home/news/13


### 安装vue-router模块

cnpm install vue-router --save

### 在入口文件中导入vue-router模块

import vueRouter from 'vue-router'

### 使用vue-router

Vue.use(vueRouter)

### 配置路由规则

let router = new vueRouter({
	routes: [
		{name: '路由规则的名称，可以省略', path:'路由规则的形式', component: vue组件},
		{name: 'login', path: '/Account/login', component: login},
		{name: 'register', path: '/Account/register', component: register}
	]
});	

### 使用路由规则

new Vue({
	el: '#app',
	router: router,
	render: c => c(App)
})


### 入口文件中的代码

```
import Vue from 'vue' //从node_modules中加载vue模块
import vueRouter from 'vue-router'

import App from './App.vue'   //加载.vue组件
import Login from './components/login.vue'
import Register from './components/register.vue'

Vue.use(vueRouter);

let router = new vueRouter({
	routes: [
		{name: 'login', path: '/Account/login', component: Login},
		{name: 'register', path: '/Account/register', component: Register}
	]
});	

new Vue({
	el: '#app',  //将组件中的内容插入到页面中指定的元素
	router: router,
	render: c => c(App)  //编译app.vue组件
})
```

### App.vue中设置路由对应组件的站位

<!-- 路由匹配的组件要渲染到这里 -->
<router-view></router-view>

### 更改a标签为 router-link

<router-link to="/Account/login">登录</router-link>
<router-link to="/Account/register">注册</router-link>

### 路由参数

1. 传递参数

<router-link to="/Account/login/13">登录</router-link>

2. 修改路由规则

{name: 'login', path: '/Account/login/:id', component: Login}

3. 接收参数

{{this.$route.params.id}}