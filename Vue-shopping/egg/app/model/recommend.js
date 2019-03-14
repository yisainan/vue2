

// 首页的推荐商品以及一些其他数据
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const Recommend = new Schema({
        advertesPicture: Object,
        buyTime: String,
        category: Array,
        floor1: Array,
        floor2: Array,
        floor3: Array,
        floorName: Object,
        hotGoods: Array,
        recommend: Array,
        sendFee: Object,
        slides: Array,
        meta: {
            // 创建数据的时间
            createdAt: {
                type: Date,  //type是一个时间类型
                default: Date.now()
            },
            // 更新这条数据的时间
            updateAt: {
                type: Date,
                default: Date.now()
            }
        }
    }, {
            collections: 'Recommend'
        })
    return mongoose.model('Recommend', Recommend);
}