<template>
    <div>
        <!--<p>海报信息就是一些文章的信息，下面加个立即报名的按钮</p>-->
        <div class="page">
            <div class="mui-loading" v-if="title==''">
                <div class="mui-spinner"></div>
                <h6 class="mui-text-center">精彩内容马上呈现..</h6>
            </div>
            <template v-if="title!=''">
                <h1 class="title" v-html="title"></h1>
                <p class="tool">{{add_time | dateShort}} </p>
                <div class="content" v-html="content"></div>
            </template>
        </div>

        <tuijian v-bind:list="tuijian" />


        <!--立即报名的按钮-->
        <nav class="mui-fullscreen">
            <button class="mui-btn active" v-href="'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3731be382de01438&redirect_uri=http://ybswx.yunliplus.com/index.php/Bssay/warrant&response_type=code&scope=snsapi_userinfo&state='+$route.query.id+'@'+$route.query.uid+'#wechat_redirect'">立即报名</button>
        </nav>
    </div>
</template>
<style scoped>
    .page {
        padding: 10px;
        font-family: "微软雅黑";
    }
    
    .title {
        color: #262626;
        font-weight: 400;
        font-size: 24px;
        margin: 12px 0;
    }
    
    .tool span {
        color: #8B949B;
    }
    
    .content {
        overflow: hidden;
    }
    /*底部按钮*/
    
    nav {
        background: #fff
    }
    
    nav {
        height: 50px;
        top: inherit;
        text-align: center
    }
    
    nav .mui-btn {
        position: fixed;
        left: 0px;
        font-size: 20px;
        height: 36px;
        background-color: #FCB406;
        width: 100%;
        color: #fff;
        height: 50px;
        font-family: "微软雅黑";
        border: none;
    }
</style>
<script>
    import comm from '../common/comm'
    import tuijian from '../public/tuijian'
    export default {
        created() {

            //    this.$api("Bssong/",{page}).then(db=>{\
            //        //title   :文章标题
            //        //content :文章内容
            //        //add_time:添加时间
            //    });
        },
        mounted() {
            this.$api("Bssay/baominginfo", { id: this.$route.query.id }).then(data => {
                comm.updateTitle(data.title)
                Object.assign(this.$data, data);

            });
        },
        components: { tuijian },
        data() {
            return {
                id: 0,
                add_time: "",
                title: "",
                picture: "",
                content: "",
                tuijian: [],
            }
        },
        watch: {
            "$route.params.id"() {
                this.title = "";
                this.tuijian = [];
                this.update();
            }
        },
        methods: {

        }
    }

</script>