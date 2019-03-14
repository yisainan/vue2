// 用户表
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AddressSchema = new Schema({
        uid: String,                // 用户的id
        name: String,               // 收货人姓名
        tel: String,                // 电话
        address: String,            // 详细地址
        isDefault: Boolean,          // 是否默认,
        province: String,           // 省
        city: String,               // 城市
        county: String,             // 区
        addressDetail: String,      // 详细地址  
        areaCode: String     ,       // 城市编码
        add_time: {
            type: Number,
            default: +new Date()
        }
    });

    return mongoose.model('Address', AddressSchema, 'address');
}