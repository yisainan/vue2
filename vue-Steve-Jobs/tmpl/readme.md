#代码片段  
##ccc  
##Router

<router-view></router-view>
<router-link to="/foo">Go to Foo</router-link>


this.$router.push("/home")
this.$router.replace("/user/:id")

this.$router.push({ name: 'user', params: { userId: 123 }})
this.$router.push({ path: 'register', query: { plan: 'private' }})

this.$route.params.id
this.$route.query.id

 watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }


##Vuex

this.$store.commit("mutations",data);
this.$store.dispatch('actions',data);

组件


    "mint-ui": "^2.0.6",
    "sweetalert2": "^5.3.8",


#事件修饰符
.stop
.prevent
.capture
.self
.once


require.ensure(['./mods/stepone.js'], function(){
        var stepone = require('./mods/stepone.js');
        stepone.checkone();
    }, 'stepone'); // 第三个参数设置打包名称