<template>
    <div class="page">
        <!--<div class="A mui-clearfix" style="padding:15px 30px;background-color:#fff ;    margin-bottom: 5px;">
            <img src="images/4.jpg" style="width:70px;height:70px;margin-right:15px" class="mui-pull-left" />
            <div class="mui-pull-left">
                <p><h4>物流状态 <span style="color:#57BF83">已签收</span></h4></p>
                <p>订单编号：12345678901</p>
                <p>快递公司：圆通快递</p>
                <p>官方电话：12121111</p>
            </div>
        </div>
        <div class="mui-table-view" style="padding:15px 50px;">
            <img src="images/baby.jpg" class="circle mui-pull-left" />
            <div style="color:#000;font-size:13px;">派送员<p style="color:#0B2E4C;font-size:13px">快快</p></div>
            <span class="mui-icon mui-navigate-right mui-pull-right"></span>
        </div>-->

        <!--"express_no": "883788111824166895",
        "express_name": "圆通",
        "order_id": "1"-->
        <div class="A mui-clearfix" style="padding:15px 30px;background-color:#fff ;    margin-bottom: 5px;">
            <div class="mui-pull-left">
                <p>订单编号：{{db.express_no}}</p>
                <p>快递公司：{{db.express_name}}</p>
            </div>
        </div>
        <h4 style="background-color:#fff;border-bottom:1px solid #ccc;margin-bottom:0px;padding:10px 5px;font-size:15px;">本数据有<span style="color:#4EA4F1;">菜鸟包裹</span>提供</h4>
        <ul class="mui-table-view">
            <div class="line"></div>
            <li class="mui-table-view-cell" v-for="{time,content} in list">
                <div class="content">
                    <p v-html="content"></p>
                    <p v-html="time"></p>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; }
    ul .line { position: absolute; left: 14px; top: 0; border-left: 1px solid #ccc; height: 100%; }
    ul .mui-table-view-cell:first-of-type .content p { color: #24AD5F; }
    .content { position: relative; padding-left: 8px; }
    ul .mui-table-view-cell:first-of-type .content:before { background-color: #24AD5F; height: 11px; width: 11px; box-shadow: 0px 0px 4px #24AD5F; }
    .content:before { content: ""; background-color: #ccc; height: 8px; width: 8px; border-radius: 50%; display: inline-block; position: absolute; top: 7px; margin-left: -13px; }
    .circle { width: 40px; height: 40px; margin-right: 15px; }
    .A p { margin-bottom: 0px; font-size: 13px; color: #000; margin-top: -3px; }
    h4 { font-size: 11px; }
</style>
<script>
export default {
    mounted(){
        var id=this.$route.params.id
        this.$api("Member/expressinfo",{order_id:id}).then(db=>{
            this.db=db;
        })
    },
    data(){
        return{
            db:{}
        }
    },
    computed:{
        list(){
            var str=this.db.expressinfo||"";
            var reg=new RegExp("<li>(.+?)&nbsp;&nbsp;\(.+?)</li>","g")
            var m=null;
            var ss=[];
            while (m=reg.exec(str)) {
                ss.push({time:m[1],content:m[2]})
            }
            return ss;
        }
    },
    methods:{
        //...mapMutations(["fundddd"]),
        //...mapActions(["fundddd"]),
        //submit(){

        //}
    }
    }
</script>