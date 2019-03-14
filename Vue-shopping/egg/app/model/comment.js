// 商品评论表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        comment_uid: Schema.Types.ObjectId,        // 评论人的id
        cid: String,                // 商品的id
        comment_time: String,
        rate: Number,                // 商品评分
        anonymous: Boolean,         // 是否匿名评价
        content: {                  // 评论的内容
            type: String,
            required: true
        },
        images: Array
    });

    return mongoose.model('Comment', CommentSchema, 'comment');
}