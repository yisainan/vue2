<template>
    <div class="page fbjbox">
        <div class="fbjbox1"><div class="mui-input-row mui-search mui-text-left">
    <input type="search" class="mui-input-search" placeholder="商品名称/商品编号/订单号" @keyup.13="search" @blur="search" v-mui="'input'">
</div>
<div class="mui-segmented-control">
    <a class="mui-control-item" v-href="{name:'我的订单',params:{tab:0},replace:true }" v-bind:class="{'mui-active':data.order_state==0}">全部订单</a>
    <a class="mui-control-item" v-href="{name:'我的订单',params:{tab:10},replace:true }" v-bind:class="{'mui-active':data.order_state==10}">待付款</a>
    <a class="mui-control-item" v-href="{name:'我的订单',params:{tab:20},replace:true }" v-bind:class="{'mui-active':data.order_state==20}">待发货</a>
    <a class="mui-control-item" v-href="{name:'我的订单',params:{tab:30},replace:true }" v-bind:class="{'mui-active':data.order_state==30}">待收货</a>
    <a class="mui-control-item" v-href="{name:'我的订单',params:{tab:40},replace:true }" v-bind:class="{'mui-active':data.order_state==40}">待评价</a>
</div></div>
        <div class="fbjbox2"><pull up="true" down="true" @up="getpage" @down="getlist">
    <p style="margin:5px;" v-if="data.order_state==0">提示：抢购商品库存有限，请尽快付款，超时未支付订单将被自动取消。</p>
    <template v-for="db in list">
        <ul class="mui-table-view clear">
            <li class="mui-table-view-cell ">
                <div class="mui-pull-left">
                    <p>状态：<span class="red">{{db.order_state | order_state}}</span></p>
                    <p>总价：<span class="red">￥{{db.order_amount}}</span></p>
                </div>
                <div class="mui-pull-right">
                    <button class="mui-btn" type="button" id="pay" v-href="{name:'付款',params:{id:db.order_id}}" v-if="db.order_state==10">去支付</button>
                    <p class="red" v-if="db.order_state==20">待发货</p>
                </div>
            </li>
            <!--<li class="mui-table-view-cell">
                <a class="mui-navigate-right" style="display: inline-block;">
                    <img v-bind:src="db.goods_image" v-imgdef style="width:20px;height:20px;margin-right:5px;vertical-align: middle;" />
                </a>
            </li>-->
            <li class="mui-table-view-cell">
                <img v-bind:src="db.goods_image" v-imgdef class="mui-pull-left" style="width:50px;height:50px;margin-right:15px;vertical-align: middle;" /><span class="mui-pull-left">
                    {{db.goods_name}}
                    <p>{{db.sp_value_name}} {{db.goods_num}}件</p>
                </span>
            </li>
        </ul>
        <!--<p class="mui-pull-right clear">共1件商品 <span>合计:￥33.00</span></p>-->
        <div class="box" style="margin-bottom:25px;">
            <!--<span v-if="data.order_state==20" v-href="{name:'延长收货',params:{id:db.order_id}}">延长收货</span>-->
            <span v-if="data.order_state==30" v-href="{name:'查看物流',params:{id:db.order_id}}" class="wl">查看物流</span>
            <span v-if="data.order_state==30" @tap="qdsh(db.order_id)">确认收货</span>
            <span v-if="data.order_state==40" v-href="{name:'订单评论',params:{id:db.order_id},query:{img:db.goods_image}}">评价</span>
            <span v-if="data.order_state==20||data.order_state==30||data.order_state==40" v-href="{name:'申请退款',params:{id:db.order_id}}">申请退款</span>
        </div>
    </template>
    <div class="mui-loading" v-if="list==null">
        <div class="mui-spinner"></div><h6 class="mui-text-center">加载中</h6>
    </div>
    <div class="no-content" v-if="list&&list.length==0">
        <i></i>
        <h4>暂无订单</h4>
    </div>
</pull></div>
    </div>
</template>
<style scoped>
    .page{font-family: "微软雅黑";font-size:15px;background:#EFEFF4}
	.mui-segmented-control{border:1px solid #e0e0e0;margin-bottom: -1px;}
	.mui-segmented-control .mui-control-item.mui-active { color: #0B2E4C; background-color: transparent;border-bottom:2px solid #0B2E4C; }
	.mui-segmented-control .mui-control-item{color:#777;background-color:transparent; border-left: 1px solid #E0E0E0;    line-height: 30px;}

	/*input[type=search]{background-color: transparent;}
	.mui-search .mui-placeholder {text-align: left;padding-left:5px;border: 1px solid #ccc;color: #c6c3c3; font-size: 13px;width:90%;margin:10px auto;border-radius:15px;height:30px;line-height:30px;}*/
    .mui-search {margin:12px 15px 10px 15px;border-radius: 15px;background-color:#F7F7F7!important;border: 1px solid #ccc;}
        .mui-search .mui-placeholder {font-size: 12px !important;background:none;}
        .mui-search input { margin:0;background:none;}
        .mui-search.mui-active:before { top: 25px;left: 10px;}
	.red{color:#E43A3D;}
	#pay{background-color:#E43A3D;color:#fff;border:none;}
	.mui-navigate-right:after, .mui-push-right:after{right:0px;}
	.box {margin:5px 10px;display:block;clear:both;float:right;}
	.box span{border:1px solid #a4a1a1;color:#5d5c5c;padding:3px;font-size:12px;border-radius:3px;}
    .mui-table-view { margin-bottom:6px;}
</style>
<script>
     import pull from '../public/pull'
export default {
    mounted(){
        this.data.order_state=this.$route.params.tab;
        this.getlist(()=>{});
    },
    components: {pull},
    data(){
        return{
            data:{
                order_state:0,
                searchtext:"",
                page:0,
            },
            list:null
        }
    },
    methods:{
        getlist(done){
            this.data.page=0;
            this.getpage(done)
        },
        search(e){
            this.data.searchtext=e.srcElement.value;
            this.getlist(()=>{});
        },
        getpage(done){
            this.data.page=(this.list||[]).length;
            this.$api("Member/orderlist",this.data).then(db=>{
                var list=db||[]; 
                if(this.data.page==0){
                    this.list=list;
                }else{
                    this.list=list.concat(list);
                }
                if(list.length==0)return done(true);
                done();
            })
        },
        qdsh(order_id){//确认收货
            this.$api("Member/goodsreceipt",{order_id}).then(db=>{
                this.$router.push({name:'我的订单',params:{tab:40},replace:true })
            });
        },
    },
    watch:{
        "$route.params.tab"(tab){
            this.data.order_state=this.$route.params.tab;
            this.list=null;
            this.getlist(()=>{});
        }
    }
    }
</script>