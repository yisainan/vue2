<template>
    <!-- 我的订单列表 -->
    <div class="order-warp">
        <van-nav-bar
        title="我的订单"
        left-arrow
        @click-left="back"
      />
        <van-tabs v-model="currentActive" @change='change'>
            <van-tab :title="val" v-for="(val,index) in tabs" :key="index">
                <Scroll v-show="!showFlag" :data='list' ref="scroll" class="scroll">
                    <div class="wap">
                        <div v-for="value in list" :key="value.order_id" > 
                            <div v-if="value.status==currentActive"  class="list-warp" >
                                <div class='top border-bottom'>
                                    <div>订单编号: {{value.order_id}}</div>
                                    <div class="order-ok">{{status(value.status)}}</div>
                                </div>
                                <div class="list" v-for="val in value.order_list" :key="val._id">
                                    <img class="good-img" :src="val.image_path" :onerror="defaultImg">
                                    <div class="good-title">{{val.name}}</div>
                                    <div class="good-count">
                                        <p>￥{{val.mallPrice}}</p>
                                        <p class="count">x{{val.count}}</p>
                                    </div>
                                </div>
                                <div class="timre bottom border-top">创建时间: {{value.add_time}}</div>
                                <div class="bottom">收货地址: {{value.address}}</div>
                                <div class="bottom">共 {{value.order_list.length}} 件商品   合计: {{value.mallPrice}}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!list.length && !showFlag" class="null">
                        {{userName&&!showFlag? '暂无订单~~' : '请先登录噢~~'}}
                    </div>
                </Scroll>
            </van-tab>
        </van-tabs>
         <BaseLoding :showFlag='showFlag'/>
    </div>
</template>

<script>
import Scroll from 'public/Scroll'
import {vuexData} from 'js/mixin'
export default {
    name: 'MyOarder',
    mixins: [vuexData],
    data() {
        return {
            currentActive: 0,
            list: '',
            defaultImg: 'this.src="' + require('img/vue.jpg') + '"',
            tabs:['全部','待支付','待发货','待收货','已完成'],
        }
    },
    components: {
        Scroll
    },

    methods: {
        change(i) {
            this.currentActive = i
        },
     
        status(status) {
            if (status == 1) {
                return '待支付'
            } else if(status == 2) {
                return '待发货'
            } else if(status == 3) {
                return '待收货'
            }else if(status == 5){
                return '已完成'
            }
        },
        async getMyOrder() {
            try {
                this.showFlag = true
                const {data} = await this.Api.getMyOrder()
                if (data.code == 200) {
                    this.showFlag = false
                    this.list = data.list
                } else {
                    this.showFlag = false
                }
            } catch (error) {
                this.$toast('网络错误')
                this.showFlag = false
            }
        }
    },

    created() {
        let status = this.$route.query.status
        if (status) {
            this.currentActive = status
            
        } 
        this.getMyOrder()
    },
}
</script>

<style lang="stylus" scoped>
.order-warp
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 500
    background #Fff
    .scroll
        position fixed
        top 84px
        bottom 0px
        left 0
        right 0
        overflow hidden
        background #F2F2F2
        .wap
            padding 5px 0
            .list-warp
                margin 10px
                box-sizing border-box
                padding 15px 10px
                background #fff
                border-radius 10px
                .top
                    display flex
                    justify-content space-between
                    padding-bottom 10px
                    .order-ok
                        color #D2591B
                .list
                    display flex    
                    height 80px
                    margin-top 15px
                    font-size 0
                    .good-img
                        flex 0 0 80px
                        width 80px
                        height 100%
                        border-radius 10px
                        margin-right 10px
                        border 1px solid #eee
                    .good-title
                        flex 1
                        margin-top 3px
                        line-height 1.4
                        font-size 13px
                        letter-spacing 0.5px
                        margin-right 10px
                    .good-count
                        float 0 0 15%     
                        text-align right   
                        margin-top 5px
                        font-size 13px
                        .count
                            margin-top 5px
                            color #bbb
                .bottom
                    text-align right      
                    margin-top 10px    
                .timre
                    margin-top 10px
                    padding-top 10px
</style>

