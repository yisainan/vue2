<template>
    <div>
        <headBar />
        <template v-if="db!=null">
            <imgitem :src="db.friend" href="/Bssay/Friend" :title="'朋友和朋友' | title" top="0" />
            <imgitem :src="db.pass" href="/Bssay/passShare" :title="'社群领袖商学院' | title" />
            <imgitem :src="db.mala" href="/Bssay/lifeMalaList" :title="'生活马拉松' | title" />
            <div class="yqxtsdkn"></div>
        </template>
    </div>
</template>
<style scoped>
    .item {
        margin-top: 2px;
    }
</style>
<script>
    import headBar from '../public/headBar'
    import swiper from '../public/swiper'
    import imgitem from '../public/imgitem'
    export default {
        created() {
            this.height = window.innerWidth * 30 / 64;
        },
        mounted() {
            this.$api("Bssay/index", {}).then(obj => {
                this.db = obj;
            });
        },
        components: { headBar, swiper, imgitem },
        data() {
            return {
                height: 0,
                db: null
            }
        }
    }

</script>