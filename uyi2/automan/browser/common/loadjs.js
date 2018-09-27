/**
 * 同步加载页面上的js文件 script标签的src必须为 data-src 同时添加class='lazyLoad'
 * @type {{executeJs: loadJs.executeJs, loadJs: loadJs.loadJs}}
 */
var loadJs = {
    jsList: [],
    getRemoteTpl: function(url) {
        var xhr = null;
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        //2.打开与服务器的链接
        xhr.open('get',url, false);
        //3.发送给服务器
        xhr.send(null);
        return xhr.responseText;
    },
    getRemoteJsContent: function(url) {
        if(storage.isUseGlobalCache) {
            var md5url = hex_md5(url);
            var localData = cacheStore.get(md5url);
            if (localData && localData.timestamp == storage.timestamp) {
                return localData.url;
            } else {
                var jscontent = this.getRemoteTpl(url);
                cacheStore.set(md5url, {
                    url: jscontent,
                    timestamp: storage.timestamp
                });
                return jscontent;
            }
        } else {
            return this.getRemoteTpl(url);
        }
    },
    getPageJs: function() {
        this.jsList = $(".lazy-load");
    },
    executeJs: function() {
        var localTimestamp = cacheStore.get("timestamp");
        if(!localTimestamp) {
            cacheStore.clear();
            cacheStore.set("timestamp", storage.timestamp);
        } else if(localTimestamp != storage.timestamp) {
            cacheStore.clear();
            cacheStore.set("timestamp", storage.timestamp);
        }
        for(var index = 0; index < this.jsList.length; index++) {
            var jsUrl = $(this.jsList[index]).attr("data-src");
            var jsContent = this.getRemoteJsContent(jsUrl);
            $.globalEval(jsContent);
        }
    },
    load: function() {
        this.getPageJs();
        this.executeJs();
    }
}