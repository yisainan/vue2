function initCom() {
    var fs = require("fs");
    function getTemplateContent(html) {
        var startMark = "<template>";
        var endMark = "</template>";
        var startPos = html.indexOf(startMark);
        var endPos = html.indexOf(endMark);
        html = html.substring(startPos + startMark.length, endPos).trim();
        html = replaceAll(html, "v-silent", "v-silent hidden");
        return html;
    }
    global.VueComponent = Vue.component;
    global.initComponets = function(pageName, state) {
        var thisPageUsedCommonComponents = pageTocommonComponent[pageName];
        if(!stylePool[pageName]) {
            stylePool[pageName] = {};
        }
        if(!components[pageName]) {
            components[pageName] = [];
        }
        for(i = 0; i < thisPageUsedCommonComponents.length; i++) {
            components[pageName].push(commonComponentPool[thisPageUsedCommonComponents[i]]);
        }
        for(var index = 0; index < components[pageName].length; index++) {
            if(!components[pageName][index]) continue;
            var args = components[pageName][index]["params"];
            var context = components[pageName][index]["context"];
            var css = components[pageName][index]["css"];
            var url = components[pageName][index]["url"];
            stylePool[pageName][url] = css;
            // var dataFunc = components[pageName][index]["data"];
            // for(var k = 0; k < args.length; k++) {
            //     var config = args[k];
            //     if(typeof config == "object") {
            //         config.data = function() {
            //             var data = {};
            //             if(dataFunc) {
            //                 data = dataFunc();
            //             }
            //             for (var key in state) {
            //                 data[key] = state[key];
            //             }
            //             return data;
            //         }
            //         args[k] = config;
            //     }
            //}
            VueComponent.apply(context, args);
        }
    }
    global.VueRoot = function() {
        var store = {};
        var args = arguments;
        for(var index = 0; index < args.length; index++) {
            var config = args[index];
            if(typeof config == "object" && config.store && config.store.state) {
                store = config.store;
                var data = {};
                if (config.data) {
                    data = config.data;
                }
                if (store.state) {
                    for (var key in store.state) {
                        data[key] = store.state[key];
                    }
                }
                config.data = function () {
                    return data;
                }
            }
            if(typeof config == "object" && config.template && config.template.indexOf("pages/") > -1) {
                var template = fs.readFileSync(browserPath + "/" + config.template).toString();
                args[index].template = getTemplateContent(template);
            }
        }
        var v = new Vue(args[0]);
        return v;
    }
    Vue.component = function() {
        var self = this;
        var args = arguments;
        for(var index = 0; index < args.length; index++) {
            var config = args[index];
            (function(config, index) {
                if(typeof config == "object" && config.template && config.template.indexOf("pages/") > -1) {
                    var templateUrl = config.template;
                    var templateCssPath = replaceAll(config.template, ".html", ".css");
                    var pageName = config.pageName;
                    var dataFunc = config.data;
                    config.template = fs.readFileSync(browserPath + "/" + config.template).toString();
                    var cssText = fs.readFileSync(browserPath + "/" + templateCssPath).toString();
                    less.render(cssText, function (e, cssContent) {
                        cssText = cssContent.css;
                    });
                    args[index] = config;
                    if(!pageName) {
                        VueComponent.apply(self, args);
                    } else {
                        if(templateUrl.indexOf("/components/common/") == -1) {
                            if (!components[pageName]) {
                                components[pageName] = [];
                            }
                            components[pageName].push({
                                "context": self,
                                "params": args,
                                "data": dataFunc,
                                "css": cssText,
                                "url": templateUrl
                            });
                        } else {
                            commonComponentPool[templateUrl.substring(templateUrl.lastIndexOf("/") + 1, templateUrl.lastIndexOf("."))] = {
                                "context": self,
                                "params": args,
                                "data": dataFunc,
                                "css": cssText,
                                "url": templateUrl
                            }
                        }

                    }
                } else if(typeof config == "object" && config.template && config.template.indexOf("pages/") == -1) {
                    var pageName = config.pageName;
                    var dataFunc = config.data;
                    if(!pageName) {
                        VueComponent.apply(self, args);
                    } else {
                        if(!components[pageName]) {
                            components[pageName] = [];
                        }
                        components[pageName].push({
                            "context": self,
                            "params": args,
                            "data": dataFunc
                        });
                    }
                }
            })(config, index);
        }
    }
}
exports.initCom = initCom;
