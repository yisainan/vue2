<template>
    <div class="page">
        <div class="header">
            <img class="tx" v-bind:src="db.head_url" v-imgdef/>
            <div class="name">
                <h3>{{db.vname}}</h3>
                <span v-href="{name:'完善资料'}">完善资料</span><span @tap="qiandao">每日签到</span>
            </div>
            <a class="mui-navigate-right" v-href="{name:'完善资料'}" @tap.stop>
                <!--<img src="img/my/qr.png" />-->
            </a>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <a class="mui-navigate-right" v-href="{name:'我的订单',params:{tab:0}}">
                	<img src="img/my/mybill.png" style="width:17px;vertical-align: sub;margin-right:5px"/>
                    <b>我的订单</b>
                    <span class="mui-pull-right right">查看全部订单</span>
                </a>
            </li>
        </ul>
        <ul class="state_order">
            <li v-href="{name:'我的订单',params:{tab:10}}">
                <img src="img/my/bakage1.png" /><br />待付款<span class="mui-badge mui-badge-danger" v-if="db.stay_pay>0" v-html="db.stay_pay"></span>
            </li>
            <li v-href="{name:'我的订单',params:{tab:20}}">
                <img src="img/my/lw1.png" /><br />待发货<span class="mui-badge mui-badge-danger" v-if="db.stay_deliver>0" v-html="db.stay_deliver"></span>
            </li>
            <li v-href="{name:'我的订单',params:{tab:30}}">
                <img src="img/my/car1.png" /><br />待收货<span class="mui-badge mui-badge-danger" v-if="db.stay_receipt>0" v-html="db.stay_receipt"></span>
            </li>
            <!--<li v-href="{name:'我的订单',params:{tab:40}}">
                <img src="img/my/flower.png" /><br />待评价
                <span class="mui-badge mui-badge-danger" v-if="db.stay_evaluated>0" v-html="db.stay_evaluated"></span>
            </li>-->
            <li v-href="{name:'我的订单',params:{tab:0}}">
                <img src="img/my/dollar1.png" /><br />退款/售后<span class="mui-badge mui-badge-danger" v-if="db.refund>0" v-html="db.refund"></span>
            </li>
        </ul>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
        	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-href="{name:'我的财富'}">
                <a  >
                	<img src="img/my/my1.png"/>
                    <b class="mui-media-body">我的收藏</b>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-href="{name:'我的财富'}">
                <a >
                	<img src="img/my/my2.png"/>
                    <b class="mui-media-body">我的财富</b>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-href="{name:'购物车'}">
                <a >
                	<img src="img/my/my4.png"/>
                    <b class="mui-media-body">购物车</b>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-href="{name:'我的积分'}">
                <a>
                	<img src="img/my/my4.png"/>
                    <b class="mui-media-body">我的积分</b>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-href="{name:'推荐返成'}">
                <a >
                	<img src="img/my/my5.png"/>
                    <b class="mui-media-body">推荐返提成</b>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" v-href="{name:'联系我们'}">
                <a>
                	<img src="img/my/my6.png"/>
                    <b class="mui-media-body">联系我们</b>
                </a>
            </li>
            <!--<li class="mui-table-view-cell mui-text-center loginout" @tap="loginout">退出登录</li>-->
        </ul>
    </div>
</template>
<style scoped>
b,span{font-family: '微软雅黑';font-size:14px;}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
	font-family: '微软雅黑';
	font-size:14px;
	color:#666;
	}
    .page {
        background: #ECECEC;
        height: 100%;
    }
    
    .page .right {
        padding-right: 10px;
    }
    
    .header {
        background: #0B2E4C;
        height: 130px;
        color: #fff;
        position: relative;
    }
    
    .header img.tx {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 30px;
        top: 38px;
        border-radius: 50%;
    }
    
    .header .name {
        position: absolute;
        left: 95px;
        top:33px;
        right: 30px;
    }
    
    .name h3 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    
    .header .name span {
        font-size: 12px;
        margin-right: 8px;
    }
    
    .header .mui-navigate-right img {
        position: absolute;
        right: 40px;
        top: 33px;
    }
    /*链接*/
    
    .mui-table-view-cell a {
        font-size: 12px;
        font-family: "宋体";
        color: #666;
        letter-spacing: 1px;
    }
    
    .state_order {
        margin: 0;
        padding: 15px 10px;
        list-style: none;
        text-align: center;
        height: 80px;
      /*  border-top: 1px solid #ccc;*/
        background: #fff;
    }
    
    .state_order li {
        float: left;
        width: 25%;
        text-align: center;
        position: relative;
    }
    
    .state_order li {
        float: left;
        color: #3C5770;
        font-size: 12px;
        font-family:"微软雅黑";
    }
    
    .state_order li img {
        height: 22px;
        max-width: 100%;
        margin-bottom: 0px;
    }
    
    .state_order .mui-badge-danger {
        position: absolute;
        top: -10px;
        right: 8px;
    }
    
    .loginout {
        font-size: 14px;
        color: #666;
        font-family: "Microsoft YaHei UI";
    }
    .mui-grid-9 .mui-media{text-align: center;}
    .mui-grid-9 img{width:30px;height: 30px;}
    /*.mui-grid-view.mui-grid-9{background-color: #ffffff;}*/
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{    background-color: #ffffff;    padding: 25px 15px;}

     </style>
<script>
    export default {
        mounted() {
            this.$api("Member/index").then(db => {
                this.db = db;
            });
        },
        data() {
            return { db: {} }
        },
        methods: {
            qiandao() {
                this.$api("Member/setsign").then((db) => {
                    mui.toast("签到成功");//签到成功
                });
            },
            loginout() {
                this.$api("Login/logout").then((db) => {
                    this.$router.push({ name: "登陆" });
                });
            }
        }
    }

</script>