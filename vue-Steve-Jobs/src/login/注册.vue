<template>
    <div class="my_body">
        <div class="box mui-text-center">
            <p>
                <img src="img/login/login.png" style="width:40%" />
            </p>
            <p>
                <img class="welcome" src="img/login/logo_title.png" width="65%" />
            </p>
            <form class="register" method="post" @submit="submit">
                <input class="user user_name" type="text" v-model="data.vname" placeholder="用户名/邮箱" />
                <input class="user user_tel" type="tel" maxlength="11" v-model="data.phone" placeholder="请输入正确的手机号" />
                <input class="user user_pwd" type="password" v-model="data.password" placeholder="密码,6~16位字母或数字" />
                <p>
                    <input class="user user_pen" type="text" v-model="data.verify" placeholder="请输入验证码" @keyup.13="submit" />
                    <a class="ymz" @tap="updateymz">{{verify}}</a>
                </p>
                <input class="btn" type="button" value="注册并登录" @tap="submit" />
            </form>
        </div>
    </div>
</template>
<style scoped>
    .my_body { background: #0B2E4C; height: 100%;position: absolute; overflow: auto; }
    .welcome { margin: 10% auto; }
    form { width: 70%; margin: 10% auto; }
    .box { margin-top:10%}
    .box .user { background: transparent; border: none; border-bottom: 1px solid #ccc; padding: 20px 0 20px 25%; color: #ddd; border-radius: 0; font-size: 14px; letter-spacing: 1px; }
    .box .user_name { background: url(user.png) no-repeat 6% 8px; background-size: 20px 20px;}
    .box .user_pwd { background: url(lock.png) no-repeat 6% 8px; background-size:20px 20px; }
    .box .btn { margin-top: 8%; width: 100%; height: 40px; color: #fff; background: #7BA4C4; border-radius: 4px; border: none; outline: none; }
    .box p a, .wx_qq a { font-size: 10px; color: #fff; margin-top: 10px; }
    .wx_qq { clear: both; width: 70%; margin: 24% auto 0 auto; }
        .wx_qq img { width: 50%; }
    /*注册界面*/
    .box .user_tel { background: url(phone.png) no-repeat 6% 8px;background-size:20px 20px; }
    .box .user_pen { background: url(pen.png) no-repeat 5% 8px;background-size:20px 20px; }
    form.register p { position: relative; }
        form.register p a { position: absolute; right: 0; top: 0px; color: #fff; font-size: 16px; }
            form.register p a img { width: 70%; }
</style>
<script>
    import comm from '../common/comm'
export default {
    mounted(){
        this.updateymz();
    },
    components: {},
    data(){
        return{
            data:{vname:"",phone:"",verify:"",password:""}, //,password2:""
            verify:"",
        }
    },
    methods:{
        updateymz(){
            this.$api("Login/ptverify",this.data).then(db=>{
                this.verify=db;
            });
        },
        submit(){
            this.$api("Login/register",this.data).then(db=>{
                localStorage.setItem("uid",db);
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