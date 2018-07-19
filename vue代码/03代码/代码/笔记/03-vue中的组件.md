## vue中的组件

### 组件的好处

组件可以重用

### 组件的组成

<template>
	//编写html代码

	//注意：在vue2.x以后 template只能有一个根节点
</template>

<script>
	//导入其它模块/组件/文件(css/字体文件等)

	//导出组件
	 export default {
        data() {
            return {
                greeting: 'hello world'
            }
        }
    }
</script>

<style>
	//编写样式
</style>

### 组件的使用

- 页面上的使用

+ index.html页面模板中增加

<div id="app"></div>

+ main.js中加载vue组件

```
import Vue from 'vue' //从node_modules中加载vue模块

import App from './App.vue'   //加载.vue组件

new Vue({
	el: '#app',  //将组件中的内容插入到页面中指定的元素
	render: c => c(App); //编译app.vue组件
})
```


- 安装编译.vue的插件
cnpm install vue-loader --save-dev
cnpm install vue-template-compiler --save-dev



cnpm install vue --save


- webpack.config.js中的配置

```javascript
{
    test: /\.vue$/,
    loader: 'vue-loader'
 }
```


