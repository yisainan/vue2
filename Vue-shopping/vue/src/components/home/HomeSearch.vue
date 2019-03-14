<template>
<transition name='bounce'>
    <div class="search-content">
        <Scroll :data='list' class="scroll" :pullup='true' @scrollToEnd='scrollToEnd'>
                <!-- <li class="item border-bottom"  v-for="val of list" @click="details(val)" :key="val.id" v-html="keyWord(val.name,value)">
                </li> -->
            <GoodsList :isSearch='true' :list='list' :searchVal='value' @searchHistory='searchHistory'/>
            <div class="empty" v-show="len">暂无搜索结果~~</div>
        </Scroll>
        <div class="history" v-if="!value && historyList && historyList.length">
            <div class="search-top">
                <span>搜索历史</span>
                <span class="delete" @click="deletes"><van-icon name="delete" /></span>
            </div>
            <div class="search-history">
                <span v-for="(val,index) of historyList" :key="index" @click="vals(val)">{{val}}</span>
                <p class="more" @click="more" v-show="searchHistoryList.length>7">{{limit==7?'更多搜索历史':'收起搜索历史'}}<font :class="{tr:limit>7}">∨</font></p>
            </div>
        </div>
        <div v-if="!list.length && !historyList.length && !len && !value" class="history history-empty">
            暂无搜索历史
        </div>
    </div>

</transition>      
</template>

<script>
import Scroll from 'public/Scroll'
import GoodsList from 'public/GoodsList'
import {vuexData} from 'js/mixin'
export default {
    components: {
        GoodsList,
        Scroll
    },
    mixins:[vuexData],
    props: {
        list: {
            ttype: Array,
            default() {
                return []
            },
            
        },
        len: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            limit:5,
            moreFlag: false
        }
    },
    computed: {
        historyList() {
            if (!this.searchHistoryList) {
                return
            }
            return this.searchHistoryList.slice(0,this.limit);
        }
        
    },
    methods: {
        searchHistory() {
            this.setSearchHistory(this.value)     // 加入搜索历史记录
        },
        more() {
            if(this.limit==5){
                this.moreFlag = true
                this.limit = this.searchHistoryList.length;
              }else{
                this.limit = 5;
                this.moreFlag = false
              }
        },
        vals(val) {
            this.$emit('vals',val)
        },
        deletes() {
                // 清空搜索历史记录
            $dialog.confirm({
                    title: '提示',
                    message: `确认删除搜索历史?`
                }).then(() => {
                     this.clearSearchHistory() 
                })
        },
        scrollToEnd() {
            this.$emit('scrollToEnd')
        }
    },
    
    created() {
     
    },
}
</script>

<style lang="stylus" scoped>
.search-content
    position fixed
    top 44px
    left 0
    right 0
    bottom 0px
    z-index 500
    background #fff
    .scroll
        height: 100%;
        overflow: hidden;
        .item 
            height 50px
            line-height 50px
            padding 0 15px
            box-sizing border-box
    .history-empty
        text-align center
        margin-top 100px        
    .history
        width 100%
        padding 10px 20px
        box-sizing border-box
        display flex
        flex-direction column
        position absolute
        top 0
        left 0
        .search-top
            display flex
            font-size 14px
            justify-content space-between
            margin-bottom 15px
        .search-history
            span 
                display inline-block
                background #F7F7F7    
                padding 8px 20px
                border-radius 15px
                margin-right 8px
                margin-bottom 10px
            .more
                color #999
                text-align center
                margin-top 10px    
                font
                    display inline-block
                    margin-left 5px
                .tr
                    transform rotate(180deg)    
                    
    .empty
        text-align center
        margin-top 100px
        color #999        
</style>