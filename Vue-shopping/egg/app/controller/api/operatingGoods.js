'use strict';

const BaseController = require('../base')
class OperatingGoodsController extends BaseController {
    // 收藏商品
    async collection() {
        const data = this.ctx.request.body
        if (!data) {
            this.error('缺少重要参数id')
            return
        }
        const { _id } = this.ctx.session.userInfo
        let goods = await this.ctx.model.Goods.findOne({ id: data.id })
        let collection = new this.ctx.model.Collection({
            uid: _id,
            cid: goods.id,
            image_path: goods.image_path,
            name: goods.name,
            present_price: goods.present_price,
            add_time: +new Date()
        })
        await collection.save()
        this.success('收藏成功')
    }

    // 取消收藏
    async cancelCollection() {
        const { id } = this.ctx.request.body
        if (!id) {
            this.error('缺少重要参数id')
            return
        }
        const { _id } = this.ctx.session.userInfo
        await this.ctx.model.Collection.deleteOne({ uid: _id, cid: id })
        this.success('取消收藏成功')
    }

    // 加入购物车
    async addShop() {
        const { id } = this.ctx.request.body
        const { ctx } = this
        const { _id } = ctx.session.userInfo   // 用户id
        if (!ctx.request.body.id) {
            this.error('缺少重要参数id')
            return
        }
        const goodsData = await ctx.model.ShopList.findOne({ cid: id, uid: _id })

        // 购物车已经有了这条商品，商品默认+1
        if (goodsData) {
            await ctx.model.ShopList.findOneAndUpdate({ cid: id, uid: _id }, {
                $set: {
                    count: goodsData.count += 1
                }
            })
        } else {  // 说明没有这条数据
            // 查到这条商品数据
            let goods = await ctx.model.Goods.findOne({ id: id })
            let newGoods = new ctx.model.ShopList({
                uid: _id,
                present_price: goods.present_price,
                cid: goods.id,
                image_path: goods.image_path,
                name: goods.name,
                mallPrice: goods.present_price,
                check: false,
                count: 1,
                add_time: +new Date()
            })
            await newGoods.save()
        }
        this.success('加入购物车成功')
    }

    // 购物车增加减少
    async editCart() {
        const data = this.ctx.request.body
        const { ctx } = this
        if (!data) {
            this.error('缺少重要参数')
            return
        }
        await ctx.model.ShopList.findOneAndUpdate({ uid: ctx.session.userInfo._id, cid: data.id }, {
            $set: {
                'count': data.count,
                'mallPrice': data.mallPrice,
            }
        })
        this.success('修改成功')
    }

    // 购物车删除
    async deleteShop() {
        const data = this.ctx.request.body
        if (!data) {
            this.error('缺少重要参数')
            return
        }
        const { ctx } = this
        await ctx.model.ShopList.deleteMany({ uid: ctx.session.userInfo._id, cid: data })
        this.success('删除成功')
    }

    // 保存收货地址
    async address() {
        const { ctx } = this
        const data = ctx.request.body
        if (!data) {
            this.error('缺少重要参数')
            return
        }
        const { _id } = ctx.session.userInfo
        if (data.isDefault == true) {   // 设置默认地址
            await ctx.model.Address.updateMany({ uid: _id, isDefault: true }, {
                $set: {
                    'isDefault': false,
                }
            })
        }

        if (data.id) {    // 说明是更新地址
            await ctx.model.Address.updateOne({ _id: data.id, uid: _id }, data)
            this.success('修改成功')

        } else {  // 新增地址
            const datas = Object.assign(data, {
                uid: _id,
                add_time: +new Date()
            })
            const address = new ctx.model.Address(datas)
            await address.save()
            // 保存后查询一次
            const addressDef = await ctx.model.Address.find({ uid: _id })
            if (addressDef.length == 1) { // 如果数据库只有1条，设置这一条为默认地址
                if (!addressDef.isDefault) {
                    await ctx.model.Address.findOneAndUpdate({ uid: _id, _id: addressDef[0]._id }, {
                        $set: {
                            'isDefault': true
                        }
                    })
                }
            }
            this.success('添加成功')
        }
    }

