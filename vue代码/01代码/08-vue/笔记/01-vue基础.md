# Vue.js

## 官网

https://cn.vuejs.org/v2/guide/

## 双向数据绑定

## 指令

### v-model

双向绑定

### v-text
### v-html
### v-bind

可以绑定html标签的任何一个属性
示例：
	<a href="#" v-html="msg" v-bind:title="tip" v-bind:pid="id"></a>

### v-if

<span v-if="isOK" v-text="msg"></span>
绑定一个boolean值，如果为true输出，如果为false则不输出

### v-show

<span v-show="isOK" v-text="msg"></span>
绑定一个boolean值，如果为true显示，如果为false则不显示display:none

### v-for

遍历
```
//第一种写法
<ul>
	<li v-for="item in names">
		{{item}}
		<span v-text="item"></span>
	</li>
</ul>

//第二种写法 设置唯一标示
<ul>
	<li v-for="(item,index) in names" :key="index">
		{{index}} {{item}}
		<span v-text="item"></span>
	</li>
</ul>

//第三种写法 遍历对象   :key="item.id"
<ul>
	<li v-for="(item,key,index) in user" :key="index">
		{{index}} {{key}} {{item}}
	</li>
</ul>
```



### v-on

//注册事件
<button v-on:click="btnClick"> 显示或隐藏 </button>
//简写
<button @click="btnClick"> 显示或隐藏 </button>

```
//script中添加执行的方法
	export default {
		data() {
			return {
				msg: '<b>Hello Vue</b>',
				tip: '这是一个提示',
				isOK: false
			}
		},
		methods: {
			btnClick() {
				this.isOK = !this.isOK;
			}
		}
	}
```

## 指令的两个缩写

v-on:click --> @click
v-bind:id  --> :id

## 组件

- 子组件的基本使用

//注意：component中的data要返回function
Vue.component('my-item', {
    data() {
        return {
            count: 0
        }
    },
    template: '<li @click="count += 1">{{count}}</li>'
})

var app = new Vue({
    el: '#app',
    data: {
        msg: 'world'
    }
})
- 控制组件的范围（父组件给子组件传值）

<my-item v-bind:test="msg"></my-item>


var app = new Vue({
    el: '#app',
    data: {
        msg: 'hello'
    },
    components: {
        'my-item': {
            props: ['test'],
            template: '<p>{{test}}</p>'
        }
    }
});

- 子组件通知父组件

<my-item :count="count" @increate="increateDemo"></my-item>


Vue.component('my-item', {
    data() {
        return {}
    },
    props: ['count'],
    template: '<div @click="divClick" >count: {{count}}</div>',
    methods: {
        divClick() {
            this.$emit('increate', '子组件传来的值');
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        count: 0
    },
    methods: {
        increateDemo(c) {
            console.log(c);
        }
    }
});



- 加载.vue的子组件（需要配置好webpack）

        import App from './07-vue.vue' //加载.vue组件

        new Vue({
            el: '#app', //将组件中的内容插入到页面中指定的元素
            render: c => c(App) //编译app.vue组件
        })


## 过滤器

- 私有过滤器

<div id="app">
    <span>
      {{msg | toLower | replace('l','x')}}
    </span>
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        msg: 'Hello Vue'
      },
      filters: {
         toLower: function(input) {
          return input.toLowerCase();
        },
        replace: function(input, old, newValue) {
          var r = new RegExp(old, 'g');
          return input.replace(r, newValue);
        }
      }
    })
  </script>


- 全局过滤器

<div id="app">
    <span>
      {{msg | toLower | replace('l','n')}}
    </span>
  </div>
  <script>
    Vue.filter('toLower', function(input) {
      return input.toLowerCase();
    })

    Vue.filter('replace', function(input, old, newValue) {
      var r = new RegExp(old, 'g');
      return input.replace(r, newValue);
    })

    var app = new Vue({
      el: '#app',
      data: {
        msg: 'Hello Vue'
      }
    })


## 路由

- vue-router组件
    
    https://router.vuejs.org/zh-cn/

- 示例

<div id="app">
    <router-link to="/index">首页</router-link>
    <router-link to="/login">登录</router-link>
    
    <br>

    <router-view></router-view>
  </div>

  <script>
    var index =  Vue.component('index', {
      template: '<div>这是首页</div>'
    })
    var login = Vue.component('login', {
      template: '<div>这是登录</div>'
    })
    var router = new VueRouter({
      routes: [
        {name:'index', path: '/index', component: index}, 
        {name:'login', path: '/login', component: login}
      ]
    })
    var vm = new Vue({
      el: '#app',
      router: router
    })

- 获取路由参数

<div id="app">
    <router-link to="/index/laozhao">首页</router-link>
    <router-link to="/login">登录</router-link>
    
    <br>

    <router-view></router-view>
  </div>

  <script>
    var index =  Vue.component('index', {
      template: '<div>这是首页, {{username}}</div>',
      data: function() {
        return {
          username: ''
        }
      },
      created: function() {
        this.username = this.$route.params.username;
      }
    })
    var login = Vue.component('login', {
      template: '<div>这是登录</div>'
    })
    var router = new VueRouter({
      routes: [
        {name:'index', path: '/index/:username', component: index}, 
        {name:'login', path: '/login', component: login}
      ]
    })
    var vm = new Vue({
      el: '#app',
      router: router
    })


## 发送ajax请求-vue-resource

https://github.com/pagekit/vue-resource

- 发送get请求

<div id="app">
    <button @click="getdata">按钮</button>
    <ul>
      <li v-for="item in menus">{{item.title}}</li>
    </ul>
  </div>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        menus: []
      },
      methods: {
         getdata() {
           this.$http.get('http://127.0.0.1:8899/api/getmenus').then(function( res) {
             this.menus = res.body.message;
           })
         }
      }
    });

- 发送post请求

<div id="app">
    <button @click="senddata">按钮</button>
    
  </div>
  <script>
    var vm = new Vue({
      el: '#app',
      data: {
        menus: []
      },
      methods: {
         senddata() {
           this.$http.post('http://127.0.0.1:8899/api/postcomment/43', {content: 'wokao'},{emulateJSON:true}).then(function( res) {
             console.log(res.body)
           })
         }
      }
    });
  </script>