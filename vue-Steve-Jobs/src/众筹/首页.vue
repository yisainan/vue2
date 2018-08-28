<template>
    <div class="page">
        <headBar :title="zctitle" />
        <div class="mui-fullscreen">
            <pull up="true" down="true" @up="next" @down="update">
                <imgitem v-bind:src="m.poster_map" :href="'/CrowdFunding/details'+m.fid+'?is_zc='+m.is_zc" :top="i==0?0:3" v-for="m,i in zclist"
                />
            </pull>
        </div>
    </div>
</template>
<style scoped>
    .mui-fullscreen {
        top: 35px;
        background: #efefef;
    }
</style>
<script>
    import headBar from './headBar'
    import imgitem from '../public/imgitem'
    import pull from '../public/pull'
    export default {
        mounted() {
            this.update();
        },
        components: { headBar, imgitem, pull },
        data() {
            return {
                zctitle: "",
                zclist: []
            }
        },
        computed: {

        },
        watch: {

        },
        methods: {
            update(done) {
                this.next(done, true);
            },
            next(done, update) {
                var page = (this.zclist || []).length;
                if (update) page = 0;
                this.$api("Zhongchou/index", { page }).then((db) => {
                    var news = db.zclist;
                    if (news == null || news.length == 0) return done(true);
                    this.zclist = (this.zclist || []).concat(news);
                    done && done();
                });
            }
        }
    }

</script>