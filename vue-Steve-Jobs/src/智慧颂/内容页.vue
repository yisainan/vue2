<template>
    <div>
        <div class="page">
            <div class="mui-loading" v-if="title==''">
                <div class="mui-spinner"></div><h6 class="mui-text-center">精彩内容马上呈现..</h6>
            </div>
            <template v-if="title!=''">
                <h1 class="title" v-html="title"></h1>
                <p class="tool">{{add_time | dateShort}} </p>
                <img v-bind:src="firstimg" v-if="firstimg!=''" style="margin-bottom: 10px;" />
                <div class="content" v-html="content"></div>
                <img v-bind:src="endimg" v-if="endimg!=''" style="margin-top: 10px;" />
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
    import tuijian from '../public/tuijian'
export default {
    created(){
        this.$api("Bssong/firstEndImg").then(data=>{
            Object.assign(this.$data,data);
        });
    },
    mounted(){    	
        this.update();
    },
    components: {tuijian},
    data(){
        return{
            id:0,
            add_time:"",
            title:"",
            picture :"",
            content:"",
            tuijian:[],
            firstimg:"",
            endimg:""
        }
    },
    watch:{
        "$route.params.id"(){
            this.title="";
            this.tuijian=[];
            this.update();
        }
    },
    methods:{
        update(){
            this.id= this.$route.params.id;
            var cmd=this.$route.query.cmd||"Bssong/storyDetail";
//          if(this.this.$route.name)
if(this.$route.path.indexOf("/Praise/Story1/")==0){
	cmd="Bssong/index";	
}
            this.$api(cmd,{id:this.id}).then(data=>{
                Object.assign(this.$data,data);
            });
        }
    }
    }
</script>