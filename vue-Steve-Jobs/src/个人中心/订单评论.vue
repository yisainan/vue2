<template>
    <div class="page">
        <div style="background-color:#fff;">
            <img v-bind:src="$route.query.img" style="width:70px;height:70px;position: absolute;left:15px;top:15px;margin-right:10px;" />
            <textarea rows="5" class="form-control" placeholder="亲！请留下你的评价哦！" v-model="content"></textarea>
            <div class="mui-row mui-col-xs-12" id="kind">
                <div class="mui-col-xs-4" @tap="etype=1" ><img v-bind:src="'img/pl/h'+(etype==1?'1':'0')+'.png'" /><label>好评</label></div>
                <div class="mui-col-xs-4" @tap="etype=2"><img v-bind:src="'img/pl/z'+(etype==2?'1':'0')+'.png'" /><label>中评</label></div>
                <div class="mui-col-xs-4" @tap="etype=3"><img v-bind:src="'img/pl/c'+(etype==3?'1':'0')+'.png'" /><label>差评</label></div>
            </div>
        </div>
        <nav class="mui-bar mui-bar-tab">
            <button type="button" class="button mui-pull-right" @tap="submit">提交</button>
        </nav>
    </div>
</template>
<style scoped>
    .bar { display: none; }
    .page { font-family: "微软雅黑"; font-size: 15px; }
    textarea { border: none; padding-left: 100px; padding-top: 15px; }
    .mui-bar-tab .button { display: inline-block; line-height: 40px; background-color: #0B2E4C; color: #fff; width: 130px; text-align: center; border: none; border-radius: 0px; }
    #kind { text-align: center; padding: 10px 0px; border-top: 1px solid #eee; }
        #kind img { width: 25px; height: 25px; vertical-align: middle; margin-right: 3px;}
</style>
<script>
export default {
    mounted(){
        this.order_id=this.$route.params.id;
    },
    data(){
        return{
            order_id:0,
            content:"",
            etype:1
        }
    },
    methods:{
        submit(){
            this.$api("Member/evaluateinfo",this.$data).then(db=>{
                mui.back();
            });
        }
    }
    }
</script>