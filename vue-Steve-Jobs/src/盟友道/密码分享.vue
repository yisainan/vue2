<template>
    <div class="fbjbox">
        <div class="fbjbox1">
            <headBar />
        </div>
        <div class="fbjbox2">
            <pull up="true" down="true" @up="next" @down="update">
                <swiper v-bind:list="header" v-bind:title="'朋友和朋友'" hidetitle="true" />
                <!--@link="link" -->
                <div class="cbox">
                    <div class="baoming" v-href="'http://ybswx.yunliplus.com/index.php/Extension/introduce?did='+id">{{btitle}}</div>

                    <h5 style="font-family: 宋体;margin: 15px">往期回顾</h5>
                </div>
                <div class="mui-row">
                    <template v-for="db,i in list">
                        <hr v-if="i%2==0" />
                        <div class="mui-col-xs-6">
                            <div class="mui-card" @tap="link(db)">
                                <div class="mui-card-header mui-card-media" style="height:40vw;" v-bind:style="{'background-image':'url('+db.posters+')'}"></div>
                                <h5>{{db.s_title}}</h5>
                            </div>
                        </div>
                    </template>
                    <div class="no-content" v-if="list==null||list==[]" style="padding-top:10px;">
                        <i></i>
                        <h4>暂无内容</h4>
                    </div>
                </div>
            </pull>
        </div>
    </div>
</template>
<style scoped>
    .cbox {
        text-align: center;
    }
    
    .fbjbox2 {
        background: #fff
    }
    
    h5 {
        color: #3D5572;
        font-weight: 700;
        margin: 10px 0 3px 0;
    }
    /*p.info { font-family: "微软雅黑"; color: #444; }*/
    
    .baoming {
        margin: 0px;
        height: 30px;
        color: #fff;
        font-size: 12px;
        line-height: 30px;
        background-color: #71A1C5;
    }
    
    .mui-card h5 {
        background: #EFEFEF;
        padding: 10px;
        margin: 0px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    hr {
        margin: 0 10px;
        border: none;
        border-top: 1px solid #E6E6E6;
        clear: both;
    }
    /*.baoming {text-decoration:underline;color:blue;display:block;margin-top:10px; }*/
</style>
<script>
    import { mapGetters, mapState, mapMutations, mapActions } from "vuex"
    import headBar from '../public/headBar'
    import swiper from '../public/swiper'
    import pull from '../public/pull'
    export default {
        mounted() {
            this.update();
        },
        components: { headBar, swiper, pull },
        data() {
            return {
                header: [],
                list: [],
                btitle: "",
                id: 0
            }
        },
        methods: {
            //      	链接点击跳转
            link(db) {
                var path = (db.not == "0" ? "/Praise/Story/" : "/Praise/Classic/") + db.id;
                this.$router.push({ path, query: { cmd: "Bssay/passShareDetail" } });
                //if(db.not=="0"){
                //    this.$router.push({path:"/Praise/Story/"+db.id,query:{cmd:"Bssay/passShareDetail"}});
                //}else{
                //    this.$router.push({path:"/Praise/Classic/"+db.id,query:{cmd:"Bssay/passShareDetail"}});
                //}
            },
            update(done) {
                this.$api("Bssay/passShare", { page: 0 }).then(obj => {
                    Object.assign(this.$data, obj);
                    done && done();
                    this.id = obj.id
                    // console.log(obj.id)
                })
            },
            next(done) {
                var page = (this.list || []).length;
                this.$api("Bssay/clickFlush", { page }).then(news => {
                    if (news == null || news.length == 0) return done(true);

                    this.list = (this.list || []).concat(news);
                    done();
                }
                );
            }
        }
    }

</script>