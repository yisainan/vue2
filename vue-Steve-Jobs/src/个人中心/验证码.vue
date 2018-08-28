<template>
    <div class="page">
        <header class="mui-navbar-inner mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
		    <h1 class="mui-title">添加银行卡</h1>
	    </header>
		
		
		<div class="mui-content">
				<div class="mui-clearfix" id="check">
					<p style="margin-top:10px;">绑定银行卡需要短信验证，验证码已发送至手机13929100122，请按提示完成操作</p>
					<input type="text" placeholder="填写验证码" class="check1 "/><button class="verify" onclick="settime(this);return false;">获取验证码</button>
				</div>
				<div class="button" style="margin-top:60px;">
	              <button type="button" class="btn mui-btn">下一步</button>
	           </div>    
       
    </div>
    </div>
</template>
<style scoped>
.page{font-family: "微软雅黑";font-size:15px;height:100%;}
#check{position:relative;width:93%;margin:0 auto;}
.check1{position:absolute ; top:56px; }
.verify{ position:absolute ; right:6px; top:60px; display: inline-block; padding: 0px 5px; text-align: center; background-color: #182F41; font:  12px/30px "sisum"; color: #fff; cursor: default; border-radius:3px; border:none; }
   /*下一步按钮样式*/
.button{text-align: center;margin-top:15px;}
.button .btn{height:45px;line-height:25px;letter-spacing:3px;font-size:17px;width:80%;color:#fff !important;background-color:#182F41;border:none;}
.button+div{text-align: center;margin: 20px;}
.button+div a{color:#ED5564;} 
</style>
<script>
export default {
    mounted(){
        this.$api("Member/shopping").then(list=>{
            this.list=list;
        });
    },
    components: {},
    data(){
        return{
            list:null
        }
    },
    computed:{
        //...mapGetters(["vip"]),
        //...mapState({
        //_view:s=>s.view,
        //})
    },
    watch:{

    },
    methods:{
        //...mapMutations(["fundddd"]),
        //...mapActions(["fundddd"]),
        //submit(){

        //}
    }
    }
</script>