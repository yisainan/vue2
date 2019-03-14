<template>
    <!-- 首页条目组件 -->
    <div class="title" v-show="floorName">
            <span v-show="num">{{num}}F</span>
            {{floorName}}
    </div>
</template>

<script>
export default {
    props:['floorName','num'],
}
</script>

<style lang="stylus" scoped>
    .title
        background #EDEDED
        height 40px
        line-height 40px
        text-align center
        color #e0322b 
        font-size 15px
        position relative
        span 
            position absolute
            top 50%
            margin-left -20px
            transform translateY(-50%)
            background #e0322b
            display inline-block
            border-radius 50%
            width 17px
            height 17px
            line-height 21px
            color #fff
            font-size 12px
</style>

