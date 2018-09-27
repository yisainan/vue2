var module = {};
var exports = {};
var componentPool = {};
var assetsPool = {};
var automan = {};
var exceptionConfig;
var store = {};
automan.relateJs = {};//依赖js的存储容器
String.prototype.replaceAll  = function(s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2);
}
/*管理第三方组件start*/
automan.gallery = {};
automan.put = function(key, val) {
    this.gallery[key] = val;
}
automan.get = function(key) {
    return this.gallery[key];
}
/*管理第三方组件end*/
automan.getQueryString = function(name) {
    var url = window.location.href;
    if(url.indexOf("?") == -1) {
        return;
    }
    var search = url.split('?')[1];
    search = search.split("&");
    for(var index = 0; index < search.length; index++) {
        var searchList = search[index].split("=");
        if(searchList[0] == key) {
            return decodeURIComponent(search[index].split("=")[1]);
        }
    }
    return "";
}
automan.useJs = function(jsArray) {
    for(var index = 0; index < jsArray.length; index++) {
        var scriptId = hex_md5(jsArray[index]);
        if($("#" + scriptId).length == 0) {
            $.ajax({
                "type": "GET",
                "url": "combineAssetsAction/?params=" + jsArray[index],
                "dataType": "text",
                "async": false,
                "cache": true,
                "success": function(result) {
                    var scriptEle = document.createElement("script");
                    scriptEle.innerHTML = result;
                    scriptEle.id = scriptId;
                    $("head")[0].appendChild(scriptEle);
                }
            });
        }
    }
}

