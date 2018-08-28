<template>
	<div class="login" style="top: 0!important;left: 0!important">
		<div class="form-box">
			<ul class="form-ul" @keyup.enter="loginClick">
				<li>
					<span>用户名</span><input type="text" name="" v-model="contentIn.userName" placeholder="请输入用户名">
				</li>
				<li>
					<span>密&nbsp;&nbsp;&nbsp;&nbsp;码</span><input v-model="contentIn.password" type="password" name="" placeholder="请输入密码">
				</li>
				<li>
					<span>验证码</span><input v-model="contentIn.yzmText" type="text" name="" style="width:100px;" placeholder="请输入验证码">
					<div class="yzm" id="yzmContainer"></div>
				</li>
				<li>
					<button class="submit-btn" id='login' @click="loginClick">登录</button>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">

	export default {
		name: 'login',
		data() {
			return {
				contentIn: {'userName':null, 'password':null, 'yzmText':null},
				verifyCode: null
			}
		},
		created() {
			if (localStorage.getItem('isLogin') == 'true') {
				this.$router.push({path: '/ReleaseNotice'})
			}
		},
		mounted() {
			this.verifyCode = new GVerify("yzmContainer");
		},
		methods: {
			loginClick() {
				// var regUserName = /^1[3|4|5|8][0-9]\d{4,8}$/;//验证手机号
				var regUserName = /^[A-Za-z]+$/;
				var passW = /^[0-9a-zA-Z]+$/;//验证密码为数字和字母

				if (!regUserName.test(this.contentIn.userName) || this.contentIn.userName != 'administrator') {
					this.$message.error('请输入正确的用户名');
					return;
				}
				if (this.contentIn.password.length < 6) {
					this.$message.error('密码必须为6位数字和字母组成');
					return;
				}
				if (!passW.test(this.contentIn.password) || this.contentIn.password != '123456ff') {
					this.$message.error('密码必须为6位数字和字母组成');
					return;
				}
				if (this.contentIn.yzmText.length < 0) {
					this.$message.error('请输入验证码');
					return;
				} else {
					var res = this.verifyCode.validate(this.contentIn.yzmText);
				}
				if (!res) {
					this.$message.error('请输入正确的验证码');
					return;
				}
				this.$setCookie('isLogin','true',60);
				localStorage.setItem('isLogin','true');
				this.$router.push({path: '/ReleaseNotice'});

			}
		}
	}
</script>
<style lang="scss">
	.login {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background: #DCDEDA;
	}
	.form-box {
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform:translate(-50%,-50%); 
		-moz-transform:translate(-50%,-50%); 
		transform:translate(-50%,-50%); 
		width: 500px;
		height: 300px;
		background: #ccc;
		border-radius: 5px;
	}
	.form-ul {
		padding: 52px 15px;
		line-height: 48px;
		li {
			padding: 0.1px 0 0 100px;
			position: relative;
			width: 100%;
			span {
				margin-right: 20px;
			}
			input {
				width: 200px;
				border-radius: 2px;
				height: 30px;
				padding: 8px 5px;
				border: none;
			}
		}
	}
	.yzm {
		position: absolute;
		top: 5px;
		right: 100px;
		width: 90px;
		height: 40px;
	}
	.submit-btn {
		border: none;
		border-radius: 5px;
		height: 38px;
		width: 180px;
		margin-left: 45px;
		background: #099313;
		color: #fff;
	}
</style>