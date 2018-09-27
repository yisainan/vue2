var fs = require("fs");
var $ = require('./request');
var host = globalConfig.serverHost;
var port = globalConfig.serverPort;
var protocal = globalConfig.protocal;
String.prototype.replaceAll  = function(s1,s2) {
    return this.replace(new RegExp(s1,"gm"),s2);
}
function request(url, config, callback, type) {
    var seatParams = null,
        urlParams = null,
        headers = null;
    if(config) {
        seatParams = config.seatParams;
        urlParams = config.urlParams;
        headers = config.headers;
    }
    if(!urlParams) {
        urlParams = {};
    }
    if(!headers) {
        headers = {};
    }
    if(seatParams) {
        for(var key in seatParams) {
            url = url.replaceAll("{" + key + "}", seatParams[key]);
        }
    }
    if(globalConfig.apiProxyPathRewrite) {
        url = url.replaceAll(globalConfig.apiProxyPathKey, "");
    }
    var ajaxConfig = {
        type: type,
        url: protocal + "://" + host + ":" + port + (url.indexOf("/") == 0 ? url : "/" + url),
        data: urlParams,
        headers: headers,
        async: false,
        success: function(result) {
            callback(result);
        }
    };
    if(type == "POST" || type == "PUT") {
        ajaxConfig["contentType"] = "application/json; charset=utf-8";
        ajaxConfig["data"] = JSON.stringify(urlParams);
    }
    $.ajax(ajaxConfig);
}
function ajaxResquest(params) {
    var args = params;
    var url = "";
    var config = {};
    var callback = null;
    var type = params[0];
    for(var index = 1; index < args.length; index++) {
        if(typeof args[index] == "function") {
            callback = args[index];
        } else if(typeof args[index] == "string") {
            url = args[index];
        } else if(typeof args[index] == "object") {
            config = args[index];
        }
    }
    request(url, config, callback, type);
}
var Api = {
    get: function() {
        arguments = [].slice.call(arguments,0);
        arguments.unshift("GET");
        return ajaxResquest(arguments);
    },
    post: function(url, config, callback) {
        arguments = [].slice.call(arguments,0);
        arguments.unshift("POST");
        return ajaxResquest(arguments);
    },
    put: function(url, config, callback) {
        arguments = [].slice.call(arguments,0);
        arguments.unshift("PUT");
        return ajaxResquest(arguments);
    },
    delete: function(url, config, callback) {
        arguments = [].slice.call(arguments,0);
        arguments.unshift("DELETE");
        return ajaxResquest(arguments);
    }
}
Api.host = host;
Api.port = port;
module.exports = Api;