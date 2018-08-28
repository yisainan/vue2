<template>
    <div class="zhanwei">
        <div class="bar mui-row">
            <div class="mui-col-xs-1" @tap="menu_show=true">
                <img src="img/icon/topmenu.png" class="ico ico1" />
            </div>
            <div class="mui-col-xs-10">
                <div class="mui-input-row mui-search">
                    <input type="search" class="mui-input-clear" v-model="key" placeholder="" v-mui="'input'" @keyup.13="search">
                </div>
                <div v-if="list.length>0" class="searchlist">
                    <div v-for="db in list" v-href="{ name: '商品详情', params:{id: db.goods_id,uid:1 }}">{{db.goods_name}}</div>
                </div>
            </div>
            <div class="mui-col-xs-1" v-href="{path:'/my'}">
                <img src="img/icon/user.png" class="ico" />
            </div>
        </div>
        <div class="mui-popover topPopover mui-active" v-if="menu_show" v-tapout="hide">
            <div class="mui-popover-arrow"></div>
            <div class="mui-scroll-wrapper">
                <ul class="mui-table-view" @click.prevent="menu_show=false">
                    <li class="mui-table-view-cell" v-href="{path:'/'}">
                        <img src="img/icon/home.png" class="home" /> 首页
                    </li>
                    <li class="mui-table-view-cell" v-href="{path:'/Praise'}">
                        <img src="img/icon/menu.png" /> {{"智慧颂" | title}}
                    </li>
                    <li class="mui-table-view-cell" v-href="{path:'/Bssay'}">
                        <img src="img/icon/menu.png" /> {{"盟友道" | title}}
                    </li>
                    <li class="mui-table-view-cell" v-href="{path:'/Bshome'}">
                        <img src="img/icon/menu.png" /> {{"智盟+" | title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style>
    input[type="search"] {
        border-radius: 15px;
    }
    
    .bar>div {
        position: relative;
        top: 2px;
        text-align: center;
    }
    
    .bar .mui-search input {
        margin: 4px 0 0 5% !important;
        padding: 0 0 0 20px !important;
        background: #b4b5b6;
        height: 22px;
        width: 90%;
        color: #fff;
    }
    
    .mui-search .mui-placeholder {
        text-align: left;
        padding-left: 30px;
    }
    
    .bar .mui-icon-search:before {
        color: #fff;
    }
    
    .bar .mui-search.mui-active:before {
        top: 23px;
        color: #fff;
        left: 22px;
    }
    
    .bar .mui-input-row.mui-search .mui-icon-clear {
        top: 5px;
        right: 10px;
        color: #eee;
    }
</style>
<style scoped>
    .zhanwei {
        height: 35px;
    }
    
    .bar {
        height: 35px;
        background: #0B2E4C;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;
        -webkit-transform: translateZ(0);
        padding: 0 10px;
    }
    
    img.ico {
        width: 16px;
        margin-top: 5px;
    }
    
    img.ico1 {
        margin: 8px 0 0 10px;
    }
    /*弹出菜单*/
    
    .topPopover {
        position: absolute;
        top: 38px;
        left: 10px;
        height: 165px;
        z-index: 999;
        width: 95px;
        background: #fff;
    }
    
    .topPopover .mui-popover-arrow {
        left: auto;
        left: 5px;
    }
    
    .mui-table-view {
        background: none;
        margin-top: -3px
    }
    
    .mui-table-view-cell {
        font-family: "微软雅黑";
        color: #979798;
        background: #fff;
        padding: 9px 15px;
        font-size: 14px;
    }
    
    .mui-popover .mui-popover-arrow:after {
        background: #fff;
    }
    
    .mui-table-view-cell img {
        max-width: 14px;
        margin-left: 1px;
    }
    
    .mui-table-view-cell img.home {
        max-width: initial;
        max-height: 16px;
        vertical-align: bottom;
        margin-left: 0px;
        top: -3px;
        position: relative;
    }
    
    .searchlist {
        top: 4px;
        position: relative;
        padding: 0px 20px;
    }
    
    .searchlist div {
        background: #E4E7EB;
        border-top: 1px solid #D7D7DC;
        line-height: 40px;
        height: 40px;
        font-size: 16px;
        padding: 0 14px;
        color: #666;
        overflow: hidden;
        word-break: break-all
    }
</style>
<script>
    export default {
        data() {
            return {
                menu_show: false,
                key: "",
                list: []
            }
        },
        methods: {
            hide() {
                this.menu_show = false;
            },
            search() {
                if (this.key == "") {
                    this.list = [];
                    return;
                }
                this.$api("Bsfamily/searchGood", { goods_name: this.key }).then(db => {
                    this.list = db;
                })
            }
        }
    }

</script>