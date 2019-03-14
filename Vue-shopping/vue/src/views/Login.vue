<template>
    <div class="login" > 
        <div class="login-warpper">
            <img src="../assets/img/login.jpg" alt="" srcset="" class="login-img">
            <div class="form">
                <div class="form-cont">   
                    <p class="login-title">登录 / 注册</p>
                    <div class="form-group">
                        <label for="username" class="sr-only">USERNAME</label>
                        <input type="text" v-model="nickname" class="form-control" maxlength="16" placeholder="USERNAME" autocomplete="off">
                    </div>
                    <div class="form-group">
                        <label for="password" class="sr-only">PASSWORD</label>
                        <input type="password" v-model="password" class="form-control" maxlength="16" placeholder="PASSWORD" autocomplete="off">
                    </div>
                    <van-cell-group>
                        <van-field
                            v-model="phone"
                            center
                            clearable
                            label="手机号码"
                            placeholder="仅注册需要"
                            class="sms"
                            type='number'
                            maxlength='11'
                        >
                        </van-field>
                    </van-cell-group>
                    <van-cell-group>
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="仅注册需要"
                            class="sms"
                            maxlength='4'
                        >
                            <van-button slot="button" size="small" type="primary" v-if="!retry" @click="sendCode">发送验证码</van-button>
                            <van-button slot="button" disabled type="primary" v-else size="small">{{retry}}秒后再试</van-button>
                        </van-field>
                    </van-cell-group>
                    <div class="form-group verify">
                        <label for="inputEmail3" class="col-sm-2 control-label">验证码</label>
                        <input type="text" placeholder="请输入验证码" v-model="verifyTxt"  class="form-control verify-input" maxlength="4"  autocomplete="off">
                        <div class="col-sm-10">
                            <img :src="verify" ref="eleVerify" @click="replaceVerify" title="看不清？点击刷新">
                        </div>
                    </div>

                    <div class="form-group form-group2">
                        <van-button :loading='loginLoding' style="margin-right:10px" type="primary" @click="login(false)">登 录</van-button>
                        <van-button :loading='regLoding'  type="danger" @click="login(true)" >注 册</van-button>
                    </div>
                </div>
            </div>
            <Back @back='back'/>
    </div>
    </div>
</template>

<script>
import Back from "public/Back";
import {vuexData} from 'js/mixin'
export default {
    name: "Login",
    mixins: [vuexData],
    data() {
        return {
            nickname:'',
            password:'',
            tip:'',
            timer:0,
            regLoding:false,
            loginLoding: false,
            verify: this.Api.getAverify() , 
            verifyTxt: '',
            sms:'',
            phone:'',
            retry:'', // 60秒倒计时
            dataTimer:10 // 60秒倒计时
        }
    },
    components: {
        Back,
    },

   
    methods: {
        // 更换验证码
        async replaceVerify() {
            this.$refs.eleVerify['src'] =  this.Api.getAverify()
        },
        login(flag) {
            if (!this.nickname || !this.password) {
                this.$toast('请输入用户名或者密码');
                return
            }
            if (!this.verifyTxt) {
                this.$toast('请输入验证码');
                return
            }
            if (this.verifyTxt.length < 4) {
                this.$toast('请输入正确的验证码');
                return
            }
            if (!flag) {    // 登录
                this.register(false)
            } else {  // 注册
                this.register(true)
            }
        },

        async register(flag) {
            if (flag) { //  注册
                try {
                    this.regLoding = true
                    const {data} = await this.Api.register(this.nickname,this.password,this.verifyTxt)
                    if (data.code == 200) {
                        this.setName(data.userInfo)
                        this.setToken(data.token)
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 1500);
                        
                    } else {
                        setTimeout(() => {
                            this.verifyTxt = ''
                            this.replaceVerify()
                        }, 600);
                        
                    }
                    this.regLoding = false
                    this.$toast(data.msg);
                } catch (error) {
                    console.log(error);
                    
                    this.$toast('网络错误')
                    this.regLoding = false
                    this.replaceVerify()
                }
                
            } else {    // 登录
                try {
                    this.loginLoding = true
                    const {data} = await this.Api.login(this.nickname,this.password,this.verifyTxt)
                    if (data.code == 200) {
                        this.setName(data.userInfo)
                        this.setToken(data.token)
                        setTimeout(() => {
                            this.$router.go(-1)
                        }, 1500);
                    }else {
                       
                       setTimeout(() => {
                            this.verifyTxt = ''
                            this.replaceVerify()
                        }, 600);
                    }
                    this.loginLoding = false
                    this.$toast(data.msg);
                } catch (error) {
                    this.$toast('网络错误')
                    this.loginLoding = false
                    this.replaceVerify()
                }
                
                
            }
        },

        // 发送验证码
        async sendCode() {
        try {
            if (!this.phone || this.phone.length != 11 ||  !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
                return this.$toast('请输入正确的手机号');
            }
            const {data} = await this.Api.codeMsg(this.phone)
            if (data.code == 200) {
                this.dataTimer = 60
                let t = setInterval(() => {
                    if (this.dataTimer<=0) {
                        this.retry = ''
                        clearInterval(t)
                        return
                    }
                    this.retry = this.dataTimer--
                }, 1000);
            } else if(data.code == -2) {
                let t = setInterval(() => {
                    if (data.timer<=0) {
                        this.retry = ''
                        clearInterval(t)
                        this.dataTimer = 60
                        return
                    }
                    this.retry = data.timer--
                }, 1000);
            } 
            this.$toast(data.msg);
        } catch (error) {
            
        }
            
            
        }
    },
}
</script>

