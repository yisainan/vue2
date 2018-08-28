<template>
    <div class="my_body">
        <div class="box mui-text-center">
            <p>
                <img src="img/login/login.png" style="width:40%" />
            </p>
            <p>
                <img class="welcome" src="img/login/logo_title.png" width="65%" />
            </p>
            <form method="post" @submit="login">
                <input class="user user_name" type="tel" maxlength="11" v-model="data.phone" placeholder="手机号" @keyup.13="$refs.pwd.focus()" />
                <input class="user user_pwd" type="password" v-model="data.password" placeholder="请输入密码" ref="pwd" @keyup.13="login" />
                <input class="btn" type="button" value="登录" @tap="login" />
                <p>
                    <a v-href="'/register'" class="mui-pull-left">手机快速注册</a>
                    <!--<a href="" class="mui-pull-right">忘记密码</a>-->
                </p>
            </form>
            <!--<div class="wx_qq">
                <a class="mui-pull-left">
                    <img src="img/login/wx.png" /> <br />
                    微信登录
                </a>
                <a class="mui-pull-right">
                    <img src="img/login/qq.png" /> <br />
                    QQ登录
                </a>
            </div>-->
            <div class="clear"></div>
        </div>
    </div>
</template>
<style scoped>
    .my_body { background: #0B2E4C;  height: 100%; position: absolute; overflow: auto; }
    .welcome { margin: 10% auto; }
    form { width: 70%; margin: 5% auto; }
    .box{margin-top:10%;}
    .box .user { background: transparent; border: none; border-bottom: 1px solid #ccc; padding: 20px 0 20px 25%; color: #ddd; border-radius: 0; font-size: 14px; letter-spacing: 1px; }
    .box .user_name { background: url(user.png) no-repeat 6% 8px;background-size: 20px 20px; }
    .box .user_pwd { background: url(lock.png) no-repeat 6% 8px; background-size: 20px 20px;}
    .box .btn { margin-top: 8%; width: 100%; height: 40px; color: #fff; background: #7BA4C4; border-radius: 4px; border: none; outline: none; }
    .box p a, .wx_qq a { font-size: 10px; color: #fff; margin-top: 10px; }
    .wx_qq { clear: both; width: 70%; margin: 24% auto 0 auto; }
        .wx_qq img { width: 50%; }
</style>
<script>
        import comm from '../common/comm'
export default {
    data(){
        return{
            data:{phone:"" ,password:""}
        }
    },
    methods:{
        login(){
            this.$api("Login/login",this.data).then(uid=>{
                localStorage.setItem("uid",uid)
                comm.doShare();
                var path=localStorage.getItem("loginbackurl");
                mui.toast("登陆成功!");
                if(path==null||path.length<1||path.indexOf("#/login")>-1){
                    this.$router.replace('/');
                    return;
                }
                this.$router.replace(path.substr(1));
            });
        }
    }
    }
</script>