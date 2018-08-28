import api from "./api";
import config from '../config'
let key_loadjs = {};
var titles = [];
export default {
    doShare() {//分享商品,保存推荐人
        //    lastId=1) 商品的id(如lastGoods_id=1)
        var tjruid = localStorage.getItem("tjruid");
        if (tjruid == null || localStorage.getItem("uid") == tjruid) return;

        var spid = localStorage.getItem("tjrsid");
        if (spid != null) {
            api("Bsfamily/doShare", {
                lastId: tjruid,
                lastGoods_id: spid
            }).then(db => {
                localStorage.removeItem("tjruid");
                localStorage.removeItem("tjrsid");
            });
        }

        // //分享众筹的提交
        // var zcid = localStorage.getItem("tjrzid");
        // if (zcid != null) {
        //     api("Bsfamily/doShare", {
        //         lastId: tjruid,
        //         lastGoods_id: zcid
        //     }).then(db => {
        //         localStorage.removeItem("tjruid");
        //         localStorage.removeItem("tjrzid");
        //     });
        // }
    },
    loadjs(...paths) {
        for (var i in paths) {
            var p = paths[i];
            if (key_loadjs[p]) continue;
            let script = document.createElement("SCRIPT");
            script.src = p;
            document.body.appendChild(script);
            key_loadjs[p] = true;
        }
    },
    init(back) {
        $.getJSON("./updateTitle.json").then(ss => {//获取自定义标题
            titles = ss;
            back();
        });
    },
    getTitle(name) {
        var m = titles.find(a => a.name == name);
        return m == null ? name : m.title;
    },
    updateTitle(name) {
        if (!name) return;
        var title = this.getTitle(name);
        document.title = title;
        if (mui.os.ios && !config.dev) {
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.style.display = 'none';
            iframe.onload = function () {
                setTimeout(function () {
                    document.body.removeChild(iframe);
                }, 0);
            };
            iframe.src = "./favicon.ico?d=" + (new Date() - 1);
            document.body.appendChild(iframe);
        }
    }
}