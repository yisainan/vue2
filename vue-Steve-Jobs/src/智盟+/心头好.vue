<template>
    <div class="fbjbox">
        <div class="fbjbox1">
            <headBar />
        </div>
        <div class="fbjbox2">
            <pull up="true" down="true" @up="next" @down="shuaxin">
                <swiper v-bind:list="header" hidetitle="true" @link="link" />
                <div class="item" v-for="item in list" @tap="link({id:item.goods_id})">
                    <img v-bind:src="item.goods_image" />
                </div>
                <div class="no-content" v-if="list&&list.length==0">
                    <h4>暂无内容</h4>
                </div>
            </pull>
            <!--<div class="yqxtsdkn"></div>-->
        </div>
    </div>
</template>
<style scoped>
    .item { margin-top: 2px; position: relative; float: left; }
        .item img { width: 100%; margin-top: 1px; height: 100%; float: left; }
</style>
<script>
    import headBar from './headBar.vue'
    import swiper from '../public/swiper'
    import pull from '../public/pull'
    export default {
        mounted() {
            this.shuaxin();
        },
        components: { headBar, swiper, pull },
        data() {
            return {
                header: [],
                list: []
            }
        },
        methods: {
            shuaxin(done) {
                this.getpage(0, (db) => {
                    this.list = db;
                    done && done(db.length < 5);
                });
            },
            next(done) {
                this.getpage((this.list || []).length, (db) => {
                    this.list.push(db);
                    done && done(db.length < 5);
                });
            },
            getpage(page, done) {
                this.$api("Bsfamily/heartGood", { page }).then(obj => {
                    if (page == 0) {
                        this.header = (obj.goods || []).map(a => {
                            return {
                                id: a.goods_id,
                                posters: a.goods_image, s_title: ""
                            }
                        });
                    }
                    done(obj.second || []);
                })
            },
            link(db) {
                this.$router.push({ name: '商品详情', params: { id: db.id, uid: localStorage.getItem('uid') } });
            }
        }
    }
</script>