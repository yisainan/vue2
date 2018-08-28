<template>
    <div class="page">
        <div class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-center mui-title">选择银行卡</h1>
            <a v-href="{name:'添加银行卡'}" class="mui-icon mui-icon-plusempty mui-icon-right-nav mui-pull-right" id="addmember"></a>  <!--添加的小图标-->
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-table-view-radio" id="choosecard">
                <li class="mui-table-view-cell " v-for="m in vipbank" @tap="select(m)">
                    <a class="mui-navigate-right">  <span>{{m.bankname}}</span><p>尾号{{weihao(m.bankcard)}}</p><span class="code">{{m.cardholdername}}</span> </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; height: 100%; }
    .mui-bar.mui-bar-nav { background: #0B2E4C;box-shadow: none; }
    .mui-title { color: #fff; }
    .mui-bar a { color: #fff !important; }
</style>
<script>
    import cache from "../common/cache"
export default {
    mounted(){
        this.$api("Member/TXindex").then(db=>{
            this.vipbank=db.vipbank
        });
    },
    data(){
        return{
            vipbank:[],
        }
    },
    methods:{
        select(m){
            cache.set("selectvipcard",m);
            this.$router.push({name:'提现'});
        },
        weihao(str){
        return str.substr(str.length-4)
        }
    }
    }
</script>