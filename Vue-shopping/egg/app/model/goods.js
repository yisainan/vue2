// 商品列表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const Goods = new Schema({
        id: { unique: true, type: String },
        shop_id: String,
        sub_id: String,
        name: String,
        present_price: Number,
        amount: Number,
        detail: String,
        image: String,
        create_time: String,
        update_time: String,
        image_path: String,
        orl_price: Number,
        goods_serlal_number: String

    }, {
            collections: 'Goods'
        })
    return mongoose.model('Goods', Goods);
}