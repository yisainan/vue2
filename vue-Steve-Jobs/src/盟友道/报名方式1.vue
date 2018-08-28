<template>
        <div class="page" v-bind:style="{backgroundImage:'url('+data.main+')'}">
           <header class="mui-text-center" style="padding-top:20%;">
			<img v-bind:src="data.headimgurl" class="circle"/>
			<span class="name">{{data.vname}}</span>
		</header>
		
		<div class="center">
	    	<div><h4>微信报名</h4><p>扫一扫下面的二维码报名</p></div>
		    <img v-bind:src="data.baoming" />
		
		</div>	
           
           
           
        </div>
        
</template>
<style scoped>
 .page {background-size :100% 100%; height:100%;width:100%;font-family: "微软雅黑";position: absolute;}
 .center{width:70%;margin:0 auto;text-align: center;margin-top:13%; background-color: #fff; border-radius: 4px; padding: 10px;}
 .circle{width:65px;height:65px;border-radius:50%;border:3px solid #ccc;    vertical-align: middle;}
 .name{color:#fff;font-size:17px;margin-left:15px}
</style>
<script>
    import wxapi from '../common/wxapi'
    export default {
        mounted() {
            this.$api("/Bssay/wxinfo",{id:this.$route.query.id}).then(data => {
               this.data=data;
//           wxapi.showMenuItems(db.project_name, list.length > 0 && list[0].posters, this.$route.params.id, localStorage.getItem('uid'), 5);  
            });
        },
        components: {},
        data() {
            return {
               data:[]
            }
        },
        methods: {

        }
    }
</script>