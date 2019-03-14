<template>
    <!-- 订单结算和选择商品页面 -->
    <div class="order">
        <van-nav-bar
                title="订单结算"
                left-arrow
                @click-left="goBack"
        />
                <div class="address-warp">
                    <div class="address addnull" v-if="!defaultAdd || !defaultAdd._id && (!temporaryAddress || !temporaryAddress._id)" @click="goAddress">
                        点击添加收获地址
                    </div>
                    <div class="address" v-else @click="editAddress">
                        <div class="icon"><van-icon name="location" class="location"/></div>
                        <div class="address-cont">
                            <p class="name">收货人: {{temporaryAddress.name || defaultAdd.name}} <span>{{temporaryAddress.tel || defaultAdd.tel}}</span></p>
                            <p class="address-e">收货地址: {{temporaryAddress.address || defaultAdd.address}}</p>
                            <p class="no">(收货不便时,可选择免费待收货服务)</p>
                        </div>
                        <div class="icon2"><van-icon name="arrow" class="location"/></div>
                    </div>
                    <img :src="caitiao" width="100%" height="3px" alt="" class="caitiao">
                <Scroll :data='shopOrderList' ref="scroll" class="scroll">
                    <div class="goods-list">
                        <GoodsList :list='shopOrderList' :isOrder='true'/>
                    </div>
                </Scroll>
            </div>
        
        <div v-if="shopOrderList && shopOrderList.length">
            <van-submit-bar
                :loading='isLoading'
                :price="price"
                button-text="提交订单"
                @submit="onSubmit"
            />
        </div>
    </div>
</template>

<script>
import GoodsList from 'public/GoodsList'
import {vuexData} from 'js/mixin'
import Scroll from 'public/Scroll'
export default {
    name: "ShoppingPayMent",
    mixins:[vuexData],
    components: {
        GoodsList,
        Scroll,
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getDefaultAddress()
            if (!vm.shopOrderList.length) {
                vm.$router.push({name:'ShoppingCart'})
                
            }
        })
        
    },
    computed: {
        price() {
            let num = 0
            if (this.shopOrderList.length) {
                    this.shopOrderList.forEach( item => {
                    num += item.present_price * item.count
                })
                return Number( num.toFixed(2) * 100)
            }
        }
    },

    data() {
        return {
            caitiao: require('img/caitiao.jpg'),
            isLoading: false,
            list: [],
            defaultAdd:''
        }
    },


    methods: {
        // 查询默认收货地址
        async getDefaultAddress() {
            try {
                const {data} = await this.Api.getDefaultAddress()
                if (data.code == 200) {
                    this.defaultAdd = data.defaultAdd
                }
            } catch (error) {
                this.$toast('网络错误')
            }
            
        },

        goBack() {
            this.$router.go(-1)
            setTimeout(() => {
                this.setShopList([])
                this.setVuexAddress('')
            }, 300);
        },

        async onSubmit() {
            if (!this.defaultAdd || !this.defaultAdd._id && (!this.temporaryAddress || !this.temporaryAddress._id)) {
                this.$toast('请添加收获地址')
                return
            }
            this.isLoading = true
            // 传地址id，订单id，和总价格
            let Addressid = 123456745;
            let orderId = []
            console.log(this.shopOrderList);
            
            this.shopOrderList.forEach( item => {
                orderId.push(item.cid)
            })
            
            try {
                const { data } = await this.Api.placeOrder({
                    address:  this.temporaryAddress.address || this.defaultAdd.address,
                    tel: this.temporaryAddress.tel || this.defaultAdd.tel,
                    orderId,
                    totalPrice: (this.price / 100).toFixed(2),
                    idDirect: this.shopOrderList[0].idDirect,
                    count: this.shopOrderList[0].count
                })
                if (data.code == 200) {
                    this.isLoading = false
                    this.$toast(data.msg)
                    setTimeout(() => {
                        this.setShopList([])
                        this.$router.push({path: '/'})
                        // location.href = '/'
                    }, 2000);
                }
            } catch (err) {
                this.isLoading = false
                this.$toast('网络错误')
            }
        },


        // 添加收货地址
        goAddress() {
            this.$router.push({name: 'Address'})
        },

        // 选择地址
        editAddress() {
            this.$router.push({name:'Address'})
        }
    }
}
</script>

<style lang="stylus" scoped>
.order
    position fixed
    top 0px
    left 0
    right 0
    bottom 0px
    z-index 500
    background #fff
    .scroll
        position fixed
        top 148px
        bottom 50px
        left 0
        right 0
        overflow hidden
    .address-warp
        .caitiao
            margin-top -10px
        .addnull
            align-items center
            padding 0!important   
            justify-content center
            font-size 14px
        .address
            display flex
            height 90px
            padding 10px
            padding-bottom 0
            background #fff
            .icon
                flex 0 0 30px 
                width 30px
                align-self center
                margin-right 8px
                .location
                    font-size 24px
            .address-cont
                flex 1
                display flex
                flex-direction column
                justify-content space-around    
                .name
                    font-size 15px
                    span 
                        float right 
                        margin-right 10px
                .address-e
                    font-size 12px
                    margin-right 5px
                    line-height 1.4       
                .no
                    color #F9CC9D
                    font-size 12px     
                    letter-spacing 1px
                    margin-top -5px
            .icon2
                flex 0 0 10px
                align-self center 
        .goods-list
            background #fff                   
</style>
