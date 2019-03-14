<template>
    <div class="home page-tab">
        <div class="header">
            <van-row>
                <div @click="cityClick" >
                <van-col span="5" class="city">{{city}} ▼</van-col>
                </div>
                <van-col span="19" >
                    <div class="search-box" ref="searchBox">
                        <van-icon name="search" class="icon"/>
                        <input ref="input"  @focus="focus"  class="box" v-model="value" type="text" placeholder="请输入搜索关键词">
                        <van-icon name="clear" @click="value=''"  v-show="value" class="clear"/>
                    </div>
                    <transition name="bouncee">
                        <div class="quxiao" v-show="query" @click="closeSearch">取消</div>
                    </transition>
                </van-col>
            </van-row>
        </div>
    <div v-show="!showFlag"  class="content" @touchmove.prevent='touchmove' @touchstart.prevent='touchstart' @touchend.prevent='touchend'>
        <Scroll v-if="recommend" :pullup='true' @scrollToEnd='scrollToEnd2' :listenScroll='true' @scroll='scroll' :probeType='probeType'  :data='recommend.hotGoods' class="content-scroll" :bounce='bounce' ref="scroll">
            <div>
                <HomeSwiper :slides='recommend.slides'/>
                <HomePanl :category='recommend.category' @item='item' :advertesPicture='recommend.advertesPicture.PICTURE_ADDRESS'/>
                <HomeRecommend :recommend='recommend.recommend'/>
                <HomeFoor :floorName='floorName.floor1' :foor1='recommend.floor1' :num='num'/>
                <HomeFoor :floorName='floorName.floor2' :foor1='recommend.floor2' :num='num+1'/>
                <HomeFoor :floorName='floorName.floor3' :foor1='recommend.floor3' :num='num+2'/> 
                <HomeHot :hot='recommend.hotGoods'/>
            </div>
        </Scroll>
        <dir v-show="touch.init">
         <BaseRefresh :opacity='opac' :transformY='transformY' :rotate='rotate' :isRotate='isRotate' :trans='trans'/>

        </dir>
     </div>
        <!-- <BaseLoding :showFlag='showFlag'/> -->
        <HomeSearch v-show="query" @scrollToEnd='scrollToEnd' :list='dataArr' @details='searchDetails' :len='len' :value='value' @vals='vals'/>
        <div v-show="searchLoading" class="van-loading van-loading--circular van-loading--white" style="color: white;z-index:999"><span class="van-loading__spinner van-loading__spinner--circular"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span></div>
        <BaseFooter active='0'/>
        <router-view/>
</div>


</template>

