<template>
    <div>
        <div class="mui-fullscreen page">
            <div class="content">您的众筹已发起成功，<br /> 邀请更多伙伴加入我们吧!</div>
            <p class="mui-text-center">
                <button type="button" class="mui-btn btnadd" @tap="sharebox=true">分享出去，让更多人支持你</button>
                <button type="button" class="mui-btn submit" id="post" v-href='{ name: "我的众筹" }'>返回</button>
            </p>

        </div>
        <div class="mui-fullscreen sharebox" v-if="sharebox" @tap="sharebox=false" style="background-image: url(img/ZC/share.png)"></div>
</div>
</template>\
<style scoped>
.page{background: #fff;}
.content{padding: 23px;color: #999;font-family: "微软雅黑" }
.mui-btn{width: 85%; padding:8px 0px;margin-bottom: 10px;border-color:#8194A4;color:#fff;font-size: 16px;border-radius:6px ;background: #7BA4C4; } 
    #post{background-color:#0B2E4C ;color:#fff; border:none;}
    .sharebox{background-size: cover;}
</style>
<script>
    import cache from '../common/cache'
    import wxapi from '../common/wxapi'
    export default {
        mounted() {
            wxapi.showMenuItems(this.cachezc.project_name, this.cachezc.posters, this.$route.params.id, localStorage.getItem('uid'), 5);
        },
        data() {
            return {
                sharebox: false,
                cachezc: cache.get("当前众筹"),

            }
        },
        methods: {

        }
    }
</script>