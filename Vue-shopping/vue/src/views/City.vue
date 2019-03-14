<template>
    <div class="city-warp">
        <van-nav-bar title="城市列表" left-arrow @click-left="back"/>
        <div class="serach">
            <van-col span="24">
                <van-search placeholder="请输入城市关键字" v-model="keyword"/>
            </van-col>
        </div>
        <Scroll
            class="scroll"
            v-show="!keyword"
            ref="scroll"
            :listenScroll="listenScroll"
            :probeType="probeType"
            @scroll="scroll"
        >
            <div>
                <div class="area" ref="currentCity">
                    <div class="title">当前城市</div>
                    <div class="button-list">
                        <div class="button-warpper">
                            <div class="button">{{city}}</div>
                        </div>
                    </div>
                </div>
                <div class="area" ref="hotCity">
                    <div class="title border-topbottom">热门城市</div>
                    <div class="button-list">
                        <div
                            class="button-warpper"
                            v-for="val in citys.data.hotCities"
                            :key="val.id"
                        >
                            <div class="button" @click="selectCiti(val.name)">{{val.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="area2" v-for="(val,key) of citys.data.cities" :key="key" :ref="key">
                    <div class="title border-topbottom">{{key}}</div>
                    <div class="item-list" v-for="item in val" :key="item.id">
                        <div class="item border-bottom" @click="selectCiti(item.name)">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="list-fixed" v-show="fixedTitle" ref="fixed">
                <h1 class="fixed-title">{{fixedTitle}}</h1>
            </div>
        </Scroll>
        <Scroll :data="cityList" class="search-content" v-show="keyword" ref="search">
            <ul>
                <li
                    v-for="(val,index) in cityList"
                    :key="index"
                    @click="selectCiti(val.name)"
                    class="border-bottom"
                >{{val.name}}</li>
            </ul>
            <div v-show="noData" class="noData">暂时没有数据~~</div>
        </Scroll>

        <CityRight v-show="!keyword" @change="change" :cities="citys.data.cities"/>
    </div>
</template>

<script>
import CityRight from "@/components/city/CityRight";
import Scroll from "public/Scroll";
import city from "js/city";
import { throttle } from "js/util";
import { vuexData } from "js/mixin";

export default {
    name: "City",
    mixins: [vuexData],
    components: {
        Scroll,
        CityRight
    },

    data() {
        return {
            citys: city,
            touchStatus: false,
            citiTxt: "",
            listenScroll: true, //监听scroll的滚动事件
            probeType: 3, //滚动不节流
            heightArr: [], // 用来装每个区间的高度
            scrollY: -1,
            fixedTitle: "当前城市",
            diff: -1,
            cityList: [],
            keyword: ""
        };
    },

    computed: {
        citiesList() {
            let arr = [];
            for (let k in city.data.cities) {
                arr.push(k);
            }
            return arr;
        },

        letter() {
            let arr = [];
            for (let k in this.citys.data.cities) {
                arr.push(k);
            }
            return arr;
        },

        noData() {
            return !this.cityList.length;
        }
    },

    methods: {
        onSearch() {},

        selectCiti(val) {
            this.selectCity(val);
            this.back();
        },

        change(txt) {
            this.citiTxt = txt;
        },

        scroll(e) {
            this.scrollY = e.y;
        },

        //计算每个区间的高度
        listHeight() {
            //计算每个区间的高度
            let height =
                this.$refs.currentCity.clientHeight +
                this.$refs.hotCity.clientHeight;
            this.heightArr.push(height);
            for (let k in this.$refs) {
                if (this.$refs[k][0]) {
                    let item = this.$refs[k][0];
                    height += item.clientHeight;
                    this.heightArr.push(height);
                }
            }
        },

        // 城市搜索
        searchCity() {
            let arr = [];
            for (const k in city.data.cities) {
                city.data.cities[k].forEach(item => {
                    if (
                        item.spell.includes(this.keyword) ||
                        item.name.includes(this.keyword)
                    ) {
                        arr.push(item);
                    }
                });
            }
            this.cityList = arr;
        }
    },

    mounted() {
        this.listHeight();
    },
    watch: {
        keyword() {
            throttle(this.searchCity(), 300, 500);
        },

        citiTxt() {
            if (this.citiTxt) {
                const element = this.$refs[this.citiTxt][0];
                this.$refs.scroll.scrollToElement(element, 200);
            }
        },
        scrollY(newY) {
            if (newY > 0) {
                this.fixedTitle = "";
            }
            let heightArr = this.heightArr;
            for (let i = 0; i < heightArr.length; i++) {
                let height1 = heightArr[i];
                let height2 = heightArr[i + 1];

                if (-newY >= height1 && -newY < height2) {
                    if (this.letter[i]) {
                        this.fixedTitle = this.letter[i];
                        this.diff = height2 + newY;
                    }
                    return;
                }
            }
        },
        diff(newVal) {
            let fixedTop = newVal > 0 && newVal < 30 ? newVal - 30 : 0;
            if (this.fixedTop === fixedTop) {
                return;
            }
            this.fixedTop = fixedTop;
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
        }
    }
};
</script>

<style lang="stylus" scoped>
.city-warp {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    background: #fff;

    .scroll {
        position: fixed;
        top: 83px;
        bottom: 0px;
        left: 0;
        right: 0;
        overflow: hidden;

        .list-fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background: #f2f2f2;

            .fixed-title {
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
                background: #f2f2f2;
            }
        }

        .title {
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            background: #F2F2F2;
        }

        .button-list {
            padding: 5px 30px 5px 5px;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            flex-wrap: wrap;

            .button-warpper {
                flex: 0 0 33.33%;

                .button {
                    text-align: center;
                    padding: 5px 0;
                    border-radius: 2.5px;
                    border: 1px solid #ccc;
                    margin: 5px;
                }
            }
        }

        .item-list {
            .item {
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                font-size: 13px;
                box-sizing: border-box;
            }

            &:last-child, &:after {
                border: 0;
            }
        }
    }

    .search-content {
        position: absolute;
        overflow: hidden;
        top: 83px;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;

        ul {
            li {
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                font-size: 13px;
                box-sizing: border-box;
            }
        }

        .noData {
            text-align: center;
            margin-top: 50px;
            font-size: 14px;
        }
    }
}
</style>

