<template>
    <div class="swiper">
        <van-row>
            <van-swipe :autoplay="6000">
                <van-swipe-item v-for="val of slides" :key="val.goodsId">
                    <img :src="val.image" class="swiper-img"/>
                </van-swipe-item>
            </van-swipe>
        </van-row>    
    </div>
</template>

<script>
export default {
    props: {
        slides: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang='less' scoped>
    .swiper {
        height: 0;
        padding-bottom: 53.33%;
        overflow: hidden;
    }
    .swiper-img {
        width: 100%;
        height: 200px;
    }
</style>
