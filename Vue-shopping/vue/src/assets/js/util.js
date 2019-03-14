/**
 *  数组的分块
 * @param arr 需要分块的数组
 * @param size 分块的数量
 */
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
    );




/**
 * 给浏览器添加css前缀
 * @return 各种浏览器的css前缀
 */
let elementStyle = document.createElement('div').style
let vendor = (() => {
    let transformNames = {
        'webkit': 'webkitTransform',
        'Moz': 'MozTransform',
        'O': 'OTransform',
        'ms': 'msTransform',
        'standard': 'transform'
    }
    for (let k in transformNames) {
        if (elementStyle[transformNames[k]] !== undefined) {
            return k
        }
    }
    return false
})()
const prefix = (style) => {
    if (!vendor) {  //如果供应商有问题，直接return
        return false
    }
    if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

/**
 * 数组随机打乱(洗牌函数)
 * @param arr 需要打乱的数组
 * @return Array 最终打乱的数组
 */
const shuffle = function (arr) {
    let _arr = arr.slice()  //不修改原数组
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        // 变量的交换
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

/**
 * 获取多少道多少之间的随机整数
 * @param min 最小数字
 * @param max 最大数字
 * @return 随机数
 */
const getRandomInt = function (min, max) {
    return (Math.random() * (max - min + 1) + min) | 0
}


/**
 * 函数节流方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @param Number atleast 至少多长时间触发一次
 * @return Function 延迟执行的方法
 */
// atleast要大于dalay
const throttle = (fn, dalay = 1000) => {
    let flag = false
    return (...args) => {
        if (flag) return
        flag = true
        fn(args)
        setTimeout(() => {
            flag = false
        }, dalay);
    }
    // let timer = null
    // let previous = null
    // return (...args) => {
    //     let now = +new Date()	//获取当前时间戳
    //     !previous ? now : previous
    //     if (atleast && now - previous > atleast) {
    //         fn.apply(this, args)
    //         // 重置上一次开始时间为本次结束时间
    //         previous = now
    //         clearTimeout(timer)
    //     } else {
    //         clearTimeout(timer)
    //         timer = setTimeout(() => {
    //             fn.apply(this, args)
    //             previous = null
    //         }, dalay)
    //     }
    // }
}

/**
 * 函数去抖方法
 * @param Function fn 延时调用函数
 * @param Number delay 延迟多长时间
 * @return Function 延迟执行的方法
 */
const debounce = (fn, dalay) => {
    let timer = null
    return (...args) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, dalay);
    }
}

/**
 * 搜索关键词高亮显示
 * @param String str 要替换的关键词
 * @param String value 搜索框里面的内容
 * @return Function 替换后的内容
 */
const keyWord = (str, value) => {
    const replaceReg = new RegExp(value, 'g');
    const replaceString = `<span style='color:red'>${value}</span>`
    str = str.replace(replaceReg, replaceString);
    return str
}

// 深度拷贝
const cloneObj = (obj) => {
    if (!obj || typeof obj !== 'object') return
    const newObj = new obj.constructor() // 拷贝原型链上的
    for (const key in Object.getOwnPropertyDescriptors(obj)) { // 拷贝自己的成员
        newObj[key] = cloneObj(obj[key])
    }
    return newObj
}


export {
    chunk,              //数组分块
    throttle,           //函数节流
    debounce,           //函数防抖
    prefix,             //各种浏览器的css前缀
    getRandomInt,       //获取多少道多少之间的随机整数
    shuffle,            //数组随机打乱(洗牌函数)
    keyWord,            //搜索关键词高亮显示
}