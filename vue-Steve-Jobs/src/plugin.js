//import swal from 'sweetalert2'
//import 'sweetalert2/dist/sweetalert2.css'
import api from "./common/api";
import comm from "./common/comm";
import VueLazyload from 'vue-lazyload'

mui.init({ swipeBack: true });
exports.install = function (Vue, options) {
    //Vue.prototype.$swal = swal;
    Vue.use(VueLazyload, {
        error: 'img/none.png',
        loading: 'img/none.png',
        //try:2 // default 1
    });
    Vue.prototype.$api = api;
    Vue.filter('json', function (value) {
        return JSON.stringify(value);
    })
    Vue.filter("title", a => {
        return comm.getTitle(a);
    })

    Vue.directive('href', {
        bind: function (el, e, { context }) {
            el.addEventListener("tap", () => {
                var obj = el.obj || e.value
                if (obj == undefined || obj == null) return;
                if (typeof (obj) == "string" && obj.indexOf("http") == 0) {
                    return location = obj;
                }
                if (e.value.replace == true) {
                    context.$router.replace(obj);
                } else {
                    context.$router.push(obj);
                }
            });
        },
        update: function (el, e) {
            el.obj = e.value;
        }
    });
    Vue.directive('tapout', {
        bind: function (el, props) {
            el.taphand = function (e) {
                if (!el.contains(e.target) && typeof props.value == 'function') {
                    props.value(props.arg);
                }
            }
            window.addEventListener('tap', el.taphand);
        },
        unbind: el => window.removeEventListener('tap', el.taphand)
    });
    Vue.directive('mui', {
        bind: function (el, props) {
            setTimeout(() => { mui(el)[props.value](); })
        }
    });
    Vue.directive('imgdef', {
        bind: function (el, props) {
            el.onerror = () => { el.src = props.value || "img/default.gif"; }
        }
    });
    var ultZeroize = function (v, l) {
        var z = "";
        l = l || 2;
        v = String(v);
        for (var i = 0; i < l - v.length; i++) {
            z += "0";
        }
        return z + v;
    };
    Vue.filter('dateShort', function (d) {
        if (typeof (d) != "object") d = new Date(d * 1000);
        return (d.getFullYear() + "-" + ultZeroize(d.getMonth() + 1) + "-" + ultZeroize(d.getDate()));
    })
    Vue.filter('dateShort2', function (d) {
        if (typeof (d) != "object") d = new Date(d * 1000);
        return ultZeroize(d.getMonth() + 1) + "-" + ultZeroize(d.getDate());
    })
    Vue.filter('f2', function (d) {
        return (d - 0).toFixed(2)
    })
    Vue.filter('order_state', function (d) {
        switch (~~d) {
            case 10: return "未付款";
            case 20: return "已付款";
            case 30: return "已发货";
            case 40: return "已收货";
            case 50: return "已完成";
            case 60: return "已取消";
        }
        return "其他";
    })
}