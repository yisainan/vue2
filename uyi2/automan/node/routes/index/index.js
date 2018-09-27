var async = require("async");
var fs = require("fs");
var browser = require(routesPath + "/common/browser").browser;
var renderEngin = require(routesPath + "/common/renderEngin");
exports.index = function(req, res) {
    use(["pages/index/index", "pages/index/indexService"], function(app, indexService) {
        var storage = {};
        renderEngin.call(res, "index", app, browser.getPageTplPath(__dirname, "index"), storage);
    },"index");
}