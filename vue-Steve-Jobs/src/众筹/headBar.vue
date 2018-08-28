<template>
    <div class="head">
        <!--{{title||'微众筹：微小光，照亮你'}}-->
        <img src="img/ZC/top.png" style="width: 50%;"/>
        <span class="mui-pull-right"  @click="go"><img src="img/ZC/wdzc.png" style="margin-right:5px;"/>我的众筹
        <span class="mui-badge" style="top: -5px;position: relative;">{{mess}}</span>
        </span>
    </div>
</template>
<style>
    .head{background: #0B2E4C;height: 35px;color: #bbb;line-height: 34px;padding:0 20px;font-family: "微软雅黑";font-size: 14px}
    .head img{height: 16px;vertical-align: middle;margin-left: 8px;}
    .mui-badge{padding: 1px 3px;background-color:red; color:#fff;font-size:10px;}
</style>
<script>
    export default {
    	  props: ["title"],
    	  mounted() {
            this.$api("Zhongchou/myzc").then(db => {
                this.mess=db.mess;
            });
        },
        data(){
        	return {
        		mess:0
        	}
        },
    	methods:{
    		 go(){
            	this.$router.push({name:'我的众筹'})
            },
    		
    	}
    	}
</script>