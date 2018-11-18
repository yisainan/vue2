module.exports = {
    init: function() {
        global.replaceAll = function(str, s1,s2) {
            if(str) {
                return str.replace(new RegExp(s1, "gm"), s2);
            } else {
                return "";
            }
        }
        String.prototype.trim=function() {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }
        Date.prototype.format = function(format) {
            var o = {
                "M+" : this.getMonth()+1, //month
                "d+" : this.getDate(), //day
                "h+" : this.getHours(), //hour
                "m+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3), //quarter
                "S" : this.getMilliseconds() //millisecond
            }

            if(/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            }

            for(var k in o) {
                if(new RegExp("("+ k +")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
                }
            }
            return format;
        }

        Date.prototype.getBeforeDate = function (n) {
            var n = n,s;
            var d = new Date();
            var year = d.getFullYear();
            var mon=d.getMonth()+1;
            var day=d.getDate();
            if(day <= n){
                if(mon>1) {
                    mon=mon-1;
                }
                else {
                    year = year-1;
                    mon = 12;
                }
            }
            d.setDate(d.getDate()-n);
            year = d.getFullYear();
            mon=d.getMonth()+1;
            day=d.getDate();
            s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
            return s;
        }
    }
}