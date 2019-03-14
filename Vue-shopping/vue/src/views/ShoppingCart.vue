<template>
    <div class="card page-tab">
        <van-nav-bar title="购物车" :left-arrow="false"/>
        <Scroll :data="shopList" class="scroll" ref="scroll" v-show="shopList && shopList.length">
            <ul class="ul" v-show="!showFlag">
                <div class="pics border-bottom" v-show="shopList.length">
                    <div class="quanxuan">
                        <input id="select" type="checkbox" @change="change" v-model="allCheck">
                        <label for="select" class="span">{{allCheck?'取消全选':'全选'}}</label>
                    </div>
                    <div class="total">
                        <p>合计：
                            <span>￥{{totalPrice | toFixed}}</span>
                        </p>
                        <p v-if="deleteFlag">请确认订单</p>
                    </div>
                </div>
                <div class="confirm" v-show="shopList.length">
                    <div class="notijiao delete" v-if="deleteFlag" @click="deletes">删除</div>
                    <div class="notijiao delete" v-if="deleteFlag" @click="placeOrder">去结算</div>
                </div>
                <li class="border-bottom" v-for="val of shopList" :key="val.id">
                    <div class="left">
                        <input type="checkbox" v-model="val.check" @change="itemChange(val)">
                    </div>
                    <div class="middle border">
                        <img :src="val.image_path" :onerror="defaultImg">
                    </div>
                    <div class="right">
                        <p class="name">{{val.name}}</p>
                        <div>
                            <p class="one">
                                <span>￥</span>
                                {{(val.present_price * val.count) | toFixed}}
                            </p>
                            <p class="two">
                                <i class="iconfont icon-jian" @click="editCart('minu',val)"></i>
                                <span>{{val.count}}</span>
                                <i @click="editCart('add',val)" class="iconfont icon-jia"></i>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </Scroll>
        <div class="shop-warpper" v-show="!shopList.length && !showFlag">
            <div class="shop">
                <img :src="noShop" alt>
            </div>
            <p class="desc">{{!userName?'请先登录噢~~':'您的购物还是空空的哦'}}</p>
            <p class="desc2" @click="goshop" v-if="userName">去购物</p>
            <p class="desc2" @click="goLogin" v-else>去登录</p>
        </div>
        <BaseFooter active='2'/>
        <router-view/>
        <BaseLoding :showFlag="showFlag"/>
    </div>
</template>

<script>
import Scroll from "public/Scroll";
import { vuexData } from "js/mixin";
import BaseFooter from 'public/BaseFooter'
export default {
    name: "ShoppingCart",
    mixins: [vuexData],
    data() {
        return {
            shopList: "",
            checked: false,
            checkList: [],
            checkListId: [],
            floorName: "为你推荐",
            defaultImg: 'this.src="' + require("img/vue.jpg") + '"',
            allCheck: false,
            deleteFlag: false,
            noShop: require("img/shop.png"),
            isLogin: false,
        };
    },
    computed: {
        totalPrice() {
            let tatol = 0;
            if (this.shopList.length) {
                this.shopList.forEach(item => {
                    if (item.check) {
                        tatol += item.present_price * item.count;
                    }
                });
                return tatol
            }
            return 0;
        }
    },
    components: {
        Scroll,
        BaseFooter
    },
    methods: {
        //全选
        change() {
            this.shopList.forEach((v, o) => {
                v.check = this.allCheck;
                if (v.check) {
                    this.deleteFlag = true;
                } else {
                    this.deleteFlag = false;
                }
            });
        },

        //单选勾住后全选
        itemChange(val) {
            let select = this.shopList.filter((v, o) => {
                return v.check == true;
            });
            select.length == this.shopList.length
                ? (this.allCheck = true)
                : (this.allCheck = false);
            for (let i = 0; i < this.shopList.length; i++) {
                if (this.shopList[i].check) {
                    this.deleteFlag = true;
                    break;
                } else {
                    this.deleteFlag = false;
                }
            }
        },

        async getShopList() {
            try {
                this.showFlag = true;
                const { data } = await this.Api.getCard();
                if (data.code == -1) {
                    this.isLogin = true;
                    this.showFlag = false;
                } else {
                    this.showFlag = false;
                    this.shopList = data.shopList;
                }
            } catch (error) {
                this.$toast("网络连接失败");
                this.showFlag = false;
            }
        },

        goshop() {
            this.$router.push({ name: "Home" });
        },

        // 加减商品
        async editCart(flag, val) {
            console.log(val);

            if (flag == "minu") {
                if (val.count <= 1) {
                    return;
                }
                val.count--;
            } else if (flag == "add") {
                if (val.count >= 50) {
                    this.$toast("最多购买50件噢~~");
                    return;
                }
                val.count++;
            }
            const mallPrice = (val.present_price * val.count).toFixed(2);
            this.Api.editCart(val.count, val.cid, mallPrice);
        },
        // 删除商品
        deletes() {
            let id = [];
            this.shopList.forEach(item => {
                if (item.check) {
                    id.push(item.cid);
                    this.$dialog
                        .confirm({
                            title: "提示",
                            message: `确认删除商品吗?`
                        })
                        .then(() => {
                            this.deleteShop(id);
                        });
                }
            });
        },

        // 删除购物车商品
        async deleteShop(id) {
            try {
                const { data } = await this.Api.deleteShop(id);
                if (data.code == 200) {
                    this.deleteFlag = false;
                    this.$toast(data.msg);
                    this.getShopList();
                }
            } catch (error) {
                this.$toast("删除失败,网络错误");
            }
        },

        // 推荐随机商品
        // async getRandom() {
        //   let res = await axios.get("/this.Api/getCard/recommend");
        //   if (res.data.code == 1) {
        //     this.tablist(res.data.shopRecommend);
        //   }
        // },

        // 提交订单
        placeOrder() {
            let id = [];
            this.$router.push({ name: "ShoppingPayMent" });
            this.shopList.forEach(item => {
                if (item.check) {
                    id.push(item);
                }
            });
            this.setShopList(id);
        },

        goLogin() {
            this.$router.push({ name: "Login" });
        }
    },
    created() {
        this.getShopList();
    }
};
</script>

