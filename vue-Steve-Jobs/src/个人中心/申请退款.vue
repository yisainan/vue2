<template>
    <div class="page">
        <div class="wrap">
            <div class="section">
                <h4>退款类型*</h4>
                <ul class="mui-table-view mui-table-view-radio">
                    <li class="mui-table-view-cell" @tap="data.type=1">
                        <a class="mui-navigate-right">
                            我要退款(无需退货)
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-selected" @tap="data.type=0">
                        <a class="mui-navigate-right">
                            我要退货
                        </a>
                    </li>
                </ul>
            </div>
            <div class="section">
                <h4>退款原因*</h4>
                <input type="text" placeholder="请输入退款原因" v-model="text" readonly="readonly" @tap="select" />
            </div>
            <div class="section">
                <h4>退款金额*</h4>
                <input type="text" placeholder="请输入退款金额" v-model="data.money" />
            </div>
            <div class="section">
                <h4>退款说明<span style="font-size:12px;color:#666;font-weight:normal;">(可不填)</span></h4>
                <textarea type="text" placeholder="输入退款说明..." v-model="data.explain"></textarea>
            </div>
        </div>
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item" id="submit" @tap="submit">提交申请</a>
        </nav>
    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; }
    .wrap { width: 89%; margin: 0px auto; }
        .wrap input, .section li { border-radius: 0px; box-shadow: 0px 0px 2px #ccc; }
    h4 { font-size: 16px; font-weight: normal; padding-top: 10px; margin-top: 0px; }
    .section:not(:first-child) { margin-top: 6px; }
    .section a { color: #BDBDBD !important; margin: -13px -15px !important; }
    #submit { background-color: #0B2E4C; color: #fff; }
    ::-webkit-input-placeholder { font-size: 14px; font-family: "微软雅黑"; }
    ::-moz-placeholder { font-size: 14px; font-family: "微软雅黑"; }
    :-moz-placeholder { font-size: 14px; font-family: "微软雅黑"; }
    input:focus::-webkit-input-placeholder { font-size: 14px; font-family: "微软雅黑"; }
</style>
<script>
    //订单的id(如order_id=1)
    //退货类型(如type=2)(有三种退货类型：0退货 1退款 2退款退货)
    //				退货原因id(如rtid=1)(1好评，2中评，3差评)
    //				退款金额(如money=10.06)单位：元
    //				退货说明(如explain=不喜欢)
    import comm from "../common/comm"
export default {
    mounted(){
        this.data.order_id=this.$route.params.id;
        this.$api("Member/retrun_type",{order_id:this.$route.params.id}).then(list=>{
            this.list=list.map(a=>{return {
                value:a.rtid,
                text: a.type
            } });
        });
        comm.loadjs("js/mui.picker.min.js","js/mui.poppicker.js");
    },
    data(){
        return{
            text:"",
            data:{
                order_id:0,type:0,rtid:0,money:0,explain:""
            },
            list:[]
        }
    },
    methods:{
        select(){
            var userPicker = new mui.PopPicker();
            userPicker.setData(this.list);
            userPicker.show((items)=>{
                this.data.rtid=items[0].value
                this.text=items[0].text
            });
        },
        submit(){
            if(this.data.rtid==0)return ;
            this.$api("Member/endorder",this.data).then(list=>{
                mui.toast("退款申请已提交,请等待工作人员处理");
                mui.back();
            });
        }
    }
    }
</script>