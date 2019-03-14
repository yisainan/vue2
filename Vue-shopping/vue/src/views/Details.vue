<template>
    
    <div class="goods">
        <van-goods-action class="van-goods-sku">
            <van-goods-action-mini-btn icon="wap-home" @click="goHome">首 页</van-goods-action-mini-btn>
            <van-goods-action-mini-btn icon="shopping-cart-o" @click="onClickCart">购物车</van-goods-action-mini-btn>
            <van-goods-action-big-btn @click="addShops">加入购物车</van-goods-action-big-btn>
            <van-goods-action-big-btn primary @click="purchase">立即购买</van-goods-action-big-btn>
        </van-goods-action>
        <Scroll
            class="scroll"
            :bounce="bounce"
            ref="scroll"
            :pullup="true"
            @scrollToEnd="scrollToEnd"
        >
            <div>
                <van-swipe
                    class="goods-swipe"
                    :autoplay="3000"
                    @change="onChange"
                    :touchable="false"
                >
                    <van-swipe-item>
                        <img
                            :src="goods.image"
                            @click="showImagePreview"
                            ref="swiperImg"
                            :onerror="defaultImg"
                        >
                    </van-swipe-item>
                    <van-swipe-item>
                        <img
                            :src="goods.image"
                            @click="showImagePreview"
                            ref="swiperImg2"
                            :onerror="defaultImg"
                        >
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">{{ current + 1 }}/2</div>
                </van-swipe>
                <div v-show="!showFlag">
                    <van-cell-group>
                        <van-cell class='titlename'>
                            <div class="goods-title">{{ goods.name }}</div>
                            <div class="goods-price">￥{{ goods.present_price }}</div>
                        </van-cell>
                        <van-cell class="goods-express">
                            <van-col span="9">运费：{{ goods.express || 0}}</van-col>
                            <van-col span="9">剩余：{{ goods.amount }}</van-col>
                            <van-col span="6" class="like">
                                {{!isCollectionFlag?'取消收藏':'收藏'}}：
                                <van-icon
                                    :name="!isCollectionFlag?'like':'like-o'"
                                    @click="collection"
                                    class="like-o"
                                    :class="{like2:!isCollectionFlag}"
                                />
                            </van-col>
                        </van-cell>
                    </van-cell-group>

                    <van-cell-group class="goods-cell-group">
                        <van-cell value="进入店铺" icon="shop" is-link>
                            <template slot="title">
                                <span class="van-cell-text">有赞的店</span>
                                <van-tag class="goods-tag" type="danger">官方</van-tag>
                            </template>
                        </van-cell>
                    </van-cell-group>

                    <div>
                        <van-tabs v-model="currentActive" class="datails-tabs">
                            <van-tab v-for="val in item" :title="val.title" :key="val.id">
                                <div
                                    v-show="currentActive == 0"
                                    v-html="goodsDetails.detail || goods.detail"
                                    class="active-0"
                                ></div>
                                <div v-show="currentActive == 1" class="active-1">
                                    <div class="comment" v-for="val of dataArr" :key="val._id">
                                        <div class="comment-content">
                                            <div class="avatar">
                                                <img
                                                    v-if="!val.anonymous"
                                                    :src="val.user[0].avatar"
                                                    :onerror="defaultImg"
                                                    alt
                                                    srcset
                                                >
                                                <img v-else :src="val.comment_avatar" alt srcset>
                                            </div>
                                            <div class="desc border-bottom">
                                                <p class="fist">
                                                    <span
                                                        class="name"
                                                        v-if="!val.anonymous"
                                                    >{{val.user[0].nickname}}：</span>
                                                    <span
                                                        class="name"
                                                        v-else
                                                    >{{val.comment_nickname}}：</span>
                                                    <span class="num">{{val.comment_time}}</span>
                                                </p>
                                                <p class="timer">
                                                    <van-rate
                                                        v-model="val.rate"
                                                        readonly
                                                        :size="12"
                                                        color="#e0322b"
                                                    />
                                                </p>
                                                <p class="cont">{{val.content}}</p>
                                                <div class="img-content" :class="setImgContentClass(val.images.length)">
                                                    <img v-for="img of val.images" class="img" :class="setImgClass(val.images.length)" :key="img" :src="img" >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!dataArr.length" class="nocomment">该商品暂无评论噢~~</div>
                                </div>
                            </van-tab>
                        </van-tabs>
                    </div>
                </div>
            </div>
        </Scroll>
        <transition name="bounce2">
            <div class="sku" v-show="showBase" :class="{sku2:showBase}">
                <van-icon name="close" class="close" @click="showBase=false"/>
                <div class="goods-top border-bottom">
                    <img :src="goods.image_path" class="image_path" :onerror="defaultImg">
                    <div class="goods-right">
                        <p class="goods-name">{{goods.name}}</p>
                        <p class="pic">
                            <span>￥</span>
                            <span>{{(goods.present_price * newCount) | toFixed}}</span>
                        </p>
                    </div>
                </div>
                <div class="goods-bottom border-bottom">
                    <div class="left">
                        <p class="num">购买数量：</p>
                        <p class="totle">
                            剩余 {{goods.amount}} 件
                            <span>每人限购50件</span>
                        </p>
                    </div>
                    <AdditionAndSubtraction @count="count"/>
                </div>
                <div class="bottom" @click="PurchaseImmediately">立即购买</div>
            </div>
        </transition>
        <transition name="fade">
            <div class="sku-layer" v-show="showBase" @click="showBase=false"></div>
        </transition>

        <BaseLoding :showFlag="showFlag"/>
        <Back @back="back"/>
    </div>
