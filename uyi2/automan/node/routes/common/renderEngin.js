var fs = require("fs");
var ejs = require("ejs");
var stream = require('stream');
var extend = require('node.extend');
var renderEngin = function(pageName, Com, pagePath, storage) {
    initComponets(pageName);
    var res = this;
    for(var key in globalConfig) {
        storage[key] = globalConfig[key]
    }
    function render(buffer) {
        var bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        bufferStream.on('data', function(chunk) {
            if(!res.write(chunk)){
                bufferStream.pause();
            }
        });
        bufferStream.on('end', function () {
            res.end();
        });
        res.on("drain", function () {
            bufferStream.resume();
        });
    }
    function insertComponentCss(prevHtml) {
        var styleHtml = "";
        for(var key in stylePool[pageName]) {
           styleHtml += "<style>" + stylePool[pageName][key] + "</style>";
        }
        return prevHtml + styleHtml;
    }
    fs.readFile(pagePath, function(error, data) {
        pageContent = data.toString();
        if(storage) {
            storage["useCount"] = useCount[pageName];
            storage["pathMap"] = pathMap;
        }
        Com = Com(storage);
        renderer.renderToString(Com, function (error, html) {
            if (error) throw error
            var prevHtml = pageContent.substring(0, pageContent.indexOf("<template>"));
            var nextHtml = pageContent.substring(pageContent.indexOf("</template>") + "</template>".length, pageContent.length);
            var scriptHtml = "";
            prevHtml = insertComponentCss(prevHtml);
            pageContent = prevHtml + "<div id='automan-view'>" + html + "</div>" + scriptHtml + nextHtml;
            storage = storage ? "<script>window.storage=" + JSON.stringify(storage) + "</script>" : '<script>window.storage={"useCount":"'+ useCount[pageName] +'"}</script>';
            var pagePath = pageName;
            var pagePaths = pagePath.split("/");
            if(pagePaths.length > 1) {
                pageName = pagePaths[pagePaths.length - 1];
            }
            var buffer = ejs.render(pageContent, {storage: storage, pagePath: pagePath, pageName: pageName, timestamp:timestamp, filename: browserPath + "/pages/public/header.html"});
            render(buffer);
            useNum = 0;
        });
    });
}
module.exports = renderEngin;
