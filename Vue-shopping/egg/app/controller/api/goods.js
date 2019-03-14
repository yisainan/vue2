const BaseController = require('../base')
// 商品相关
class GoodsController extends BaseController {
    // 首页商品查询
    async recommend() {
        const { ctx } = this
        const res = await ctx.model.Recommend.findOne({})
        if (res) {
            return ctx.body = {
                code: 200,
                data: res,
            }
        }
        ctx.body = {
            code: -1,
            data: []
        }
    }

    // 分类商品查询
    async classification() {
        const { ctx } = this
        const { mallSubId } = ctx.query
        if (!mallSubId) {
            this.error('缺少参数mallSubId')
            return
        }
        const res = await ctx.model.Goods.find({ 'sub_id': mallSubId })
        if (res) {
            return ctx.body = {
                code: 200,
                dataList: res
            }
        }
        ctx.body = {
            code: -1,
            dataList: []
        }
    }

    // 单个商品详情查询
    async goodsOne() {
        const { ctx } = this
        const { id } = ctx.query
        if (!id) {
            this.error('缺少参数id')
            return
        }
        let pageSize = 5
        let page = ctx.query.page || 1
        let skip = (page - 1) * pageSize
        if (page == 1) {
            var goods = await ctx.model.Goods.findOne({ id })
        }
        const comment = await ctx.model.Comment.aggregate([
            {
                $lookup: {
                    from: "admin",
                    localField: "comment_uid",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $match: {
                    "cid": id
                },
            },
            {
                $skip: skip
            },
            {
                $limit: pageSize
            }

        ])
        const count = await ctx.model.Comment.find({ cid: id }).countDocuments()
        if (comment.length) {
            comment.forEach(item => {
                if (item.anonymous) {
                    item.comment_nickname = '匿名人士'
                    delete item.comment_uid
                    delete item.user
                    item.comment_avatar = 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg'
                }
            })
        }

        if (goods) {
            ctx.body = {
                code: 200,
                goods: {
                    goodsOne: goods,
                    comment,
                    count
                }
            }
        } else {
            ctx.body = {
                code: 200,
                goods: {
                    comment,
                    count
                }
            }
        }

    }

    // 搜索
    async search() {
        let { value } = this.ctx.request.body
        if (!value) {
            this.error('缺少参数value')
            return
        }
        let pageSize = 20
        let page = this.ctx.request.body.page || 1
        let skip = (page - 1) * pageSize
        const count = await this.ctx.model.Goods.find({ 'name': { $regex: value } }).countDocuments()
        const list = await this.ctx.model.Goods.find({ 'name': { $regex: value } }).skip(skip).limit(pageSize)
        this.ctx.body = {
            code: 200,
            data: {
                list,
                count
            }
        }
    }
}
module.exports = GoodsController;