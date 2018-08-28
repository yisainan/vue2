<template>
    <div>
        <div class="mui-fullscreen page">
            <div style="text-align: left;background-color: #fff;margin-top: 0" v-if="!isme&&report.length" class="location">
                <a class="mui-table-view-cell" style="padding: 15px 0;display: block;color: #000000;font-size: 15px;" v-href="{name:'收货地址'}"
                    v-if="data.reciver==''">
                    <div class="mui-pull-left"><img src="img/ZC/address.png" style="margin: 10px 0 0 10px"></div>
                    <p style="display: inline-block;font-size: 15px;line-height:42px;padding-left:50px;">请选择收货地址</p>
                    <span class="mui-icon mui-icon-arrowright mui-pull-right" style="color:#CCCACC ;margin: 0px 10px;"></span>
                    </a>

                    <a class="mui-table-view-cell" v-href="{name:'收货地址'}" v-if="data.reciver!=''">
                        <div class="mui-pull-left"><img src=img/ZC/address.png></div>
                        <p>收货人：{{data.reciver_name}} <span class="mui-pull-right">{{data.reciver_telphone}}</span>

                            <br /> 收货人地址:{{data.reciver_province}} {{data.reciver_city}} {{data.reciver}}
                        </p>
                        <span class="mui-icon mui-icon-arrowright"></span>
                    </a>
            </div>

            <ul class="mui-table-view">
                <div class="one">
                    <h4>支持金额</h4>
                    <p v-if="!isme">朋友都需要相互支持的，今天我支持你，明天你支持我</p>
                    <div class="box">
                        <span @tap="jine=m.money" :class="{active:jine==m.money}" v-for="m in cmoney"><b>{{m.money}}</b>元</span>
                    </div>
                    <div class="clear"></div>
                    <div style="position: relative">
                        <input type="number" placeholder="其他" v-model="jine" class="inputmoney" />
                        <label class="inputmonelabel">元</label></div>
                    <div class="reportlist" v-if="!isme">
                        <div class="ritem" v-for="item in report">
                            <p>支持TA：<span>{{item.supportmoney}}</span>元</p>
                            <span style="top: -5px;">{{item.reportcontent}}</span>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <!--<div class="payway" v-if="false">
                    <span :class="{on:pay==1}" @tap="pay=1"><img src="img/my/ye.png" />余额({{yue}})</span>
                    <span :class="{on:pay==0}" @tap="pay=0"><img src="img/my/wx.png" />微信支付</span>
                </div>-->
                </div>
            </ul>
            <ul class="mui-table-view" v-if="!isme">
                <textarea placeholder="支持留言" v-model="speech"></textarea>
            </ul>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell paytype">
                    <img src="img/ZC/weixin.png" class="mui-pull-left" /><span>微信支付</span>
                    <img src="img/ZC/selected.png" class="mui-pull-right" />
                </li>
            </ul>
        </div>
        <nav class="mui-bar-tab">
            <a class="mui-tab-item" id="sum">合计：{{jine |f2}}元</a>
            <a class="mui-tab-item" id="payNow" @tap="submit">立即支付</a>
        </nav>
    </div>
