// 手机短信验证码临时数据
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const MobileTemp = new Schema({
        phone: { type: Number },   // 用户手机号
        send_count: { type: Number }, // 发送次数
        ip: { type: String },       // 用户当前ip
        add_day: {                 //  添加时间
            type: String,
        },
        add_timer: {                // 短信发送的时间戳
            type: String,
            default: +new Date()
        }
    }, {
            collections: 'MobileTemp'
        })
    return mongoose.model('MobileTemp', MobileTemp);
}