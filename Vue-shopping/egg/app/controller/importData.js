'use strict';
//  往数据库导入数据
const Controller = require('egg').Controller;
const path = require('path')
const fs = require('fs')
class ImportDataController extends Controller {
    async index() {
        const { ctx } = this
        const res = await ctx.model.Goods.find({})
        if (!res.length) {      // 说明数据库没有商品，导入商品
            ctx.body = '导入数据成功'
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
        } else {
            ctx.body = 'hello egg.js'
        }


    }
}

module.exports = ImportDataController;
