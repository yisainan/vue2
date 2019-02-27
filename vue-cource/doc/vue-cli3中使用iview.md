# Vue-cli3.0中使用iview

## 1.全局引入

在项目入口文件<code>./main.js</code>中需要配置如下：

```javascript
import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iview)
```

## 2.按需引入

> 首先你需要安装一个babel插件: npm install babel-plugin-import --save-dev

在vue-cli3生成的项目中，babel的配置文件是<code>babel.config.js</code>，默认配置是这样的：

```javascript
module.exports = {
  presets: [
    '@vue/app'
  ]
}
```

你需要将刚刚安装的插件添加进去，添加后的内容如下：

```javascript
module.exports = {
  presets: [
    '@vue/app'
  ],
  'plugins': [['import', {
    'libraryName': 'iview',
    'libraryDirectory': 'src/components'
  }]]
}
```

接下来在main.js里你可以这样按需引入：

```javascript
import 'iview/dist/styles/iview.css' // iview的样式文件还是要引入的
import { Button, Table } from 'iview'
Vue.component('Button', Button)
```

在非template/render模式下，包括JSX写法中，组件名要用分隔形式，如<code>DatePicker</code>要写为<code>date-picker</code>。**而对于iview中名称和原生HTML标签名相同的组件，需要加i-前缀**，如<code>Button</code>要写为<code>i-button</code>。

我们可以通过配置*iview-loader*来解决<code>Switch</code>在任何模式下都必须写为<code>i-switch</code>，<code>Circle</code>要写为<code>i-circle</code>的问题。

## 3.vue-cli3.0中配置iview-loader

首先需要安装iview-loader：

> npm install iview-loader --save-dev

接下来在vue.config.js中添加*iview-loader*：

```javascript
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('iview')
      .loader('iview-loader')
      .options({prefix: false})
  }
}
```