<template>
    <nav class="mui-bar mui-bar-tab">
        <a class="mui-tab-item" v-href="'/Bshome'">
            <img src="img/bar2/1.png" />
            <span class="mui-tab-label">首页</span>
        </a>
        <a class="mui-tab-item" v-href="{name:'推荐'}">
            <img src="img/bar2/2.png" />
            <span class="mui-tab-label">推荐</span>
        </a>
        <a class="mui-tab-item" v-href="{name:'心头好'}">
            <img src="img/bar2/3.png" />
            <span class="mui-tab-label">心头好</span>
        </a>
        <a class="mui-tab-item"  v-href="{name:'购物车'}">
            <img src="img/bar2/4.png" />
            <span class="mui-tab-label">购物车</span>
        </a>
    </nav>
</template>
<style scoped>
   .mui-bar-tab { background: #E4E7EC;height:45px;-webkit-transform: translateZ(0);}
    .mui-tab-label {color:#666;font-size:12px; }
    .mui-tab-item { height:45px;position:relative;top:3px;}
    .mui-tab-item img{ display:block;margin:0 auto 0px auto;height:20px;}
</style>