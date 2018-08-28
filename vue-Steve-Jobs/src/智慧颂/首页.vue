<template>
    <div>
        <headBar absolute="true" />
        <div class="clear"></div>
        <div class="list" v-if="list.length>0">
            <!--<img v-href="{path:'/Praise/Story/youdao'}" v-bind:src="list[0].url" />-->
            <img class="mt1" v-href="{name:'乔布斯传'}" v-bind:src="list[0].url" />
            <img class="mt1" v-href="{name:'那些故事'}" v-bind:src="list[1].url"/>
            <img class="mt1" v-href="{name:'有些经典'}"  v-bind:src="list[2].url"/>
            <div class="yqxtsdkn"></div>
        </div>
    </div>
</template>
<style scoped>
    .list { float:left; }
    .list img { width: 100%;float:left; clear:both;}
    .mt1 { margin-top: 2px; }
</style>
<script>
import headBar from '../public/headBar'
export default {
    mounted(){
    	
        this.$api("Bssong/headpic",{},-10).then(db=>{
            this.list=db;
        });
    },
    components: {headBar},
    data(){
        return{
            list:[]
        }
    },
    }
</script>