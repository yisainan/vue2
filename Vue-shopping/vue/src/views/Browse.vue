<template>
    <!-- 最近浏览 -->
    <div class="browse-warp">
        <van-nav-bar
                title="最近浏览"
                left-arrow
                @click-left="back"
            />
        <Scroll :data='browse' class="scroll">
            <div>
                <GoodsList :list='browse' :isBrowse='true' @close='close'/>
            </div>
            <div v-if="!browse.length" class="null">
                暂无最近浏览~~
            </div>
        </Scroll>
        <router-view/>
    </div>
</template>

<script>
import Scroll from 'public/Scroll'
import GoodsList from 'public/GoodsList'
import {vuexData} from 'js/mixin'
export default {
    name: 'Browse',
    mixins: [vuexData],
    components: {
        Scroll,
        GoodsList,
    },

    methods: {
        close(item) {
            this.deleteOne(item.id)
        },
      
    }
}
</script>

<style lang="stylus" scoped>
.browse-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #fff
    .scroll
        position fixed
        top 40px
        bottom 0px
        left 0
        right 0
        overflow hidden
        

</style>

