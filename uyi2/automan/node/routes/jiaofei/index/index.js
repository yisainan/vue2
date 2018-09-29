var async = require("async");
var fs = require("fs");
var browser = require(routesPath + "/common/browser").browser;
var renderEngin = require(routesPath + "/common/renderEngin");
exports.index = function(req, res) {
    use(["pages/jiaofei/index/index", "pages/jiaofei/index/indexService"], function(app, indexService) {
        var storage = {};
        storage["money"] = 100;
        renderEngin.call(res, "jiaofei/index", app, browser.getPageTplPath(__dirname, "index"), storage);
    },"jiaofei/index");
}