<style lang="stylus" scoped>
.card >>> .checkbox-component>input+label>.input-box {
    height: 17px;
    width: 17px;
    border: 1px solid red;
}

.card >>> .checkbox-component>input+label>.input-box>.input-box-tick>path {
    stroke: red;
}

.card {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0px;

    .scroll {
        position: fixed;
        top: 38px;
        bottom: 50px;
        left: 0;
        right: 0;
        overflow: hidden;

        .ul {
            margin: 0 10px;

            li {
                display: flex;
                align-items: center;
                height: 90px;
                padding-bottom: 10px;
                margin-top: 10px;

                .left {
                    width: 40px;
                    flex: 0 0 40px;
                }

                .middle {
                    width: 80px;
                    flex: 0 0 80px;
                    padding: 1px;
                    box-sizing: border-box;

                    img {
                        width: 100%;
                    }
                }

                .right {
                    flex: 1;
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding: 0 5px 0 15px;
                    box-sizing: border-box;

                    .name {
                        font-size: 14px;
                        color: #e0322b;
                    }

                    div {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 20px 0 0;

                        .one {
                            font-size: 16px;
                            color: #e0322b;

                            span {
                                font-size: 14px;
                            }
                        }

                        .two {
                            width: 80px;
                            font-size: 19px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            i {
                                color: #747474;
                            }

                            span {
                                padding: 0 10px;
                                font-size: 16px;
                            }
                        }
                    }
                }
            }

            .pics {
                display: flex;
                height: 50px;
                align-items: center;
                padding: 10px 0;
                justify-content: space-between;

                .checkedAll {
                    font-size: 15px;
                }

                .quanxuan {
                    position: relative;
                    width: 40px;
                    height: 50px;
                    display: flex;
                    align-items: center;

                    .span {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 14px;
                        width: 60px;
                        left: 25px;
                    }
                }

                .total {
                    align-content: flex-end;
                    font-size: 14px;
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 145px;

                    span {
                        color: #e0322b;
                        font-weight: bold;
                    }
                }
            }

            .confirm {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-top: 5px;
                margin-bottom: 10px;

                .notijiao {
                    height: 35px;
                    padding: 0 15px;
                    font-size: 14px;
                    margin-right: 5px;
                    line-height: 35px;
                    border-radius: 2px;
                    background: #E5E5E5;
                    color: #D3D3D4;
                }

                .delete {
                    background: #E6057F;
                    color: #fff;
                }
            }
        }
    }

    .shop-warpper {
        width: 100%;
        padding-top: 20px;

        .shop {
            display: flex;
            background: #F2F2F2;
            flex-direction: column;
            justify-content: center;
            margin-top: 40px;
            background: #F6F6F6;
            width: 125px;
            height: 125px;
            border-radius: 50%;
            text-align: center;
            margin: auto;
            position: relative;

            img {
                width: 70%;
                margin: 0 auto;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .desc2 {
            height: 40px;
            width: 150px;
            line-height: 40px;
            border: 1px solid #000;
            text-align: center;
            margin: 0 auto;
            border-radius: 25px;
            font-size: 17px;
            margin-top: 35px;
        }

        .desc {
            text-align: center;
            margin-top: 25px;
            font-size: 16px;
            color: #666;
        }
    }
}
</style>
