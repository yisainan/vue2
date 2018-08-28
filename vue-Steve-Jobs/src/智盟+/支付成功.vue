<template>
    <div class="mui-fullscreen page">
        <div class="wrap">
            <div class="content">
                <img src="img/Success.png" />
                <h4>支付成功</h4>
                <p v-if="$route.params.id!=4&&$route.params.id!=3">我们将尽快为您安排发货</p>
                <!--<table class="table">
                    <tr><th>订单号</th><td>20161201897</td></tr>
                    <tr><th>支付方式</th><td>支付宝</td></tr>
                    <tr><th>支付账户</th><td>20161201897@qq.com</td></tr>
                    <tr><th>收件人</th><td>扬布斯</td></tr>
                    <tr><th>订单金额</th><td>￥23.00</td></tr>
                </table>-->
                <button class="button lookDetail" v-href="{name:'我的订单',params:{tab:20}}" v-if="$route.params.id!=4&&$route.params.id!=3">查看订单</button>
                <button class="button lookDetail" v-href="{name:'我的财富'}" v-if="$route.params.id==4">我的财富</button>
                <button class="button lookDetail" v-href="{name:'我的众筹'}" v-if="$route.params.id==3">我的众筹</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .page {
        font-family: "微软雅黑";
        font-size: 15px;
        height: 100%;
    }
    
    .wrap {
        width: 87%;
        margin: 0 auto;
        background-color: #fff;
        height: 90%;
    }
    
    .content {
        text-align: center;
        width: 100%;
        margin: 30px auto;
        padding: 25px;
    }
    
    .content img {
        max-width: 20%;
        margin-top: 30%;
    }
    
    .lookDetail {
        border-radius: 6px;
        background-color: #0B2E4C;
        color: #fff;
        width: 50%;
        margin-top: 5px;
    }
    
    .table {
        width: 100%;
    }
    
    h4 {
        color: #555;
        font-weight: 400;
        margin: 20px 0 5px 0
    }
    
    .table th {
        text-align: left;
        padding: 5px 0px;
        color: #0B2E4C;
    }
    
    .table td {
        text-align: right;
    }
</style>
<script>

</script>