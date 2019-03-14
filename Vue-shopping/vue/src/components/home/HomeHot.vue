<template>
    <div  v-if="hot">
        <Title v-if="floorName" :floorName='floorName'/>
        <ul>
            <li class="recommend-item" v-for="val of hot" :key="val.goodsId" @click="details(val)">
                <img v-lazy="val.image" class="recommend-img">
                <p class="name">{{val.name}}</p>
                <p class="price"><span class="code">￥</span><span class="mallPrice">{{val.mallPrice}}</span><span class="price-min">{{val.price}}</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
import Title from '@/components/home/Title'
import {vuexData} from 'js/mixin'
export default {
    mixins: [vuexData],
    props:['hot'],
    data () {
        return {
            floorName:'热销商品',
        }
    },
    components: {
        Title
    },
}
</script>

<style lang="stylus" scoped>
@import '~css/mixin.styl';
ul
    display flex
    flex-wrap wrap
    background #eee
    justify-content space-between
    .recommend-item
        flex 0 0 49.9%
        width 50%!important
        margin-right 0!important
        margin-top 1px
        overflow hidden
        text-align center
        background #fff
        padding-bottom 5px
        .recommend-img
            width 80%
        .name
            padding 5px 7.5px 0 7.5px
            color $color
            font-size 14px    
            ellipsis()
        .price
            color $color
            padding-top 5px
            .code
                font-size 13px
            .mallPrice
                font-size 15px    
                color $color
                font-weight 700
            .price-min
                font-size 12px
                text-decoration:line-through
                color #999    
                display inline-block
                margin-left 5px
</style>

