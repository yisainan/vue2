import api from "../common/api"
const store ={
    state:{
        aid:0,
        data:{
            goods_id:0,
            buyNum:0,
            ifIntegral:1,//是否使用积分
            order_message:"",//订单留言
            sp_name:"",//规格
            sp_value_name:"",//规格的值
            reciver_name:"",//收货人姓名
            reciver_telphone:"",//收货人电话
            reciver_province:"",//收货人省
            reciver_city:"",//收货人市
            reciver:"",//收货人详细地址

            posters:""//[附加] 商品图片
        },
        goods:{"goods_body": "",
            "goods_freight": "0",
            "goods_name": "",
            "goods_price": "0",
            "goods_img": "",
            "goods_collect": "1",
            "goods_jianjie": "",
            "brand": "",
            "goods_id": "1",
            "sp_name": "",
            "sp_value_name": ""
        },
        addressList:null,
        vip:null
    },
    mutations:{
        //__set_format_db(state,db){
        //    state.db=db;
        //}
        "选择商品"(state,data){
            state.goods=data;
        },
        "更新商品订单"(state,data){
            Object.assign(state.data,data);
        },
        "SETaddressList"(state,data){
            state.addressList=data;            
        },
        "SETgwcvip"(state,data){
            state.vip=data;
        },
        "SET_gwc_address"(state,db){
            if(db){
                state.data.reciver_name=db.name;
                state.data.reciver_telphone=db.phone;
                state.data.reciver_province=db.province;
                state.data.reciver_city=db.city;
                state.data.reciver=db.detailed;
                state.aid=db.aid;
            }
        },
        "SETaddressDel"(state,i){
            state.addressList.splice(i,1)        
        },
    },
    getters:{
        yinfu: (state, getters,rootState) => {
            return NaN;
        },
        //doneTodosCount: (state, getters,rootState) => {
        //    return getters.doneTodos.length
        //}
    },
    actions:{
        "Bsfamily/order"({state,commit},data){
                api("Bsfamily/order").then(db=>{
                    var list=db.addressList||[];
                    commit("SETaddressList",list);
                    commit("SETgwcvip",db.vip);
                    if(state.data.reciver_province=="")commit("SET_gwc_address",list.find(a=>a.is_use));
                    //commit("SETaddressList",db.addressList||[]);
                    //addressList:收货地址信息
                    //province:省份
                    //city    :城市
                    //area    :区
                    //detailed:详细地址
                    //is_use  :是否是默认地址(0:不是 1:是)
                    //vip:会员积分
                    //integral:积分总数(100积分=1块钱)
                    //vid     :会员id
                });
            }
            //""({state},data){
            //    //return new Promise(resolve => {
            //    //     //resolve()
            //    //});
            //    //context.state
            //    //context.getters
            //    //context.rootState

            //    //context.commit("__set_format_data",data);
            //    //context.dispatch('添加到购物车',context.state.db);
            

            //    //$GET_Format(data=>{
            //    //    var format=db.format;
            //    //    if(!format.spec&&data.spec.length>0)format.spec =data.spec[0];
            //    //    if(!format.temp&&data.temp.length>0)format.temp=data.temp[0];
            //    //    if(data.spec.length<2&&data.temp.length<2&&data.style.length==0){
            //    //        db.canedit=false;
            //    //        context.commit("__set_format_db",db);
            //    //        
            //    //    }else{
            //    //        context.commit("__set_format_db",db);
            //    //        context.commit("openview",{name:"规格",width:600})
            //    //    }
            //    //},db.db.id,context.rootState.gouwuche.vip)
            //}        
        }
    }
export default store