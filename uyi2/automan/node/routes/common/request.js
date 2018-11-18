/**
 * 功能：主要实现了nodejs版本的$.ajax方法，使用基本和jQuery.ajax相同
 * 朱冯博
 */
var extentions = {
    "gif": "image/gif",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "xls": "text/xml",
    "xlsx": "text/xml"
}
var request = require("request").defaults({
    pool: { maxSockets: 5000 }
});
var http = require("http");
var querystring= require('querystring');
function ajax(options) {
    options.method = options.type;
    options.json = true;
    if(options.type.toLowerCase() == "get") {
        options.data = querystring.stringify(options.data);
        if(options.url.indexOf("?") > -1) {
            options.url += "&" + options.data;
        } else {
            options.url += "?" + options.data;
        }
    } else {
        options.body = options.data;
    }
    delete options.data;
    var extention = options.url.substring(options.url.lastIndexOf(".") + 1, options.url.indexOf("?") > -1 ? options.url.indexOf("?") : options.url.length);
    if(extentions[extention]) {//读取文件
        http.get(options.url, function(res) {
            var file = "";
            res.setEncoding('binary');
            res.on('data', function(chunk) {
                file += chunk;
            });
            res.on("end", function() {
                options.success(file, res);
            });
        });
    } else {
        request(options, function(error, response, body) {
            if(!error && body) {
                options.success(body, response);
            } else {
                options.success({"errorCode": "-1", errorMsg:"服务器接口错误", data:null});
            }
        });
    }
}
exports.ajax = ajax;