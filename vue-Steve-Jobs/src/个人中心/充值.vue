<template>
    <div class="page">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">余额<span class="mui-pull-right">{{db.money||0}}元</span></li>
        </ul>
        <div id="charge">
            请选择充值金额<br><input type="text" v-model="jinge" readonly="readonly" placeholder="" style="display:inline-block;width:60%;"><span>元</span>
        </div>
        <div class="choose-char">
            <span @tap="quehuan(m)" v-for="m in db.privilege">充{{m.money}}送{{m.givemoney}}</span>
        </div>
        <div class="button mui-text-center" style="padding:30px 0px;">
            <button type="button" class="btn mui-btn" id="choosecardbtn" @tap="submit">确认充值</button>
        </div>

 

    </div>
</template>
<style scoped>
    .page { color: #0B2E4C; font-size: 14px; font-family: "微软雅黑"; background-color: #F7F7F7; }
    #charge { width: 70%; margin: 20px auto; }
    .choose-char { width: 70%; margin: 0 auto; }
        .choose-char span { padding: 3px 5px; margin-right: 20px; margin-bottom: 10px; border: 1px solid #666; background-color: #fff; border-radius: 3px; font-size: 14px; display: inline-block; }
    .mui-btn.btn { height: 45px; line-height: 25px; letter-spacing: 3px; font-size: 17px; width: 80%; color: #fff !important; background-color: #0B2E4C; border: none; border-radius: 9px; }
</style>
<script>
     import wxapi from '../common/wxapi'
export default {
    mounted(){
        this.$api("Member/recharge").then(db=>{
            this.db=db;
        });
    },
    components: {},
    data(){
        return{
            jinge:0,
            geimoney:0,
            db:{}
        }
    },
    methods:{
        quehuan(m){
            this.jinge=m.money
            this.geimoney=m.givemoney
        },
        submit(){
            this.$api("Member/doRecharge",{money:this.jinge,geimoney:this.geimoney}).then(db=>{
                wxapi.pay(this.db.payMoney,4);
            });
        }
    }
    }
</script>