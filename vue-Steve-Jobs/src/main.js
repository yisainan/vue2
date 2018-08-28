import Vue from 'vue'
import App from './App'
import config from './config'
import "./assets/main.css"

import plugin from "./plugin"
Vue.use(plugin)
import store from './store'
import router from './router'
import api from './common/api'
import comm from './common/comm'
comm.init(() => {
    new Vue({
        el: '#app',
        store,
        router,
        render: h => h(App)
    });
})
//import wxapi from './common/wxapi'
if (!config.dev) {
    api("Login/webLogin").then(db => {
        if (db.vid > 0) {
            localStorage.setItem("uid", db.vid);
            localStorage.setItem("uname", db.vname);
            comm.doShare();
        }
        else {//未登陆
            localStorage.setItem("loginbackurl", location.hash);
            router.replace("/login");
        }
    });
    //setTimeout(()=>{   
    //    wxapi.hideMenuItems();
    //},100)
}