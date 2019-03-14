'use strict';

const Service = require('egg').Service;
const fs = require('fs')
const svgCaptcha = require('svg-captcha') // 生成验证码
const request = require('request');
const querystring = require('querystring');
var sd = require('silly-datetime');
class ToolsService extends Service {
    // 写入文件
    async writeFile(path, dataBuffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    // 创建相册的保存路径
    async getUploadFile(_base64) {
        const { username, _id } = this.ctx.session.userInfo
        var paths = this.app.config.uploadDir + Date.now() + username + _id + '.png';//从app.js级开始找--在我的项目工程里是这样的
        let base64
        if (_base64.includes('data:image/')) {
            base64 = _base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        } else {
            base64 = _base64
        }
        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
        await this.writeFile(paths, dataBuffer)
        return {
            saveDir: this.app.config.url + paths.slice(3).replace(/\\/g, '/')
        }
    }

    //生成验证码
    async captcha() {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            background: "#cc9966"
        });
        this.ctx.session.code = captcha.text;   /*验证码上面的信息*/

        return captcha;
    }

    // 发送验证码
    async sendCode(mobile, code) {
        var queryData = querystring.stringify({
            "mobile": mobile,  // 接受短信的用户手机号码
            "tpl_id": "141071",  // 您申请的短信模板ID，根据实际情况修改
            "tpl_value": `#code#=${code}`,  // 您设置的模板变量，根据实际情况修改
            "key": "860287201a70b77eb745be3d7dd5b0f9",  // 应用APPKEY(应用详细页查询)
        });

        var queryUrl = 'http://v.juhe.cn/sms/send?' + queryData;
        return new Promise((resolve, rejecr) => {
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var jsonObj = JSON.parse(body); // 解析接口返回的JSON内容
                    resolve(jsonObj)
                } else {
                    rejecr('请求异常')
                }
            })
        })
    }

    async getDay() {
        var day = sd.format(new Date(), 'YYYYMMDD');
        return day;
    }
}

module.exports = ToolsService;