<script>
import HomeRecommend from '@/components/home/HomeRecommend'
import HomeFoor from '@/components/home/HomeFoor'
import HomeHot from '@/components/home/HomeHot'
import HomeSearch from '@/components/home/HomeSearch'
import HomeSwiper from '@/components/home/HomeSwiper'
import HomePanl from '@/components/home/HomePanl'
import Scroll from 'public/Scroll'
import BaseFooter from 'public/BaseFooter'
import BaseRefresh from '@/components/home/BaseRefresh'
import {vuexData,page} from 'js/mixin'
import {throttle} from 'js/util'
export default {
    name: "Home",
    mixins: [page,vuexData],
    data() {
        return {
            value: '',
            recommend: '',
            num: 1,
            bounce: {
                top:false,
            },
            probeType: 3,
            floorName: '',
            touch: {},
            transformY: 0,
            rotate: 0,
            isRotate: false,
            trans: false,
            opac: 0,
            currentCity: '',
            query: false,       // 显示搜索
            len: false,        // 是否含有搜索结果
            page: 1,
            searchLoading: false,
        }
    },
    
    components: {
        HomeRecommend,
        HomeFoor,
        HomeSearch,
        HomeHot,
        Scroll,
        BaseRefresh,
        HomeSwiper,
        HomePanl,
        BaseFooter,
    },
    methods: {
        scroll(e) {
            Math.abs(e.y) == 0 ? this.touch.scroll = true : this.touch.scroll = false
            if (this.transformY > 0) {
                this.$refs.scroll.disable()
            }
        },
        
        touchstart(e) {
            this.isRotate = false
            this.trans = false
            this.touch.init = true
            this.touch.startY = e.touches[0].pageY        //第一次点击的位置
        },
        touchmove(e) {
            if (!this.touch.scroll || !this.touch.init || e.touches[0].pageY > window.innerHeight) return
            let pageY = e.touches[0].pageY
            let daltaY = pageY -  this.touch.startY   //滑动的位置
            this.transformY = Math.max(0, daltaY / 3.5)
            this.rotate = Math.max(0,Math.min(360,daltaY) ) 
            if (this.transformY > 80 ) this.touch.isRotate = true
            this.opac = daltaY / 320
        },
        async touchend(e) {
            this.$refs.scroll.enable()
            if (this.transformY > 0) this.trans = true
            this.isRotate = true
            if (!this.touch.isRotate ) {
                 this.transformY = 0
                 this.isRotate = false
                 setTimeout(() => {
                     this.opac = 0
                 }, 300);
            } else {
                this.touch.isRotate = false
                if (this.transformY > 100) {
                    // 请求接口刷新数据
                    try {
                        const {data} = await this.Api.recommend()
                        if (data.code == 200) {
                            const datas = data.data
                            this.recommend = datas
                            this.floorName = datas.floorName
                            setTimeout(() => {
                                this.transformY = 0
                                this.rotate = 0
                                
                            }, 1000);
                            setTimeout(() => {
                                this.isRotate = false
                                this.opac = 0
                                this.$toast('刷新成功')
                            }, 1500);
                        }
                    } catch (error) {
                        this.$toast('刷新失败,网络错误')
                    }
                    
                }  else {
                    this.transformY = 0
                    this.rotate = 0
                    this.isRotate = false
                }
            }
        },
        details(val) {
            let id = {
                goodsId: val.goodsId
            }
            this.setGoodDetails(id)
            this.$router.push({name:`Details`,query: {id:val.goodsId}})
        },
        
        searchDetails(id) {
            this.$refs.input.blur()
            this.$router.push({name:`Details`,query: {id}})
        },
        cityClick() {
            this.$router.push({name: 'City'})
        },
        async getHome() {
            try {
                this.showFlag = true
                const {data} = await this.Api.recommend()
                if (data.code == 200) {
                    this.showFlag = false
                    this.recommend = data.data
                    this.floorName = data.data.floorName
                    this.setTab(data.data.category)
                }
            } catch (error) {
                this.showFlag = false
                this.$toast('网络错误')
            }
        },
        // 跳转到商品分类
        item(val,index) {
            const id = val.bxMallSubDto[0].mallSubId
            this.$router.push({
                name: `Category`,
                params: {
                    id,
                    index,
                    val
                }
            })
        },
        //搜索
        async search(value,flag) {
            try {
                if (this.isLocked()) return // 必须等待上一次请求完成
                this.locked()//开始请求之前锁住
                this.searchLoading = true
                this.len = false
                const {data} = await this.Api.search(value,this.page)
                if (data.code == 200) {
                    this.setTotal(data.data.count)  // 总条数
                    this.unLocked() // 解锁
                    this.searchLoading = false
                    if (flag) {
                        this.setNewData(data.data.list)
                    } else {
                        this.dataArr = data.data.list
                    }
                    if (!this.dataArr.length) {
                        this.len = true
                    }
                }
            } catch (error) {
                this.unLocked() // 解锁
                this.len = false
                this.$toast('网络错误')
            }
            
        },
        // 取消搜索
        onCancel() {
            this.value = ''
            
        },
        focus(){
            let width =  '85%'
            this.tran(width)
            this.query = true
        },
        closeSearch(){
            let width =  '100%'
            this.tran(width)
            this.query = false
            setTimeout(() => {
                this.value = ''
            }, 300);
        },
        tran(width) {
            this.$refs.searchBox.style.width = width;
            this.$refs.searchBox.style['transitionDuration'] = '.3s'
        },
        vals(val) {
            this.value = val
        } ,
        scrollToEnd() {
            if (this.dataArr.length >= 20) {
                if (this.hasMore()) {
                    this.page++
                    this.search(this.value,true)
                } else {
                    this.$toast('没有很多数据了~~')
                }
            }
        },
        scrollToEnd2() {
            this.$refs.scroll.refresh()
        },
    },
    
    created() {
        this.getHome()
        // 节流函数处理
        this.$watch('value',throttle(() => {
            this.dataArr = []
            if (this.value) {
                this.page = 1
                this.search(this.value,false)
            } 
        },800))
    },
    watch: {
        city() {
            this.getHome()
        },
        
    }
}
</script>
<style lang="less" scoped>
@color: #F2F2F2;

.header {
    line-height: 44px;
    position: relative;
    z-index: 10;
    background: #eee;
    .city {
        text-align: center;
        background: @color;
        font-size: 12px;
        position: relative;
        max-width: 120px;
        .icon {
            transform: rotate(270deg);
            position: absolute;
            top: 35%;
            right: -12%
        }
    }
}
.content {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 50px;
    .content-scroll {
        height: 100%;
        overflow: hidden;
    }
    
}
     .search-box {
         display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 44px;
        background: #eee;
        position: relative;
        .icon {
            font-size: 16px;
            color: #222;
            position: absolute;
            left: 10px;
        }
        .box {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            line-height: 18px;
            background: #fff;
            color: #333;
            font-size: 14px;
            outline: 0;
            margin-right: 5px;
            border-radius: 5px;
            padding: 7px;
            padding-left: 32px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        .clear {
            position: absolute;
            right: 12px;
            color: #999;
        }
     }
    .quxiao {
        position: absolute;
        right: 8px;
        top: 0%;
        font-size: 16px;
    }
 
.bouncee-enter-active {
        animation: bounce-in .3s;
    }
.bouncee-leave-active {
        animation: bounce-in .1s reverse;
    }
@keyframes bounce-in {
    0% {
        transform: translate3d(100%,0,0)
    }
    
    100% {
        transform: translate3d(0,0,0)
    }
} 
</style>