    // 删除单条收货地址
    async deleteAddress() {
        const { ctx } = this
        const { id } = ctx.request.body
        if (!id) {
            this.error('缺少重要参数id')
            return
        }
        const { _id } = this.ctx.session.userInfo
        await this.ctx.model.Address.findOneAndDelete({ '_id': id, uid: _id })
        this.success('删除成功')
    }

    // 接受订单
    async order() {
        const data = this.ctx.request.body
        const { ctx } = this
        if (!data) {
            this.error('缺少重要参数')
            return
        }
        const uid = ctx.session.userInfo._id
        // 订单信息
        let platform = '622'           // 订单头
        let r1 = Math.floor(Math.random() * 10)
        let r2 = Math.floor(Math.random() * 10)
        let sysDate = ctx.helper.format(new Date(), 'YYYYMMDDHHmmss')          // 系统时间
        let add_time = ctx.helper.format(new Date(), 'YYYY-MM-DD HH:mm:ss')   // 订单创建时间
        let order_id = platform + r1 + sysDate + r2;   // 订单id
        let shopList = []
        // 根据id查询出购物车订单
        for (let i = 0; i < data.orderId.length; i++) {
            if (data.idDirect) {    // 说明不是从购物车过来（直接购买）
                const res = await ctx.model.Goods.findOne({ id: data.orderId[0] })

                shopList[i] = {
                    count: data.count,
                    present_price: res.present_price,
                    cid: res.id,
                    image_path: res.image_path,
                    name: res.name,
                    mallPrice: data.count * res.present_price,
                    uid,
                    order_id
                }
            } else {    // 购物车来的
                let item = await ctx.model.ShopList.find({ uid, cid: data.orderId[i] })
                let datas = item[0]

                shopList[i] = {
                    count: datas.count,
                    present_price: datas.present_price,
                    cid: datas.cid,
                    image_path: datas.image_path,
                    name: datas.name,
                    mallPrice: datas.count * datas.present_price,
                    uid,
                    order_id
                }
            }
        }
        // 计算商品的总价（后端计算）
        const mallPrice = shopList.reduce((x, y) => {
            return x + y.present_price * y.count;
        }, 0)
        let orders = {
            uid,
            status: 4,
            order_id,
            tel: data.tel,
            address: data.address,
            add_time,
            mallPrice,
            order_list: shopList
        }
        // 存入数据库
        let orderList = new ctx.model.OrderList(orders)
        await orderList.save()
        // 删除购物车列表的商品
        if (!data.idDirect) {
            await ctx.model.ShopList.deleteMany({ uid, cid: data.orderId })
        }
        ctx.body = {
            code: 200,
            msg: `结算成功,一共 ${mallPrice.toFixed(2)} 元`
        }
    }

    // 商品评论
    async comment() {
        const data = this.ctx.request.body
        const { ctx } = this

        if (!data.id || !data.content) {
            this.error('缺少重要参数id或者内容')
            return
        }
        const userInfo = ctx.session.userInfo
        // 评论有没有上传图片
        let images = []
        if (data.image.length) {
            for (let i = 0; i < data.image.length; i++) {
                let img = await this.service.tools.getUploadFile(data.image[i])
                images[i] = img.saveDir
            }
        }
        const datas = {
            comment_uid: userInfo._id,
            cid: data.id,
            comment_time: ctx.helper.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),   // 订单创建时间,
            rate: data.rate,
            anonymous: data.anonymous,
            content: data.content,
            images
        }
        const comment = new ctx.model.Comment(datas)
        await comment.save()
        // 删除需要评论的那条数据或者把是否已经评论的状态改变(这里是改变状态)
        // 1，查到对应的订单,直接修改
        await ctx.model.OrderList.findOneAndUpdate({ uid: userInfo._id, order_id: data.order_id, 'order_list._id': data._id }, {
            $set: {
                'order_list.$.isComment': true
            }
        })
        this.success('提交成功')
    }


}

module.exports = OperatingGoodsController;
