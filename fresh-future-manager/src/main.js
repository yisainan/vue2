// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

/*可视化编辑器ueditor  start*/
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
/*可视化编辑器ueditor  end*/

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http=axios;

//cookie存值
Vue.prototype.$setCookie = function (name,value,outTime) {
	var Days = outTime; //有效期为多少分
    //取出当前日期，加上有效期，得出有效截止日期
    var exp = new Date();
    exp.setTime(exp.getTime()+ outTime*60*1000);
    console.log(exp.toGMTString())  

    document.cookie=name + "=" +escape(value) + ";expries=" + exp.toGMTString();        
}

//cookie取值
Vue.prototype.$getCookie = function (name) {
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//格式化时间
Vue.filter('date', function (value) {
        if(value*1){
            var date = new Date(value*1);
            var Y = date.getFullYear() + '年';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
            var D = date.getDate() + ' ';
            return Y+M+D;
        }else{
            return ''
        }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
