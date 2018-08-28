<template>
    <div>
    	
        <div class="page">
            <div class="mui-loading" v-if="title==''">
                <div class="mui-spinner"></div><h6 class="mui-text-center">精彩内容马上呈现..</h6>
            </div>
            <template v-if="title!=''">
                <h1 class="title" v-html="title"></h1>
                <p class="tool">{{add_time | dateShort}} </p>
                <div class="content" v-html="content"></div>
            </template>
        </div>
       
        <tuijian v-bind:list="tuijian" />
    </div>
</template>
<style scoped>
    .page { padding: 10px; }
    .title { color: #262626; font-family: "微软雅黑"; font-weight: 400; font-size: 24px;margin: 12px 0; }
    .tool span { color: #8B949B;}
    .content { overflow:hidden;}
</style>
<script>
    import comm from '../common/comm'
    import tuijian from '../public/tuijian'
    export default {
    created(){

        //    this.$api("Bssong/",{page}).then(db=>{\
        //        //title   :文章标题
        //        //content :文章内容
        //        //add_time:添加时间
        //    });
    },
        mounted() {
            this.$api("Bssong/Baoming").then(data => {
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