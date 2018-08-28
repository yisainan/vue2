<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-text-center">付款详情</li>
            <li class="mui-table-view-cell">订单号<span class="mui-pull-right">{{db.order_sn}}</span></li>
            <li class="mui-table-view-cell">支付方式</li>
            <li class="mui-table-view-cell mui-radio" v-if="db.payMoney<=0||db.vipMoney>=db.payMoney">
                <img src="img/my/ye.png" width="30" style="float:left;vertical-align: middle;margin-right:10px;margin-top:10px;" />
                <span style="margin-top:5px;display: inline-block;">
                    会员卡余额支付
                    <p style="padding-left:0px;">(当前余额￥{{db.vipMoney}})</p>
                </span>
                <input type="radio" v-model="paytype" value="0" />
            </li>
            <!--//当支付的金额为0时,则不显示微信支付
            //②:当余额小于支付的金额时,不显示余额支付-->
            <li class="mui-table-view-cell mui-radio" v-if="db.payMoney>0">
                <img src="img/my/wx.png" width="30" style="margin-right:10px;" />微信支付
                <input type="radio" v-model="paytype" value="1" />
            </li>
            <li class="mui-table-view-cell">金额<span class="mui-pull-right" style="font-size:20px;color:#082B48">￥{{db.payMoney}}</span></li>
        </ul>
        <div class="clear"></div>
        <div class="btn_qd">
            <button type="button" class="mui-btn" id="sureButton" @tap="pay">确认</button>
        </div>
    </div>
</template>
<style scoped>
    #sure { position: absolute; bottom: 0 !important; left: 0 !important; top: 254px !important;z-index: 999; height: 363px !important; width: 100%; border-radius: 0px !important; padding: 10px; }
    .btn_qd { padding: 10px 10px 0 10px; }
    #sureButton { left: 0; background-color: #0B2E4C; width: 100%; color: #fff; height: 50px; border: none; }
    .mui-popover .mui-popover-arrow:after { height: 0; }
    /*弹出付款*/
    .mui-radio input[type='radio']:before { font-size: 20px; }
    .mui-radio input[type='radio']:checked:before { content: '\e442'; color: #ED7718; }
    .mui-bar-tab { position: fixed; z-index: 9; }
</style>
<script>
    import wxapi from '../common/wxapi'
export default {
    mounted(){
        if(this.$route.params.id=="none"){
            this.$api("Member/payinfo").then(db=>{
                this.db={
                    payMoney:db.shopping_money,
                    order_sn:db.order_sn,
                    vipMoney:db.money
                };
                if(db.vipMoney<db.payMoney){
                    this.paytype="1";
                }
            });
            return ;
        }
        this.$api("Bsfamily/pay",{order_id:this.$route.params.id}).then(db=>{
            this.db=db;
            if(db.vipMoney<db.payMoney){
                this.paytype="1";
            }
        });
    },
    data(){
        return{
            paytype:"0",
            db:{}
        }
    },
    methods:{
        pay(){
            var type=1;
            var cmd="Bsfamily/submitPay";
            if(this.$route.params.id=="none"){
                type=2;
                cmd="Member/startpay";
            }
            if(this.paytype==0){
                this.$api(cmd,{order_sn:this.$route.params.id,payment:2 }).then(db=>{
                    this.$router.push({ name: '支付完成'});
                });
                return;
            }
            wxapi.pay(this.db.payMoney,type);
        }
    }
    }
</script>