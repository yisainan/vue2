function setAjaxHeader() {
    var token = cookie.get("token");
    if(token) {
        $.ajaxSetup({
            headers: {
                "x-token": token
            }
        });
    }
}
//setAjaxHeader();
var jqueryAjax = $.ajax;
$.ajax = function(config) {
    var success = config.success;
    var error = config.error;
    if(config.url.indexOf(storage.apiProxyPathKey) > -1) {
        if(config.url.indexOf("?") > -1) {
            config.url = config.url + "&routeName=" + encodeURIComponent(window.location.pathname);
        } else {
            config.url = config.url + "?routeName=" + encodeURIComponent(window.location.pathname);
        }
    }
    if(success) {
        config.success = function(data) {
            data = automan.httpResponseInterceptor(data);
            success(data);
        }
        jqueryAjax.call(this, config);
    } else {
        return jqueryAjax.call(this, config);
    }
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
    var ajaxConfig = {
        type: type,
        url: url,
        data: urlParams,
        headers: headers,
        cache: false,
        async: true,
        timeout:10000,//默认设置超时时间10秒钟
        error: function(error) {
            callback(error);
        },
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
/*
 * config鏍煎紡
 * seatParams
 * urlParams
 * */
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