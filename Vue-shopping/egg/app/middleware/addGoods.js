// 往数据库导入数据
const fs = require('fs')
const path = require('path')
module.exports = (opt, app) => {
    return async (ctx, next) => {
        const res = await ctx.model.Goods.find({})
        if (!res.length) { // 说明数据库没有商品，导入商品
            fs.readFile(path.resolve(__dirname, '../model/goods2.json'), 'utf8', (err, data) => {
                data = JSON.parse(data)
                let saveCount = 0
                data.map((value, index) => {
                    let newGoods = new ctx.model.Goods(value)
                    newGoods.save().then(() => {
                        saveCount++
                        console.log('数据导入成功' + saveCount + '条')
                    }).catch(error => {
                        console.log('数据导入失败：' + error + '条')
                    })
                })
            })

            fs.readFile(path.resolve(__dirname, '../model/goods.json'), 'utf8', (err, data) => {
                data = JSON.parse(data)
                let saveCount = 0
                data.map((value, index) => {
                    let newGoods = new ctx.model.Recommend(value)
                    newGoods.save().then(() => {
                        saveCount++
                        console.log('数据导入成功' + saveCount + '条')
                    }).catch(error => {
                        console.log('数据导入失败：' + error + '条')
                    })
                })
            })
        }
        await next()
    }
}