automan.httpResponseInterceptor = function(res) {
    if(!exceptionConfig) {
        exceptionConfig = $.ajax({
            url: "/common/exception.json",
            type: "GET",
            async: false
        }).responseText;
        exceptionConfig = JSON.parse(exceptionConfig);
    }
    for(var code in exceptionConfig) {
        if(res[code]) {
            for(var val in exceptionConfig[code]) {
                if(val == res[code]) {
                    var gotoUrl = exceptionConfig[code][val];
                    if(val != "401" && val != '403') {
                        location.href = gotoUrl;
                    } else if(val == "401") {

                    }
                    break;
                }
            }
        }
    }
    return res;
}
automan.getTplContent = function(url, callback) {
    if(callback) {
        $.ajax({
            url: url.substring(url.indexOf("/"), url.length),
            type: "GET",
            cache: storage.isUseGlobalCache,
            dataType: "text",
            success: function(data) {
                cacheStore.set(url, {
                    url: data,
                    timestamp: storage.timestamp
                });
                callback(data);
            }
        });
    } else {
        var content = $.ajax({
            url: url.substring(url.indexOf("/"), url.length),
            cache: storage.isUseGlobalCache,
            type: "GET",
            dataType: "text",
            async: false
        }).responseText;
        cacheStore.set(url, {
            url: content,
            timestamp: storage.timestamp
        });
        return content;
    }
}
automan.getRemoteTpl = function(url, callback) {
    url = "/" + url;
    if(url.indexOf("?") > -1) {
        url += "&timestamp=" + storage.timestamp;
    } else {
        url += "?timestamp=" + storage.timestamp;
    }
    var localData = cacheStore.get(url);
    if(storage.isUseGlobalCache && localData && localData.timestamp == storage.timestamp) {
        if(callback) {
            callback(localData.url);
        } else {
            return localData.url;
        }
    } else {
        return automan.getTplContent(url, callback);
    }
}
function getTemplateContent(html) {
    var startMark = "<template>";
    var endMark = "</template>";
    var startPos = html.indexOf(startMark);
    var endPos = html.indexOf(endMark);
    html = html.substring(startPos + startMark.length, endPos).trim();
    html = html.replaceAll("v-silent", "v-silent hidden");
    return html;
}
automan.async = {
    done: function(key, callback, result, taskCount) {
        return function(err, data) {
            var index = 0;
            result[key] = data;
            for(var item in result) {
                index++;
                if(index == taskCount) {
                    callback(null, result);
                }
            }
        }
    },
    parallel : function(config, callback) {
        var result = {};
        var taskCount = 0;
        for(var key in config) {
            taskCount++;
        }
        for(var key in config) {
            config[key](this.done(key, callback, result, taskCount));
        }
    }
}
function requireJs(path) {
    return function(done) {
        if(path && !assetsPool[path]) {
            assetsPool[path] = true;
            automan.getRemoteTpl(path, function (result) {
                done(null, result);
            });
        } else {
            done(null, "");
        }
    }
}
function combineStore(store, state) {
    if(store.state && state) {
        store.state = $.extend(true, store.state, state);
        return store;
    } else if(!store.state && state) {
        store.state = {};
        store.state = $.extend(true, store.state, state);
        return store;
    } else if(store.state && !state) {
        return store;
    } else {
        store.state = {};
        return store;
    }
    return {};
}
var VueRoot = function() {
    store = combineStore(store, storage.state);
    var args = arguments;
    for(var index = 0; index < args.length; index++) {
        var config = args[index];
        if(typeof config == "object" && store.state) {
            var data = {};
            if (config.data) {
                data = config.data;
            }
            if (store.state) {
                for (var key in store.state) {
                    data[key] = store.state[key];
                }
            }
            config.data = function () {
                return data;
            }
        }
        if(typeof config == "object" && config.template && config.template.indexOf("pages/") > -1) {
            var template = automan.getRemoteTpl(config.template);
            args[index].template = getTemplateContent(template);
        }
    }
    var v = new Vue(args[0]);
    v.actions = store.actions;
    v.state = store.state;
    flux.ev.push(v);
    return v;
}
var VueComponent = Vue.component;
Vue.component = function() {
    store = combineStore(store, storage.state);
    var self = this;
    var args = arguments;
    for(var index = 0; index < args.length; index++) {
        var config = args[index];
        (function(config, index) {
            if(typeof config == "object" && store.state) {
                var dataFunc = config.data || {};
                config.data = function() {
                    var componentData = {};
                    componentData = dataFunc.constructor ? dataFunc.apply(this) : dataFunc;
                    if(store.state) {
                        for (var key in store.state) {
                            componentData[key] = store.state[key];
                        }
                    }
                    return componentData;
                }
            }
            if(typeof config == "object" && config.template && config.template.indexOf("pages/") > -1) {
                config.template = componentPool[config.template];
                args[index] = config;
                VueComponent.apply(self, args);
            } else if(typeof config == "object" && config.template && config.template.indexOf("pages/") == -1) {
                VueComponent.apply(self, args);
            } else if(typeof config == "object" && config.pageName == "gallery") {
                VueComponent.apply(self, args);
            }
        })(config, index);
    }
}
function insertJs(jsText, index, jsCount) {
    $.globalEval(jsText);
}
function insertCss(cssText) {
    var styleEle = $("<style></style>");
    styleEle.html(cssText);
    $("body").append(styleEle);
}
automan.useCount = 0;
var callbackPool = [];
function dealPath(pathArray) {
    var pathToAlias = {};
    var pathMap = storage.pathMap;
    for(var index = 0; index < pathArray.length; index++) {
        var path = pathArray[index];
        if(path.lastIndexOf(".css") > -1) {
            continue;
        }
        var paths = path.split("/");
        var firstPathLabel = paths[0];
        if(pathMap[firstPathLabel]) {
            paths[0] = pathMap[firstPathLabel];
            pathArray[index] = paths.join("/");
        }
        if(pathArray[index].indexOf(".js")== -1) {
            pathArray[index] += ".js";
        }
        if(pathMap[firstPathLabel]) {
            pathToAlias[pathArray[index]] = firstPathLabel;
        }
    }
    return pathToAlias;
}
window.use = function(jsArray, callback) {
    callbackPool.push(callback);
    var pathToAlias = dealPath(jsArray);
    var jsPool = {};
    if(!jsArray || jsArray.length == 0) {
        jsPool["null"] = requireJs("");
    } else {
        for(var index = 0; index < jsArray.length; index++) {
            jsPool[jsArray[index]] = requireJs(jsArray[index]);
        }
    }
    automan.async.parallel(jsPool, function(err, result) {
        var index = 0;
        for(key in result) {
            index++;
            if(!result[key]) {
                continue;
            }
            if(key.lastIndexOf(".css") > -1) {
                insertCss(result[key]);
                continue;
            }
            if(key.indexOf("/components/") > -1) {
                var componentObj = JSON.parse(result[key]);
                var html = componentObj.HtmlData;
                var js = componentObj.jsData;
                var componentName = key.substring(key.lastIndexOf("/") + 1, key.length - 3);
                if(js.indexOf("created") > -1) {
                    var headJs = js.substring(0, js.indexOf("{", js.indexOf("created")) + 1);
                    var footJs = js.substring(js.indexOf("{", js.indexOf("created")) + 1, js.length);
                    js = headJs + '\n\t\t\tflux.subscribe(this, "'+ componentName +'");\n' + footJs;
                }
                var css = componentObj.cssData;
                //insertCss(css);
                componentPool[key.replaceAll(".js", ".html")] = html;
                insertJs(js, index, jsArray.length);
            } else if(key.indexOf("/widget") > -1) {
                var widgetObj = JSON.parse(result[key]);
                var html = widgetObj.HtmlData;
                var js = widgetObj.jsData;
                var css = widgetObj.cssData;
                var widgetName = key.substring(key.lastIndexOf("/") + 1, key.length - 3);
                if(js.indexOf("created") > -1) {
                    var headJs = js.substring(0, js.indexOf("{", js.indexOf("created")) + 1);
                    var footJs = js.substring(js.indexOf("{", js.indexOf("created")) + 1, js.length);
                    js = headJs + '\n\t\t\tflux.subscribe(this, "'+ widgetName +'");\n' + footJs;
                }
                componentPool[key.replaceAll(".js", ".html")] = html;
                insertJs(js, index, jsArray.length);
                insertCss(css);
            } else if(key.indexOf("node_modules/") > -1) {//构造一个全局组件
                insertJs(result[key], index, jsArray.length);
                var galleryKey = pathToAlias[key];
                var galleryItem = automan.get(galleryKey);
                if(galleryItem) {
                    var gallery = galleryItem.gallery;
                    //var jsCode = gallery.mounted.toString();
                    //eval("gallery.mounted = " + jsCode);
                    var name = galleryItem.name;
                    gallery.pageName = "gallery";
                    Vue.component(name, gallery);
                }
            } else if(key.indexOf("/widget") == -1) {
                insertJs(result[key], index, jsArray.length);
            }
        }
        automan.useCount++;
        if(automan.useCount == storage["useCount"]) {
            for(var index = callbackPool.length - 1; index >=0; index--) {
                callbackPool[index]();
            }
            automan.useCount = 0;
            callbackPool = [];
        }
    });
/*定义第三方vue组件 start*/
    Vue.directive('silent', {
        // 当绑定元素插入到 DOM 中。
        inserted: function (el) {
            $(el).removeAttr("hidden");
        }
    });
/*定义第三方vue组件 end*/
}
