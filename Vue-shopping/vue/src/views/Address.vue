<template>
        <div class="address">
        <van-nav-bar
            title="地址列表"
            left-arrow
            @click-left="back"
        />
            <Scroll :data='list' class="scroll"  v-show="!showFlag">
                <div>
                    <van-address-list
                        v-model="chosenAddressId"
                        :list="list"
                        @edit="onEdit"
                        @select='onSelect'
                    />
                </div>
                 <div v-if="!list || !list.length" class="nolist">
                    暂无收货地址~~
                </div>
            </Scroll>
        <div class="add" @click="onAdd">新增地址</div>
        <BaseLoding :showFlag='showFlag'/>
        </div>
</template>

<script>
import Scroll from 'public/Scroll'
import {vuexData} from 'js/mixin'
export default {
    name: 'Address',
    mixins: [vuexData],
    components: {
        Scroll,
    },

    data() {
        return {
            chosenAddressId: '1',
            list: [],
            isPay: false,
        }
    },

    methods: {
        onAdd() {
            this.$router.push({name: 'AddressEdit'})
        },

        onEdit(item, index) {
            this.setAddress(item)
            this.$router.push({name: 'AddressEdit'})
        },

        async setDefaultAddress(id) {
            try {
                const {data} = await this.Api.setDefaultAddress(id)
                if (data.code == 200) {
                    this.$toast('设置默认地址成功')
                }
            } catch (error) {
                this.$toast('网络错误')
            }
            
        },

        onSelect(item) {
            if (this.isPay) {   // 判断是不是从订单页面过来的
                this.setAddress2(item)
                setTimeout(() => {
                    this.$router.go(-1)
                }, 500);
            } else {
                // 选中设置默认地址
                this.setDefaultAddress(item._id)                
            }
        },
    },

 
    async created() {
        // 查询地址
        try {
            this.showFlag = true
            const {data} = await this.Api.getAddress()
            if (data.code == 200) {
                this.showFlag = false
                this.list = data.address.reverse()
                let defaultAddress
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].isDefault == true) {
                        defaultAddress = this.list[i]
                        defaultAddress.id = '1'
                        this.list.splice(i,1)
                        this.list.unshift(defaultAddress)
                    } else {
                        this.list[i].id = String( i+2)
                    }
                }                                
            }
        } catch (error) {
            console.log(error);
            this.$toast('网络错误')
            this.showFlag = false
        }
    },

    beforeRouteEnter (to, from,next) {
        next(vm => {
            if (from.name == "ShoppingPayMent") {
                vm.isPay = true
            }
            // 通过 `vm` 访问组件实例
        })
    }
    }
</script>

<style lang="stylus" scoped>
    .address
        position fixed
        top 0px
        left 0
        right 0
        bottom 0px
        z-index 500
        background #fff
        .scroll
            position fixed
            top 38px
            bottom 50px
            left 0
            right 0
            overflow hidden
            .nolist
                text-align center
                font-size 16px
                letter-spacing 2px
                color #bbb
                margin-top 50px
    .add
        height 50px
        position fixed
        left 0
        right 0
        bottom 0
        background #f44
        color #fff    
        text-align center
        font-size 15px
        letter-spacing 2px
        line-height 50px
        z-index 201     
</style>

