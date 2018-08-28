<template>
    <div >
        <div class="mui-fullscreen content" @scroll="slider" style="bottom: 50px">
            <headBar/>
            <swiper v-bind:list="list" :height="height" />
            <div class="Price">¥{{Price | f2}}</div>
            <tab class="pinned" ref='tab' :list="['项目详情','报名相关','参赛标准']" width="33%" @change='tabchange' />
             <tab  ref='tab' :list="['项目详情','报名相关','参赛标准']" width="33%" @change='tabchange' />
            <div v-if="tab==0" v-html="description" class="article"></div>
            <div v-if="tab==1" v-html="apply" class="article"></div>
            <div v-if="tab==2" v-html="entry" class="article" ></div>
        </div>
        <nav class="mui-fullscreen btnx3" v-if="ftype==0">
            <button v-if="!is_zc" class="mui-btn active" v-href="{name:'发布项目',params:{id:$route.params.id}}">我要众筹</button>
            <button v-if="is_zc" class="mui-btn active" v-href="{name:'TA的众筹',params:{uid:uid,id:$route.params.id}}">我的众筹</button>
            <button class="mui-btn" @tap="sharebox=true">分享给朋友</button>
        </nav>
        <nav class="mui-fullscreen btnx1" v-if="ftype==1">
            <button class="mui-btn mui-btn-success">众筹成功</button>
        </nav>
        <nav class="mui-fullscreen btnx1" v-if="ftype==2">
            <button class="mui-btn" disabled="disabled">众筹失败</button>
        </nav>
        <div class="mui-fullscreen sharebox" v-if="sharebox" @tap="sharebox=false" style="background-image: url(img/ZC/share1.png);z-index: 33;"></div>
    </div>
</template>
<style scoped>
    .Price {
        color: #D80307;
        padding: 10px 0 10px 20px;
        border-bottom: 1px solid #ccc
    }
    
    .content {
        overflow: auto;
        bottom: 50px
    }
    .article section,.article p{width:95%;margin:0 auto;display: inline-block;}
    
    nav.btnx1,
    nav.btnx3 {
        height: 50px;
        top: inherit;
        text-align: center
    }
    
    nav.btnx1 .mui-btn,
    nav.btnx3 .mui-btn {
        width: 45%;
        margin: 8px 2px 0 2px;
        border-radius: 6px;
        font-size: 14px;
        height: 36px
    }
    
    nav.btnx1 .mui-btn {
        width: 90%;
    }
    
    nav.btnx3 .mui-btn.active {
        background: #7BA4C4;
        border: none;
        color: #fff;
    }
    
    .sharebox {
        background-size: cover;
    }
 /*tab位置固定*/   
  .pinned{position:fixed;top:0px;background-color:#EFEFF4;z-index:222;width:100%;}

</style>
<script>
    import headBar from './headBar'
    import cache from "../common/cache"
    import tab from './tab'
    import comm from '../common/comm'
    import imgitem from '../public/imgitem'
    import swiper from '../public/swiper'
    import wxapi from '../common/wxapi'
    export default {
        created() {
            this.height = window.innerWidth * 40 / 64;
            this.is_zc = this.$route.query.is_zc == 1;
            this.uid = localStorage.getItem('uid');
        },
        mounted() {
            this.$api("Zhongchou/zcdetail", { fid: this.$route.params.id }, -10).then(db => {
                this.ftype = db.ftype;
                this.Price = db.apply_amount;
                var title = db.project_name;
                comm.updateTitle(title);
                this.description = db.description;
                this.apply = db.apply;
                this.entry = db.entry;
                var list = [];
                for (var k in db.main_map) list.push({ posters: db.main_map[k], s_title: title });
                this.list = list;
                cache.set("当前众筹", { project_name: db.project_name, fid: this.$route.params.id, posters: list.length > 0 && list[0].posters });
                wxapi.showMenuItems(db.project_name, list.length > 0 && list[0].posters, this.$route.params.id, localStorage.getItem('uid'), 5);
            });
      
		  
		  
        },
        components: { headBar, imgitem, tab, swiper },
        data() {
            return {
                sharebox: false,
                tab: 0,//
                Price: 0,
                height: 0,
                list: [
                    // { posters: "//placekitten.com/g/400/150", s_title: "1111111111111" },
                ],
                description: "",
                apply: "",
                entry: "",
                is_zc: 0,
                ftype: 0,
                uid: 0
            }
        },
        // computed: {

        // },
        // watch: {

        // },
        methods: {
        	slider(e){
        		if(e.type=="scroll"){
        			console.log(e.srcElement.scrollTop)
        		   if(e.srcElement.scrollTop>300){
        		   	   //alert(1)
        		   	 $(".pinned").show();
        		    }
        		   else{$(".pinned").hide();}
        		
        		}
        		
        	},
            tabchange({index, data}) {
                this.tab = index;
            }
        }
    }

</script>