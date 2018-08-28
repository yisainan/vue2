import config from "../config"
import cache from "./cache"
const api = function (act, data, exp, obj) {
    return new Promise((fun, onerr) => {
        var key = act + "&" + mui.param(data || {});
        if (exp > 0) {
            var db = cache.get(key);
            if (db) {
                fun(db.data || db);
                return;
            }
        }
        var settings = {
            url: config.apiurl + act,
            //xhrFields:{ 
            //    withCredentials:true 
            //},
            data: data,
            dataType: 'json',
            type: "post",
            timeout: 3000,
            success: function (json, s, xhr) {
                if (json == null) {
                    onerr("json格式错误");
                    //console.log(JSON.stringify(data));
                    console.log("[" + act + "] json格式错误");
                    console.log(xhr.responseText);
                }
                if (json.status === 1) {
                    if (typeof (exp == "number") && exp != 0) cache.set(key, json, Math.abs(exp));
                    fun(json.data);
                }
                else {
                    if (json.info != "" && (onerr(json.info) != true)) mui.toast(json.info);
                    console.log("[" + act + "] ajax未处理的错误:" + json.info)
                    //console.log("data:" + JSON.stringify(data));
                    console.log("json:" + xhr.responseText);
                }
            },
            error: function (xhr, type, errorThrown) {
                switch (type) {
                    case "abort":
                        return;
                    case "error":
                        mui.toast('网络错误,请稍后重试!');
                        onerr("服务器错误:" + errorThrown)
                        console.log("服务器错误:" + errorThrown);
                        console.log("url: " + act);
                        break;
                    case "timeout":
                        mui.toast('您的网络不给力.');
                        break;
                    case "parsererror":
                        mui.toast('返回数据格式不规范!');
                        console.log("[" + act + "]:ajax返回格式错误:");
                        console.log(xhr.responseText);
                        break;
                }
            },
            ...obj
        };
        //if(config.dev==1){//模拟数据
        //    settings.url= "./testdb/"+(act.replace(/\//g,"@"))+".json";
        //    settings.type="get";            
        //}
        if (config.dev) {//webpack 跨域 代理
            settings.url = "/api/" + act;
        }
        mui.ajax(settings);
        //if(config.dev){
        //    $.ajax(settings);
        //}else{

        //}
    });
}
export default api;