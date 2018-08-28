<template>
    <div>
        <headBar />
        <div class="list" v-if="friend!=null">
            <swiper v-bind:list="bsNews" @link="link" hidetitle="true" />
            <imgitem :src="friend" href="/Bssay/Friend" title="朋友和朋友" />
            <imgitem :src="mmsx" href="/Bssay/passShare" title="密码私享会" />
            <template v-if="goods.length>0">
                <div class="scjx">商城精选</div>
                <swiper v-bind:list="goods" @link="link3" hidetitle="true" />
                <div class="yqxtsdkn"></div>
            </template>
        </div>
    </div>
</template>
<style scoped>
        .item  { margin-top: 2px; }
     .scjx { color: #0B2E4C; text-align:center; font-weight: 700; font-size: 14px; padding-top: 10px; clear: both; }
</style>
<script>
    import headBar from '../public/headBar'
    import swiper from '../public/swiper'
    import imgitem from '../public/imgitem'
    export default {
        mounted() {
            this.$api("Bsyoudao").then(db => {
                this.bsNews = db.bsNews;
                this.friend = db.friend.url;
                this.mmsx=db.mmsx.url;
                this.goods = db.goods.map(a => {
                    return {
                        id: a.goods_id,
                        posters: a.goods_image, s_title: ""
                    }
                });;
            })
        },
        components: { headBar, swiper, imgitem },
        data() {
            return {
                bsNews: [],
                friend: null,
                mmsx:null,
                goods: []
            }
        },
        computed: {
            //...mapGetters(["vip"]),
            //...mapState({
            //_view:s=>s.view,
            //})
        },
        watch: {
        },
        methods: {
            link(db) {
                if (db.wurl != "") {
                    location = db.wurl;
                    return;
                }
                var path = (db.not == "0" ? "/Praise/Story/" : "/Praise/Classic/") + db.id;
                this.$router.push({ path, query: { cmd: "Bsyoudao/newDetail" } });
                //if(db.not=="0"){
                //    this.$router.push({path:"/Praise/Story/"+db.id,query:{cmd:"Bsyoudao/newDetail"}});
                //}else{
                //    this.$router.push({path:"/Praise/Classic/"+db.id,query:{cmd:"Bsyoudao/newDetail"}});
                //}
            },
            link3(db) {
                this.$router.push({ name: '商品详情', params: { id: db.id, uid: localStorage.getItem("uid") } });
            }
            //...mapMutations(["fundddd"]),
            //...mapActions(["fundddd"]),
            //submit(){
            //    this.$swal({
            //        title:"标题",
            //        text:"内容",
            //        confirmButtonText:"确定"
            //    })
            //}
        }
    }
</script>