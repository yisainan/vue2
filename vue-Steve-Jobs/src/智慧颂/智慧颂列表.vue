<template>
    <div class="fbjbox">
        <div class="fbjbox1">
            <headBar />
        </div>
        <div class="fbjbox2">
            <pull up="true" down="true" @up="next" @down="shuaxin">
                <imgitem title="智慧颂" :src="friend" />
                <!--<div class="cates">
                    <div class="mui-slider" v-mui="'slider'">
                        <div class="mui-slider-group">
                            <a class="mui-slider-item" v-bind:class="{on:0==selectcates.id}" @tap="selectcates={id:0}">全部</a>
                            <a class="mui-slider-item" v-bind:class="{on:n.id==selectcates.id}" v-for="n in cates" @tap="selectcates=n" v-html="n.name"></a>
                        </div>
                    </div>
                </div>-->
                <ul class="mui-table-view list clear">
                    <li class="mui-table-view-cell mui-media" v-for="db in news">
                        <a href="javascript:void(0);" v-href="'/Praise/Story1/'+db.id">
                            <img class="mui-media-object mui-pull-left" v-bind:src="db.picture">
                            <div class="mui-media-body">
                                {{db.title}}
                                <p class='mui-ellipsis'>{{db.digest}}</p>
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
    import comm from '../common/comm'
    import imgitem from '../public/imgitem'
    export default {
        mounted() {
            comm.updateTitle("智慧颂");
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
                this.$api("Bssong/those_index", { page: 0, cate_id: this.selectcates.id }).then(obj => {
                    //Object.assign(this.$data,obj);
                    this.friend = obj.head;
                    this.cates = (obj.cateArr || []).map(a => { return { id: a.tid, name: a.tname } });
                    this.news = obj.newArr;
                    if (this.news == null) this.news = [];
                    done && done();
                })
            },
            next(done) {
                var page = (this.news || []).length;
                // this.$api("Bssay/sh_cate",{page,cate_id:this.selectcates.id}).then(db=>{
                //     var news=db||[];
                //     if(news.length==0)return done(true);
                //     this.news=this.news.concat(news);
                //     done();
                // });

                this.$api("Bssong/those_index", { page, cate_id: this.selectcates.id }).then(obj => {
                    //Object.assign(this.$data,obj);
                    this.news = this.news.concat(obj.newArr);
                    done && done();
                })
            }
        },
        watch: {
            "selectcates"(db) {
                this.shuaxin();
            }
        }
    }

</script>