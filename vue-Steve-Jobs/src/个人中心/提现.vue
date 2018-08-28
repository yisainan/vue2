<template>
    <div class="page">
        <ul class="mui-table-view" style="margin-top:0px;" v-if="svip==null">
            <li v-href="{name:'提现银行'}" class="mui-table-view-cell greyd size addbank"><a>到账银行<span class="mui-navigate-right" id="bank"></span></a></li>
        </ul>
        <ul class="mui-table-view" style="margin-top:0px;" v-if="svip!=null">
            <li v-href="{name:'提现银行'}" class="mui-table-view-cell">
                <a class="mui-navigate-right">
                    {{svip.bankname}}
                    <h5>{{svip.cardholdername}}</h5>
                </a>
            </li>
        </ul>
        <ul class="mui-table-view" style="border-top: 15px solid #EFEFF4;">
            <li class="mui-input-group" style="margin-left:15px;padding-top:20px;">
                <p class="greyd size">提现金额</p>
                <h2 class="mui-input-row">￥<input type="number" autofocus="autofocus" v-model="je" style="width:85%;" /></h2>
            </li>
            <li class="mui-table-view-cell grey tip" style="font-size:12px;color:#B1B1B1">可用余额：{{money}}元<button class="mui-pull-right orange" style="border:none;padding:0px;color:#3FA4EC;" @tap="je=money">全部提现</button></li>
        </ul>
        <div class="mui-text-center" style="margin-top:50px;">
            <button type="button" class="btn mui-btn mui-btn-success" id="endbtn" @tap="submit">两小时内到帐，确认提现</button>
        </div>
    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; height: 100%; }
    .mui-btn.btn { height: 45px; line-height: 25px; letter-spacing: 3px; font-size: 17px; width: 80%; border: none; border-radius: 9px;background-color:#0B2E4C }
</style>
<script>
    import cache from "../common/cache"
export default {
    mounted(){
        this.$api("Member/TXindex").then(db=>{
            Object.assign(this.$data,db);
            if(this.svip==null&&this.vipbank.length>0){
                this.svip=this.vipbank[0];
            }
        });
    },
    components: {},
    data(){
        return{ 
            money:0,
            vipbank:[],
            je:0,
            svip:cache.get("selectvipcard"),
        }
    },
    computed:{
        //...mapGetters(["vip"]),
        //...mapState({
        //_view:s=>s.view,
        //})
    },
    watch:{

    },
    methods:{
        submit(){
            if(this.svip==null)return mui.toast("请选择一张银行卡")
            if(this.je<=0||this.je>this.money)return mui.toast("提现金额不正确!")
            this.$api("Member/tixian",{
                money:this.je,
                bankId:this.svip.vbid
            }).then(db=>{
                mui.toast("提现申请提交成功!");
                this.$router.push({ name: '我的财富'});
            });
        }
    }
    }
</script>