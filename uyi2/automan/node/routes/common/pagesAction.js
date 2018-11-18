var fs = require("fs");
var async = require("async");
var componentsPool = {};//组件缓存
var babel = require("babel-core");
exports.pagesAction = function(req, res) {
    var url = req.url;
    function es6toes5(jsData) {
        var jsData = babel.transform(jsData, {
            presets: [
                require("babel-preset-es2015"),
            ]
        }).code;
        return jsData;
    }
    function dealComponents() {
        url = url.indexOf("?") > -1 ? url.substring(0, url.indexOf("?")) : url;
        var htmlPath = browserPath + replaceAll(url, ".js", ".html");
        var jsPath = browserPath + url;
        var cssPath = browserPath + replaceAll(url, ".js", ".css");
        function getHtmlData(done) {
            fs.readFile(htmlPath, function(error, htmlData) {
                if(htmlData) {
                    done(null, htmlData.toString());
                } else {
                    done(null, "");
                }
            });
        }
        function getJsData(done) {
            fs.readFile(jsPath, function(error, jsData) {
                if(!globalConfig.isUseGlobalCache) {
                    jsData = es6toes5(jsData.toString());
                }
                if(jsData) {
                    done(null, jsData.toString());
                } else {
                    done(null, "");
                }
            });
        }
        function getCssData(done) {
            fs.readFile(cssPath, function(error, cssData) {
                if(cssData) {
                    done(null, cssData.toString());
                } else {
                    done(null, "");
                }
            });
        }
        if(!componentsPool[url]) {
            async.parallel({
                HtmlData: getHtmlData,
                jsData: getJsData
            }, function (err, result) {
                result.cssData = "";
                componentsPool[url] = result;
                res.end(JSON.stringify(result));
            });
        } else {
            res.end(JSON.stringify(componentsPool[url]));
        }
    }
    function dealOther() {
        url = url.indexOf("?") > -1 ? url.substring(0, url.indexOf("?")) : url;
        url = browserPath + url;
        fs.readFile(url, function(error, jsData) {
            if(!globalConfig.isUseGlobalCache) {
                res.end(es6toes5(jsData));
            } else {
                res.end(jsData);
            }

        });
    }
    if(url.indexOf("components") > -1) {
        dealComponents();
    } else {
        dealOther();
    }

}
