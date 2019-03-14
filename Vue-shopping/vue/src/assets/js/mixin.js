import { mapMutations, mapGetters, mapActions } from 'vuex'
import BaseLoding from 'public/BaseLoding'
export const vuexData = {
    data() {
        return {
            showFlag: true,     //是否显示lodding
        }
    },
    components: {
        BaseLoding,
    },
    computed: {
        ...mapGetters([
            'category',
            'categoryTabList',
            'goodsDetails',
            'userName',
            'addressInfo',
            'browse',
            'shopOrderList',
            'temporaryAddress',
            'city',
            'searchHistoryList',
            'token'
        ])
    },

    methods: {
        ...mapMutations({
            setName: "USERNAME",
            setGoodDetails: 'GOODS_DETAILS',
            setAddress2: 'TEMP_ORARY_ADDRESS',
            setShopList: "SHOP_ORDER_LIST",
            setVuexAddress: 'TEMP_ORARY_ADDRESS'
        }),

        ...mapActions([
            'setTab',
            'setCategoryTabList',
            'setAddress',
            'clearAddress',
            'setBrowse',
            'deleteOne',
            'selectCity',
            'setSearchHistory',
            'clearSearchHistory',
            'setToken'
        ]),

        //返回上一页或者首页
        back() {
            this.$router.animate = 1
            if (window.history.length <= 2) {
                this.$router.push({ name: 'Home' })
            } else {
                this.$router.go(-1)
            }
        },

        // 商品详情页
        details(val) {
            this.setGoodDetails(val)
            if (this.$route.name === 'Home') {  //加入搜索历史记录
                this.$emit('searchHistory')
            }
            this.$router.push({ name: `Details`, query: { id: val.goodsId || val.id || val.cid } })
        }
    },
}


export const page = {
    data() {
        return {
            dataArr: [],
            total: null,
            loading: false, // 锁
        }
    },

    methods: {
        // newArr, 第二页请求到的数据
        setNewData(newArr) {
            this.dataArr = this.dataArr.concat(newArr)
        },

        // 起始的记录数
        getCurrentStart() {
            return this.dataArr.length
        },

        // 是否还有更多数据加载
        hasMore() {
            // 说明没有数据要加载了
            if (this.dataArr.length >= this.total) {
                return false
            }
            return true
        },

        // 总条数
        setTotal(total) {
            this.total = total
        },

        // 清空数组
        clearArr() {
            this.setData({
                dataArr: []
            })
            this.total = null
        },

        // 锁的机制
        isLocked() {
            return this.loading ? true : false
        },

        // 加锁
        locked() {
            this.loading = true
        },

        unLocked() {
            this.loading = false
        }
    }
}
