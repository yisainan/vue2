<template>
	<div class="page" style="background:#011F3B url('img/Bssay/bg22.png') no-repeat;background-size:cover">
		
		<header class="mui-text-center">
			<img src="img/Bssay/re-header.png"  style="margin-top:45px;width:150px;margin-left:20px"/>
		</header>
		
		
		<form >

			<div>
				<label><img src="img/Bssay/name.png"></label>
				<input type="text" placeholder=""  v-model="vname">
			</div>
			<div>
				<label><img src="img/Bssay/phone.png"></label>
				<input type="text" placeholder=""  v-model="vphone">
			</div>
			<div>
				<label><img src="img/Bssay/company.png"></label>
				<input type="text" placeholder="" v-model="company">
			</div>
			<div>
				<label><img src="img/Bssay/wechat.png"></label>
				<input type="text" placeholder="" v-model="weixin">
			</div>
			<div>
				<label><img src="img/Bssay/position.png"></label>
				<input type="text" placeholder="" v-model="position1">
			</div>
			
		</form>
		
		    <p class="mui-text-center">
		       <button type="button" class="mui-btn" style="background:url('img/Bssay/btn1.png');background-size:cover"  @click="report"></button>
		    </p>
		    
		
			

	</div>
</template>
<style scoped>
.page{background-size:cover;height:100%;width:100%;font-family: "微软雅黑";position: absolute;}
  .circle{width:60px;height:60px;border-radius:50%;margin-top:20%;}
  .mui-btn{background-size: 100% 100%; height: 50px; width: 85%;border: none;    margin-top: 50px;}
 form{width:85%;margin:0 auto;margin-top:10%;padding:15px;border:2px solid #fff;border-radius:5px;background-color: #E52A24;}
 form div{margin-top:5px;}
 label{width:23%;display: inline-block;text-align: right;}
 label img{width:50px;margin-right:10px}
 input[type='text']{display:inline-block;width:74%;background-color:#fff;height:45px;vertical-align: middle;}
 .tip{color:#B6B3B3;font-size:14px;width:90%;text-align: left;line-height:6px;margin-top:25px}
 .tip img{vertical-align: middle;width:40px;}
</style>
<script>
	import comm from '../common/comm'
	export default {
		mounted() {
				
			},
			components: {},
			data() {
				return {
					vname:"",
					vphone:"",
					company:"",
					weixin:"",
					position1:""

				}
			},
			methods: {
              report(){
		        if (this.vname == "") return mui.toast("姓名不能为空!");
		      	if (this.vphone == "") return mui.toast("手机号不能为空!");
		      	if (!/^1\d{10}$/.test(this.vphone)) return mui.toast('手机号格式不正确!');
		      	if (this.company == "") return mui.toast("公司不能为空!");
		      	if (this.weixin == "") return mui.toast("微信不能为空!");
		      	if (this.position1 == "") return mui.toast("职位不能为空!");
              	 this.$api("Bssay/fillreport",{id:this.$route.query.id,uid:this.$route.query.uid,vname:this.vname,vphone:this.vphone,company:this.company,weixin:this.weixin,position1:this.position1}).then(data => {
                   mui.alert(data);
                });
              }
			}
	}
</script>