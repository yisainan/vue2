<template>
    <div class="mui-slider" ref="slider" v-bind:style="{height:_height+'px'}">
        <div class="mui-slider-group mui-slider-loop">
            <div class="mui-slider-item" v-for="db,i in ss" v-bind:class="{'mui-slider-item-duplicate':i==0||i==ss.length-1}" @tap="$emit('link',db)">
                <a>
                    <div class="img" v-bind:style="{height:_height+'px','background-image':'url('+db.posters+')'}" v-if="i==1"></div>
                    <div class="img" v-bind:style="{height:_height+'px'}" v-lazy:background-image="db.posters" v-if="i!=1"></div>
                    <template v-if="!hidetitle">
                        <p class="mui-slider-title"><b>{{title}}</b>{{db.s_title}}</p>
                    </template>
                </a>
            </div>
        </div>
        <div class="mui-slider-indicator" v-bind:class="{'hidetitle':hidetitle }" v-if="ss.length>3">
            <!--v-bind:class="{'titletop':!hidetitle ,'mui-text-right':!hidetitle}"-->
            <div v-bind:class="{'mui-active':i==2,'mui-indicator':true}" v-for="db,i in ss" v-if="i>1"></div>
        </div>
    </div>
</template>
<style scoped>
    .mui-slider { min-height: 100px; }
    /*.title { margin-left: 30px; color: #eee; position: absolute; bottom:34px; font-size: 14px;display:none}*/
    .mui-slider-title { background-color: #0B2E4C; color: #fff; text-align: left; padding-right: 25px; font-size: 12px; color: #ccc; }
        .mui-slider-title b { color: #fff; font-size: 14px; padding-right: 10px; }
    .mui-slider-indicator.hidetitle { bottom: 0px; }
    .mui-slider-indicator { bottom: 28px; }
    .img { background-size:cover;height:100%;}
</style>
<script>
export default {    
    created(){
        this._height=window.innerWidth*30/64;
    },
    mounted(){
        this.update(this.list);
        if(this.height)this._height=this.height
    },
    data(){
        return {
            ss:[],
            _height:0
        }
    },
    props:["list","interval","title","hidetitle","height"],
        watch:{
            list(list){
                this.update(list);
            }
        },
    methods:{
        update(list){
            if(list&&list.length>0){
                var ss=[Object.assign({top:1},list[list.length-1])].concat(list);
                ss.push(Object.assign({top:2},list[0]));
                this.ss=ss;
                ss.length>1&&this.$nextTick(()=>{
                    mui(this.$refs.slider).slider({interval:this.interval||5000});
                })
            }
        }
    }
    }
</script>