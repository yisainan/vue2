var express = require("express");
var path = require("path");
var ejs = require('ejs');
var fs = require("fs");
var NodeCache = require("node-cache");
require("./evn").initEvn();
global.app = express();
global.pageTocommonComponent = {};
global.commonComponentPool = {};
global.UglifyJS = require("uglify-js");
global.browserPath = path.resolve("browser");
global.routesPath = path.resolve("node/routes");
global.less = require('less');
global.useCount = {};
global.Vue = require('vue');
global.stores = {};
global.pathMap = JSON.parse(fs.readFileSync(browserPath + "/common/main.js"));
global.components = {};
global.renderer = require('vue-server-renderer').createRenderer();
global.cache = new NodeCache();
global.isUseGlobalCache = globalConfig.isUseGlobalCache;
global.timestamp = globalConfig.timestamp;
global.isServerRender = globalConfig.isServerRender;
global.Api = require("../routes/common/api");
global.classPool = {};
global.stylePool = {};
var proxy = require("./proxy");
var loader = require("./loader").loader;
var com = require("./com");
var child_process = require('child_process');
var base = require("./base");
var watch = require("./watch");
var config = require("./config");
base.init();//初始化基础工具方法
global.use = loader.use();//初始化加载器
com.initCom();//初始化vue组件的服务端渲染器
watch.initRoute();
if(!isUseGlobalCache) {
    timestamp = new Date().getTime();
    var globalConfigJson = JSON.parse(fs.readFileSync("config.json"));
    globalConfigJson.timestamp = timestamp;
    fs.writeFileSync("config.json", JSON.stringify(globalConfigJson, null, 4));
}
var conf = {
    init: function() {
        config.init();
        return {
            path:path,
            ejs: ejs,
            app:app
        }
    }
}
exports.conf = conf;
