var async = require("async");
var fs = require("fs");
var browser = require(routesPath + "/common/browser").browser;
var renderEngin = require(routesPath + "/common/renderEngin");
exports.list = function(req, res) {
    use(["pages/user/list/list", "pages/user/list/listService"], function(app, listService) {
        var storage = {};
        renderEngin.call(res, "user/list", app, browser.getPageTplPath(__dirname, "list"), storage);
    },"user/list");
}