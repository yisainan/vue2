<template>
    <div class="mui-row">
        <div class="mui-col-xs-2">
            <router-link to="/" replace class="home"><img src="img/icon/home.png" /></router-link>
        </div>
        <div class="mui-col-xs-10 mui-row nav">
            <div class="mui-col-xs-4">
                <router-link to="/Praise"><img src="img/icon/menu.png" />{{"智慧颂" | title}}</router-link>
            </div>
            <div class="mui-col-xs-4">
                <router-link to="/Bssay"><img src="img/icon/menu.png" />{{"盟友道" | title}}</router-link>
            </div>
            <div class="mui-col-xs-4">
                <router-link to="/Bshome"><img src="img/icon/menu.png" />{{"智盟+" | title}}</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .mui-row {
        /*background: #E4E7EC;*/
        background: #F5F5F5;
        transform: translate3d(0, 0, 0);
        -webkit-transform: translate3d(0, 0, 0);
    }
    
    .nav a {
        line-height: 45px;
        font-size: 14px;
        /*color: #716F71;*/
        color: #333;
        font-family: "宋体";
    }
    
    .nav img {
        position: relative;
        left: -3px;
        width: 10px;
        display: none;
    }
    
    .home {
        max-width: 45px;
    }
    
    .home img {
        width: 21px;
        display: block;
        margin: 11px auto;
    }
    
    .mui-col-xs-4 {
        border-left: 1px solid #DCDCDC;
        text-align: center;
    }
</style>