</template>

<script>
import Scroll from "public/Scroll";
import Back from "public/Back";
import {  page, vuexData } from "js/mixin";
import { ImagePreview } from "vant";
import AdditionAndSubtraction from "@/components/details/AdditionAndSubtraction";
export default {
    name: "Details",
    props: ["id"], // 路由接受的参数query.id
    mixins: [ page, vuexData],
    components: {
        Back,
        AdditionAndSubtraction,
        Scroll
    },
    
    data() {
        return {
            goods: {},
            defaultImg: 'this.src="' + require("img/vue.jpg") + '"',
            currentActive: 0,
            item: [{ id: 0, title: "商品详情" }, { id: 1, title: "商品评论" }],
            isCollectionFlag: false,
            showBase: false, // 显示sku
            newCount: 1,
            comment: "",
            current: 0,
            page: 1,
            bounce: {
                bottom: false
            },
        };
    },


    methods: {
        formatPrice() {
            return "¥" + (this.goods.price / 100).toFixed(2);
        },
        onChange(index) {
            this.current = index;
        },

        onClickCart() {
            this.$router.push({name:'ShoppingCart'});
        },

        goHome() {
            this.$router.push({ name: "Home" });
        },

        setImgClass(len) {
            return `img${len}`
        },

        setImgContentClass(len) {
            return `img-content${len}`
        },

        // 请求商品详情
        async goodsItem(id = this.goodsDetails.goodsId, flag = false) {
            try {
                if (this.isLocked()) return; // 必须等待上一次请求完成
                this.locked(); //开始请求之前锁住
                const { data } = await this.Api.goodOne(id, this.page);
                if (data.code == 200) {
                    this.setTotal(data.goods.count); // 总条数
                    this.unLocked(); // 解锁
                    this.$refs.swiperImg.style.opacity = 1;
                    this.$refs.swiperImg2.style.opacity = 1;
                    if (data.goods.goodsOne) {
                        document.title = data.goods.goodsOne.name
                        this.goods = data.goods.goodsOne;
                        setTimeout(() => {
                            this.setBrowse(data.goods.goodsOne);
                        }, 300);
                    }
                    if (flag) {
                        this.setNewData(data.goods.comment);
                    } else {
                        this.dataArr = data.goods.comment;
                    }
                }
            } catch (error) {
                this.showFlag = false;
                this.isCollectionFlag = true;
                this.unLocked(); // 解锁
                this.$toast("网络错误");
            }
        },

        scrollToEnd() {
            setTimeout(() => {
                this.$refs.scroll.refresh();
            }, 20);
            // 评论分页
            if (this.currentActive == 1) {
                if (this.dataArr.length >= 5) {
                    this.page++;
                    if (this.hasMore()) {
                        this.goodsItem(this.id, true);
                    } else {
                        this.$toast("没有更多评论了~~");
                    }
                }
            }
        },

        // 查询是否已收藏
        async isCollection(id) {
            try {
                this.showFlag = true;
                const { data } = await this.Api.isCollection(id);
                if (data.code == 200) {
                    this.showFlag = false;
                    if (data.isCollection == 1) {
                        // 已经收藏收藏
                        this.isCollectionFlag = false;
                    } else {
                        this.isCollectionFlag = true;
                    }
                } else {
                    this.showFlag = false;
                    this.isCollectionFlag = true;
                }
            } catch (error) {
                this.showFlag = false;
            }
            
        },

        // 点击收藏
        async collection() {
            if (!this.userName) {
                this.$router.push({ name: "Login" });
                return;
            }
            if (this.isCollectionFlag) {
                // 收藏
                let goods = this.goods;
                delete goods["_id"];
                try {
                    const { data } = await this.Api.collection(goods);
                    if (data.code == 200) {
                        // 收藏成功
                        this.$toast(data.msg);
                        this.isCollectionFlag = false;
                    }
                } catch (error) {
                    this.$toast("收藏失败,网络错误");
                }
            } else {
                // 取消收藏
                try {
                    const { data } = await this.Api.cancelCollection(
                        this.goods.id
                    );
                    if (data.code == 200) {
                        this.isCollectionFlag = true;
                    }
                } catch (error) {
                    this.$toast("网络错误");
                }
            }
        },

        // 加入购物车
        async addShops() {
            if (!this.userName) {
                this.$router.push({ name: "Login" });
                return;
            }
            try {
                const { data } = await this.Api.addShop(
                    this.goodsDetails.goodsId || this.goodsDetails.id
                );
                if (data.code == 200) {
                    this.$toast(data.msg);
                }
            } catch (error) {
                this.$toast("网络错误");
            }
        },

        // 立即购买弹出sku
        purchase() {
            this.showBase = true;
        },

        count(newCount) {
            this.newCount = newCount;
        },

        // 立即购买
        PurchaseImmediately() {
            if (!this.userName) {
                this.$router.push({ name: "Login" });
                return;
            }
            let goods = [
                {
                    check: true,
                    count: this.newCount,
                    cid: this.goods.id,
                    image_path: this.goods.image_path,
                    mallPrice: this.goods.present_price * this.newCount,
                    present_price: this.goods.present_price,
                    name: this.goods.name,
                    idDirect: true,
                    count: this.newCount
                }
            ];
            this.$router.push({ name: "ShoppingPayMent" });
            this.setShopList(goods);
        },

        // 预览图片
        showImagePreview() {
            ImagePreview({
                images: [this.goods.image, this.goods.image],
                startPosition: 0,
                showIndicators: true
            });
        }
    },

    created() {
        this.goodsItem(this.id);
        this.isCollection(
            this.goodsDetails.goodsId || this.goodsDetails.id || this.id
        );
    },
    activated() {
        this.goodsItem(this.id);
    },

    deactivated() {
        setTimeout(() => {
            this.goods = {}
            this.dataArr = []
        }, 500);
    },
    mounted() {
        document.querySelector(".van-tabs__line").classList.add("swip");
        this.$refs.swiperImg.style.opacity = 0;
        this.$refs.swiperImg2.style.opacity = 0;
    },

    watch: {
        currentActive(newV, oldV) {
            if (newV == 1) {
                document
                    .querySelector(".van-tabs__line")
                    .classList.remove("swip");
                this.bounce.bottom = true;
            } else {
                this.bounce.bottom = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.titlename:not(:last-child):after {
    left: 0;
}
.scroll {
    position: fixed;
    top: 0px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
}
.sku {
    height: 250px;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    .close {
        position: absolute;
        right: 0%;
        top: 0%;
        font-size: 18px;
        z-index: 200;
        padding: 10px;
    }
    .goods-top {
        position: relative;
        height: 90px;
        display: flex;
        .image_path {
            flex: 0 0 80px;
            transform: translate3d(16px, -10px, 0);
            width: 80px;
            height: 80px;
            border: 1px solid #eee;
        }
        .goods-right {
            padding-left: 30px;
            flex: 1;
            .goods-name {
                font-size: 14px;
                margin-top: 10px;
                padding-right: 35px;
                line-height: 1.4;
            }
            .pic {
                margin-top: 10px;
                color: #ff4444;
                font-size: 14px;
            }
        }
    }
    .goods-bottom {
        height: 70px;
        padding: 10px 16px 10px 16px;
        box-sizing: border-box;
        display: flex;
        .left {
            flex: 0 0 60%;
            width: 60%;
            .num {
                font-size: 12px;
            }
            .totle {
                margin-top: 15px;
                color: #999;
                font-size: 12px;
                span {
                    color: #f44;
                    margin-left: 10px;
                    font-size: 12px;
                }
            }
        }
    }
    .bottom {
        height: 50px;
        background: #f44;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        letter-spacing: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}

.sku-layer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}
.goods {
    padding-bottom: 50px;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    // overflow: auto;
    &-swipe {
        img {
            width: 100%;
            height: 400px;
            display: block;
        }
    }
    &-title {
        font-size: 16px;
    }
    &-price {
        color: #f44;
    }
    &-express {
        color: #999;
        font-size: 12px;
        padding: 5px 15px;
    }
    &-cell-group {
        margin: 15px 0;
        .van-cell__value {
            color: #999;
        }
    }
    &-tag {
        margin-left: 5px;
    }
}

.active-1 {
    min-height: 300px;
}
.comment {
    margin-top: 15px;
    .comment-content {
        display: flex;
        margin: 12px;
        &-first-child {
            margin-top: 50px;
        }
        .avatar {
            flex: 0 0 35px;
            width: 35px;
            margin-right: 20px;
            img {
                width: 38px;
                height: 38px;
                border: 1px solid #eee;
                border-radius: 50%;
            }
        }
        .desc {
            flex: 1;
            padding-bottom: 8px;
            display: flex;
            flex-direction: column;
            &-last-child::before {
                border: 0;
            }
            .fist {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .name {
                    font-size: 14px;
                    olor: grey;
                }
                .num {
                    color: gray;
                    font-size: 14px;
                }
            }
            .timer {
                color: grey;
                margin-top: 8px;
            }
            .cont {
                margin-top: 8px;
                color: #333;
                overflow: hidden;
                word-wrap: break-word;
                word-break: break-all;
                text-align: justify;
                font-size: 14px;
                line-height: 1.6;
            }
            .img-content {
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                
                .img {
                    flex: 0 0 80px;
                    width: 90px;
                    flex-wrap: wrap;
                    object-fit: cover;
                    height: 90px;
                    border-radius: 3px;
                    margin-bottom: 5px;
                    margin-right: 6px;
                }
                .img1 {
                    flex: 1;
                    height: 200px;
                    margin-top: 10px;
                }
                .img2 {
                    flex: 0 0 49%;
                    height: 110px;
                    margin: 0;
                    margin-top: 10px;
                }
            }
        }
    }
}
.like {
    position: relative;
    display: flex;
    align-items: center;
    .like-o {
        font-size: 20px;
        position: absolute;
        right: 35%;
    }
    .like2 {
        font-size: 20px;
        position: absolute;
        right: 8%;
        color: red;
    }
}
.nocomment {
    text-align: center;
    color: #333;
    margin-top: 50px;
}
.bounce2-enter-active {
    animation: bounce-in 0.3s;
}
.bounce2-leave-active {
    animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
    0% {
        transform: translate3d(0, 100%, 0);
    }

    100% {
        transform: translate3d(0, 0, 0);
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.active-1 .comment:last-child .comment-content .desc::before {
    border: none;
}
.img-content2 {
    justify-content: space-between
}
</style>