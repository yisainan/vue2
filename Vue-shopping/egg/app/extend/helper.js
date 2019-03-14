// 方法插件

const sd = require('silly-datetime')
const fs = require('fs')

// helper 是被挂在ctx下面
module.exports = {
    format(time, format) {
        return sd.format(time, format)
    },

    // 随机生成用户名
    random(n = 30) {
        const arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'aa', 'bb', '_', '+', '-', '_', '+', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'b', 'w', 'x', 'y', 'z', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        let str = ''
        for (let i = 0; i < n; i++) {
            let id = Math.ceil(Math.random() * 30)
            str += arr[id]
        }
        return str
    },
}