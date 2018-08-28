<template>
    <div class="fbjbox">
        <div class="fbjbox1">
            <headBar />
        </div>
        <div class="fbjbox2">
            <pull up="true" down="true" @up="next" @down="shuaxin">
                <imgitem :src="headpic" />
                <ul class="mui-table-view list clear">
                    <li class="mui-table-view-cell mui-media" v-for="db in list">
                        <a href="javascript:void(0);" v-href="config.url+db.id">
                            <img class="mui-media-object mui-pull-left" v-bind:src="db.picture">
                            <div class="mui-media-body">
                                {{db.title}}
                                <p class='mui-ellipsis'>{{db.digest}}</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="mui-loading" v-if="list==null">
                    <div class="mui-spinner"></div>
                    <h6 class="mui-text-center">加载中</h6>
                </div>
                <div class="no-content" v-if="list&&list.length==0">
                    <i></i>
                    <h4>暂无内容</h4>
                </div>
            </pull>
        </div>
    </div>
</template>
<style scoped>
    .mui-table-view .mui-media-object { line-height: 55px; max-width: 55px; height: 55px; }
    .mui-table-view-cell > a:not(.mui-btn) { white-space: inherit; font-size: 14px; font-family: "微软雅黑"; line-height: 17px; }
    .mui-ellipsis { margin-top: 5px; }
</style>
<script>
    import { mapGetters, mapState, mapMutations, mapActions } from "vuex"
    import headBar from '../public/headBar'
    import pull from '../public/pull'
    import imgitem from '../public/imgitem'
    export default {
        created() {
            this.config = ({
            	 "乔布斯传": {
                    cmd: "Bssong/those_index",  // xlz接口的地址
                    url: "/Praise/Story1/"
                },
                "那些故事": {
                    cmd: "Bssong/story",
                    url: "/Praise/Story/"
                },
                "有些经典": {
                    cmd: "Bssong/classics",
                    url: "/Praise/Classic/"
                },
            })[this.$route.name];

            this.$api("Bssong/headpic", {}, 10).then(db => {
                this.headpic = db;
            });
        },
        mounted() {
            this.shuaxin(() => { });
        },
        components: { headBar, pull, imgitem },
        data() {
            return {
                list: null,
                config: null,
                headpic: null
            }
        },
        methods: {
            shuaxin(done) {
                this.$api(this.config.cmd, { page: 0 }).then(list => {
                    this.list = list.newArr;
                    this.headpic = list.head;
                    done();
                });
            },
            next(done) {
                var page = this.list.length;
                this.$api(this.config.cmd, { page }).then(list => {
                    if ((list.newArr||[]).length == 0) return done(true);
                    this.list = this.list.concat(list.newArr);
                    done();
                });
            }
        }
    }
</script>