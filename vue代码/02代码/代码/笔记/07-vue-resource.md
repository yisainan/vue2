## 第三方模块vue-resource

### vue-resource作用

发送ajax请求，以及jsonp

### 学习网站

- http://www.doc00.com/doc/1001004eg
- https://github.com/pagekit/vue-resource
- https://github.com/pagekit/vue-resource/blob/master/docs/http.md

### 下载

npm install vue-resource --save

### 基本使用
- 入口文件中导入vue-resource模块，并使用

//导入模块
import vueResource from 'vue-resource'
//挂载$http
Vue.use(vueResource);   //在this上挂载$http

- get

```
	created: function() {
		this.getUsers();
	},
	methods: {
		getUsers() {
			let url = 'http://182.254.146.100/admin/users';
			this.$http.get(url).then((response)=>{
				//console.log(response.body);
				this.users = response.body;
			}, (response)=>{
				console.log('请求失败');
			})
		}
	}
```

- post

注意：
必须设置emulateJSON: true (设置post请求的content-type)
可以全局设置 Vue.http.options.emulateJSON = true;

```
	created: function() {
		this.createUser();
	},
	methods: {
		createUser() {
			var url = 'http://182.254.146.100/admin/users/create';	
			this.$http.post(url, {nickname:'123', username:'123', password:'123'}, {emulateJSON:true}).then((response) => {
				console.log(response.body);
			}, (response) => {
				console.log('出错了');
			})
		}
	}
```

- jsonp

```
	jsonp() {
		var url = 'http://api.asilu.com/weather?city=北京';
		this.$http.jsonp(url).then(response => {
			console.log(response.body);
		}, response => {
			console.log('出错了')
		})
	}
```
