<template>
    <div class="zhanwei">
        <div class="bar">
            <!--<img src="./img/bsyd.png" class="bsyd" />-->
            <span class="right">
                <a @tap="menu_show=true" ><img src="img/icon/topmenu.png"/></a>
                <a v-href="{name:'个人中心'}"><img src="img/icon/user.png"/></a>
            </span>
            <div class="clear"></div>
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
    </div>
</template>
<style scoped>
    .zhanwei {
        height: 30px;
    }
    
    .bar {
        height: 30px;
        background: #0B2E4C;
        width: 100%;
        top: 0;
        z-index: 99;
        position: absolute
    }
    
    .bsyd {
        max-height: 25px;
        margin: 2px 0 0 30px;
    }
    
    .right {
        float: right;
    }
    
    .right a {
        width: 36px;
        padding-top: 5px;
        display: inline-block;
    }
    
    .right img {
        width: 16px;
        margin-right: 20px;
    }
    /*弹出菜单*/
    
    .topPopover {
        position: absolute;
        top: 38px;
        right: 8px;
        height: 165px;
        z-index: 999;
        width: 95px;
        background: #fff;
    }
    
    .topPopover .mui-popover-arrow {
        left: auto;
        left: 21px;
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
</style>
<script>
    // v-bind:style="{position:absolute?'absolute':'fixed'}"
    export default {
        props: ["absolute"],
        data() {
            return {
                menu_show: false
            }
        },
        methods: {
            hide() {
                this.menu_show = false;
            }
        }
    }

</script>