</template>
<style scoped>
    .location {
        text-align: left;
        background-color: #fff;
        margin-top: 10px
    }
    
    .location p {
        color: #667;
    }
    
    .location .mui-pull-left {
        width: 40px;
        text-align: center;
    }
    
    .location .mui-pull-right {
        margin-right: 30px;
    }
    
    .location img {
        width: 20px;
        background: #ccc;
        margin-top: 3px;
    }
    
    .location a {
        padding: 15px 0;
        display: block;
        color: #000000;
        font-size: 15px;
    }
    
    .location .mui-icon-arrowright {
        color: #ccc;
        position: absolute;
        right: 10px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        top: 50%;
    }
    
    .page {
        font-family: "微软雅黑";
        font-size: 15px;
        background: #F0EFF5;
        bottom: 50px;
        overflow: auto;
    }
    
    .paytype {
        padding: 15px 0 15px 26px;
        font-size: 18px;
        color: #333;
    }
    
    .paytype img {
        height: 25px;
        margin-right: 10px;
    }
    
    .paytype img.mui-pull-right {
        margin-right: 26px;
    }
    
    h4 {
        margin-top: 0px;
        color: #666;
        font-size: 16px;
        font-weight: 400;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        margin: 0;
        padding: 0 20px 0 0;
    }
    
    .mui-table-view {
        margin-top: .3rem;
    }
    
    .mui-table-view .one {
        width: 85%;
        margin: 0 auto;
    }
    
    .mui-table-view:not(:first-child) {
        border-top: 5px solid #efefef;
    }
    
    .box {
        margin: 15px 0px;
    }
    
    .box b {
        color: #FD8616;
        font-weight: 400;
    }
    
    .active {
        border: 1px solid #FF7F04 !important;
        background-color: #fff;
        position: relative;
        /*color: #fff !important;*/
        overflow: hidden;
    }
    
    .active b::after {
        position: absolute;
        right: 0px;
        top: -1px;
        content: ' ';
        display: block;
        width: 20px;
        height: 20px;
        background-size: cover;
        background-image: url("./Selected2.png");
    }
    
    .box span {
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 0 10px 5px 0;
        padding: 6px 16px;
        color: #0B2E4C;
        font-size: 14px;
        display: block;
        float: left;
    }
    
    .payway {
        height: 60px;
        padding: 10px 0;
        border-top: 1px solid #ccc;
    }
    
    .payway span {
        position: relative;
        padding-right: 20px;
        float: left;
    }
    
    .payway span img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
        vertical-align: middle;
    }
    
    .payway .on::after {
        content: '';
        background: url(./selected.png);
        width: 15px;
        height: 15px;
        background-size: cover;
        display: block;
        position: absolute;
        right: 0;
        top: 5px;
    }
    
    .inputmoney {
        width: 100%;
        background: #EEEEEE;
        border-color: #E8E8E8;
        border-radius: 6px;
    }
    
    .inputmonelabel {
        position: absolute;
        right: 20px;
        top: 10px;
        color: #999;
    }
    
    textarea {
        border: none;
        height: 100px;
        font-size: 14px;
        font-family: "微软雅黑";
    }
    
    #camera {
        padding: 20px 0px;
    }
    
    #camera span {
        font-size: 14px;
        margin: 20px;
    }
    
    #sum {
        background-color: #fff;
        color: #0B2E4C;
    }
    
    #payNow {
        background-color: #7CA5C5;
        color: #fff;
    }
    
    nav {
        position: fixed;
    }
    
    .ritem {
        width: 50%;
        float: left;
        margin: 0 0 10px 0
    }
    
    .ritem p {
        margin-bottom: 0px;
        font-size: 12px
    }
    
    .ritem span {
        color: #FD8616;
        font-size: 12px;
        position: relative;
        /*font-size: 14px*/
    }
</style>
<script>
    import { mapState } from 'vuex'
    import wxapi from '../common/wxapi'
    export default {
        mounted() {
            var fid = this.$route.params.id
            var vid = this.$route.query.vid;
            if (vid == 0) {
                vid = localStorage.getItem("uid");
                this.isme = true;
            }
            // this.$api("g/my_show").then(db => {
            //     this.yue = db;
            // });
            this.$api("Zhongchou/zcPay", { fid, vid }).then(db => {
                this.cmoney = db.cmoney;
                if (db.cmoney.length > 0) this.jine = db.cmoney[0].money;
                this.report = db.report;
            });
            this.$store.dispatch('Bsfamily/order');
            sessionStorage.setItem("backurl", location.hash)
        },
        computed: mapState({
            data: s => s.gwc.data,
            aid: s => s.gwc.aid,
        }),
        data() {
            return {
                isme: false,
                yue: 0,
                jine: '',
                pay: 0,
                speech: "加油吧，小伙伴",
                introduce: "",
                cmoney: [],
                report: []
            }
        },
        methods: {
            submit() {
                if (this.jine <= 0) return mui.toast('请选择或输入支持金额');
                if(!this.isme) {
                	if (this.report.length > 0 && this.aid == 0) return mui.toast('请选择收货地址');
                }
                var vid = this.$route.query.vid;
                if (vid == 0) vid = localStorage.getItem("uid");
                this.$api("Zhongchou/dozcPay", {
                    fid: this.$route.params.id,
                    vid,
                    aid: this.aid,
                    s_comments: this.speech,
                    s_amount: this.jine
                }).then(db => {
                    wxapi.pay(db.s_amount, 3);
                });

                // if (vid > 0) {//帮他付款
                //     if (this.pay == 1)//余额
                //     {
                //         this.$api("Financing/confirm_pay", db).then(a => {
                //             mui.alert("支付成功!");
                //             mui.back();
                //         });
                //     } else {
                //         wxapi.pay(db.s_amount, 3);
                //     }
                // } else {//自己付款
                //     if (this.pay == 1)//余额
                //     {
                //         this.$api("Financing/my_confirm_pay", db).then(a => {
                //             mui.alert("支付成功!");
                //             mui.back();
                //         });
                //     } else {
                //         wxapi.pay(db.s_amount, 3);
                //     }
                // }
            }
        }
    }

</script>