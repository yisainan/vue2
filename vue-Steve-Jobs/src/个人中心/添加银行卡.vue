<template>
    <div class="page">
        <div class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-center mui-title">添加银行卡</h1>
        </div>
        <div class="mui-content">
            <div class="mui-scroll">
                	<!--<p style="margin-top:10px;">请绑定持卡人本人的银行卡</p>-->
                <div class="mui-input-row" @tap="select">
                    <a class="mui-navigate-right cardkind" style="color:#000;">
                        <label>银行卡类型</label>
                        <input type="text" readonly="readonly" v-model="data.bankname" placeholder="未选择" class="cardnum"></a>
                </div>
                <div class="mui-input-group">
                    <div class="mui-input-row">
                        <label>持卡人</label>
                        <input type="text" placeholder="持卡人" v-model="data.name" class="cardowner">
                    </div>
                    <div class="mui-input-row">
                        <label>卡号</label>
                        <input type="text" placeholder="卡号" v-model="data.bankcard" class="cardnum">
                    </div>
                </div>
                <div class="mui-text-center button" style="margin-top:30px;">
                    <button type="button" class="btn mui-btn" id="sure1" @tap="submit">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; height: 100%; }
    .mui-bar.mui-bar-nav { background-color: #0B2E4C !important; box-shadow: none; }
    .mui-title { color: #fff; }
    .mui-bar a { color: #fff !important; }
    .mui-btn.btn { height: 45px; line-height: 25px; letter-spacing: 3px; font-size: 17px; width: 80%; color: #fff !important; background-color: #182F41; border: none; border-radius: 9px; }
</style>
<script>
     import comm from "../common/comm"
export default {
    mounted(){
        this.$api("Member/addBank").then(list=>{
            this.list=list.map(a=>{return {
                value:a.bid,
                text: a.name
            } });
        });
        comm.loadjs("js/mui.picker.min.js","js/mui.poppicker.js");
    },
    data(){
        return{
            list:[],
            data:{
                bankname:"",//(银行名称)
                bankcode:"",//银行编码
                bankcard:"",//银行卡号
                name:"",//所有者姓名
            }
        }
    },
    computed:{
        
    },
    methods:{
        select(){
            var userPicker = new mui.PopPicker();
            userPicker.setData(this.list);
            userPicker.show((items)=>{
                this.data.bankcode=items[0].value
                this.data.bankname=items[0].text
            });
        },
        submit(){
            if(this.data.name==""||this.data.bankcard==""||this.data.bankname=="")return ;
            this.$api("Member/doAddBank",this.data).then(list=>{
                mui.back();
            });
        }
    }
    }
</script>