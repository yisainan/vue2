<template>
    <div v-if="list&&list.length>0" class="page">
        <h5>推荐阅读</h5>
        <!--<div class="item" v-for="db in list" @tap="link(db)" v-lazy:background-image="db.picture" v-bind:style="{height:height+'px'}">
            <p class="title">{{db.title}}</p>
        </div>-->
        <ul class="mui-table-view list">
            <li class="mui-table-view-cell mui-media" v-for="db in list">
                <a href="javascript:void(0)" @tap="link(db)">
                    <img class="mui-media-object mui-pull-left" v-bind:src="db.picture">
                    <div class="mui-media-body">
                        {{db.title}}
                        <p class='mui-ellipsis'>{{classname(db)}}</p>
                    </div>
                </a>
            </li>
        </ul>
        <div class="clear"></div>
    </div>
</template>
<style scoped>
    .page { margin-top: 10px; }
    h5 { color: #58b1f3; margin: 0; padding: 5px 0 5px 10px; border-left: 3px solid; }
    /*.item { margin-top: 6px; position: relative; float: left; width: 92%; margin-left: 4%; background-size: cover; background-position: center; }
        .item .title { width: 100%; position: absolute; bottom: 0; clear: both; background: rgba(11, 46, 76,.8); margin: 0; text-align: center; color: #eee; overflow: hidden; height: 21px; }*/
    .mui-table-view .mui-media-object { line-height: 55px; max-width: 55px; height: 55px; }
    .mui-table-view-cell > a:not(.mui-btn) { white-space: inherit; font-size: 14px; font-family: "微软雅黑"; line-height: 17px; }
    .mui-ellipsis { margin-top: 5px; color:#454040;position:absolute;bottom:10px;font-size:12px;}
</style>
<script>
    const getcmdby3=function(db){
        var cmd="";
        switch (~~db.friend) {
            case 1:cmd="Bssay/friendDetail"; break;
            case 2:cmd="Bssay/malaDetail"; break;
            case 3:cmd="Bssay/passShareDetail"; break;
        }
        return cmd;
    };
export default {
    created(){
        this.height=window.innerWidth*15/64;
    },
    data(){
        return {height:0}
    },
    props:["list"],
    methods:{
        classname(db){
            switch (~~db.f_id) {
                case 1:return "那些故事";
                case 2:return "有些经典";
                case 3:return "盟友道";
                case 4:return "布斯有道";
                case 5:return "乔布斯传";
            }
            return "";
        },
            link(db){
                //m_id   :分类的id (1那些故事 2那些经典 3盟友道  4不是有道)
                //friend :盟友道分类的子分类(只有当m_id返回3的时候在处理),1朋友和朋友 2生活马拉松 3密码思想汇
                var cmd="";
                var path= (db.not!="1"?"/Praise/Story/":"/Praise/Classic/")+db.w_id;
                switch (~~db.f_id) {
                    case 1:path="/Praise/Story/"+db.w_id; break;
                    case 2:path="/Praise/Classic/"+db.w_id; break;
                    case 3:cmd=getcmdby3(db); break;
                    case 4:cmd="Bsyoudao/newDetail"; break;
		    case 5:cmd="Bssong/index";break;
                }
                //console.log(db.m_id,db.friend);
                //console.log(cmd);
                this.$router.push({path,query:{cmd}});
                }
                }
                }
</script>