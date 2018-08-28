<template>
    <div class="fbjbox">
        <div class="fbjbox1">
            <headBar />
        </div>
        <div class="fbjbox2">
            <pull up="true" down="true" @up="next" @down="shuaxin">
                <imgitem title="朋友和朋友" :src="friend" />
                <div class="cates">
                    <div class="mui-slider" v-mui="'slider'">
                        <div class="mui-slider-group">
                            <a class="mui-slider-item" v-bind:class="{on:0==selectcates.id}" @tap="selectcates={id:0}">全部</a>
                            <a class="mui-slider-item" v-bind:class="{on:n.id==selectcates.id}" v-for="n in cates" @tap="selectcates=n" v-html="n.name"></a>
                        </div>
                    </div>
                </div>
                <ul class="mui-table-view list">
                    <li class="mui-table-view-cell mui-media" v-for="db in news" @tap="link(db)">
                        <a>
                            <img class="mui-media-object mui-pull-left" v-bind:src="db.posters" v-imgdef>
                            <div class="mui-media-body">
                                <h4>{{'朋友和朋友' | title}} <span class="stage">第{{db.stage}}期</span></h4>
                                {{db.title}}
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="mui-loading" v-if="news==null" style="padding-top:10px;">
                    <div class="mui-spinner"></div>
                    <h6 class="mui-text-center">加载中</h6>
                </div>
                <div class="no-content" v-if="news&&news.length==0">
                    <img src="img/nodata.png">
                    <h4>暂无内容</h4>
                </div>
                <!--<div class="yqxtsdkn"></div>-->
            </pull>
        </div>
    </div>
</template>
<style scoped>
    .cates {
        margin: 8px 0 10px 8px;
    }
    
    .cates a.mui-slider-item {
        width: auto;
        text-align: center;
        display: inline-block;
        padding: 0px 10px;
        margin-top: 8px;
        font-size: 15px;
        color: #666465;
    }
    
    .cates a:not(:first-child) {
        border-left: 1px solid #CFCFCF;
    }
    
    .cates a.on {
        color: #3C5870;
    }
    
    .fbjbox2 {
        background: #EBEBEB;
    }
    /*100*60*/
    
    .stage {
        color: #030303;
        font-size: 12px;
    }
    
    .list h4 {
        color: #082E53;
    }
    
    .no-content img {
        width: 30%
    }
    
    .no-content h4 {
        font-family: "微软雅黑";
        margin-top: 0px;
        font-size: 16px;
    }
    
    .mui-table-view .mui-media-object {
        line-height: 60px;
        max-width: 100px;
        height: 60px;
    }
    
    .mui-table-view-cell>a:not(.mui-btn) {
        white-space: inherit;
        font-size: 14px;
        font-family: "微软雅黑";
        line-height: 17px;
    }
    
    .mui-ellipsis {
        margin-top: 5px;
    }
</style>
<script>
    import headBar from '../public/headBar'
    import swiper from '../public/swiper'
    import pull from '../public/pull'
    import imgitem from '../public/imgitem'
    export default {
        mounted() {
            this.shuaxin();
        },
        components: { headBar, swiper, pull, imgitem },
        data() {
            return {
                friend: null,
                cates: [],
                news: null,
                selectcates: { id: 0 }
            }
        },
        methods: {
            link(db) {
                var path = (db.not == "0" ? "/Praise/Story/" : "/Praise/Classic/") + db.id;
                this.$router.push({ path, query: { cmd: "Bssay/friendDetail" } });
                //if(db.not=="0"){
                //    this.$router.push({path:"/Praise/Story/"+db.id,query:{cmd:"Bssay/friendDetail"}});
                //}else{
                //    this.$router.push({path:"/Praise/Classic/"+db.id,query:{cmd:"Bssay/friendDetail"}});
                //}
            },
            shuaxin(done) {
                this.$api("Bssay/friend", { page: 0, cate_id: this.selectcates.id }).then(obj => {
                    Object.assign(this.$data, obj);
                    if (this.news == null) this.news = [];
                    done && done();
                })
            },
            next(done) {
                var page = (this.news || []).length;
                this.$api("Bssay/sh_cate", { page, cate_id: this.selectcates.id }).then(db => {
                    var news = db || [];
                    if (news.length == 0) return done(true);
                    this.news = this.news.concat(news);
                    done();
                });
            }
        },
        watch: {
            "selectcates"(db) {
                this.shuaxin();
            }
        }
    }

</script>