<style lang="stylus" scoped>
.login-warpper >>> .van-cell--center 
    padding-left 0
    border-bottom: 1px solid rgba(0,0,0,.1);
.login-warpper >>> .van-hairline--top-bottom:after
    border 0
.login-warpper >>> .van-field__control::-webkit-input-placeholder
    color: #D8D8D8
    font-size 15px    
.login
    height 100%
    background #EFEFEF
    overflow hidden
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 100
    .login-warpper
        z-index 10
        .login-img
            width 100%
            height 100%
        .form
            width 90%
            margin 0 auto
            background #fff
            position absolute
            top 17%
            left 50%
            transform translateX(-50%)
            padding: 7px
            box-shadow: -2px 3px 23px 1px rgba(0, 0, 0, 0.1)
            .form-cont
                padding 8px
                .login-title
                    letter-spacing: 1px;
                    font-size: 20px;
                    margin: 0 0 30px 0;
                    color: #000000;
                .form-group
                    margin-bottom: 30px
                    .van-button
                        height 45px
                        line-height 45px
                        font-size 14px
                        padding 0 15px
                        width 100px
                    .sr-only
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        margin: -1px;
                        overflow: hidden;
                        clip: rect(0,0,0,0);
                        border: 0;    
                        font-size: 14px;
                        font-weight: 300;
                        font-family: "Open Sans", Arial, sans-serif!important
                    

                    .form-control
                        font-size: 16px
                        font-weight: 300
                        width 100%
                        display block
                        height: 50px
                        padding-left: 0
                        padding-right: 0
                        border: none
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1)
                        -webkit-box-shadow: none
                        -moz-box-shadow: none
                        -o-box-shadow: none
                        box-shadow: none
                        -webkit-border-radius: 0px
                        -moz-border-radius: 0px
                        -ms-border-radius: 0px
                        border-radius: 0px
                        -moz-transition: all 0.3s ease
                        -o-transition: all 0.3s ease
                        -webkit-transition: all 0.3s ease
                        -ms-transition: all 0.3s ease
                        transition: all 0.3s ease
                        font-family: "Open Sans", Arial, sans-serif!important
                        color: #555;
                        &:focus
                            border-bottom: 1px solid rgba(0, 0, 0, 0.4) 
                    input::-webkit-input-placeholder
                        color: #D8D8D8
                        font-size 15px
                    .btn-primary
                        height: 50px;
                        padding-right: 20px;
                        padding-left: 20px;
                        border: none;
                        background: #33cccc;
                        color: #ffffff;
                        box-shadow: -1px 5px 10px -1px rgba(51, 204, 204, 0.4);
                        display: inline-block;
                        padding: 6px 12px;
                        margin-bottom: 0;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 1.42857143;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        display: inline-block;
                        padding: 6px 14px;
                        margin-bottom: 0;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 1.42857143;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        -ms-touch-action: manipulation;
                        touch-action: manipulation;
                        cursor: pointer;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                        background-image: none;
                        border: 1px solid transparent;
                        border-radius: 4px;
                        &:active,&:focus,&:hover
                            color: #ffffff;
                            background: #47d1d1 !important;
                            outline: none;
                            border-color: #122b40;
                            box-shadow: inset 0 1.5px 2.5px rgba(0,0,0,.125);
                    .reg
                        box-shadow: -1px 5px 10px -1px rgba(255, 0, 128, 0.4);       
                .verify
                    display flex
                    align-items center
                    margin-top 20px
                    label
                        flex 0 0 20% 
                    .verify-input
                        flex 0 0 45%
                        margin-right 5%
                        height 40px
                    .col-sm-10
                        flex 1        

        
                    
</style>

