<template>
    <!-- 查看已评价 -->
    <div class="aevaluated-warp">
        <van-nav-bar title="评价详情" left-arrow @click-left="back"/>
        <div v-if="evaluateOne" class="evaluateOne">
            <img :src="evaluateOne.user[0].avatar" alt srcset>
            <div class="middle">
                <span class="name">{{evaluateOne.comment_nickname}}</span>
                <p class="rate">
                    <van-rate color="#e0322b" :size="size" readonly v-model="evaluateOne.rate"/>
                </p>
            </div>
            <div class="time">{{evaluateOne.comment_time}}</div>
        </div>
        <div class="content border-bottom">评价内容：{{evaluateOne.content}}</div>
        <div class="goods" v-if="evaluateOne.goods">
            <img :src="evaluateOne.goods[0].image_path" alt srcset>
            <p class="name">{{evaluateOne.goods[0].name}}</p>
            <p class="cart" @click="addCard(evaluateOne.cid)">
                <van-icon name="cart"/>
            </p>
        </div>
        <div class="btn">
            <van-button type="primary" size="large" @click="back">返回</van-button>
        </div>
    </div>
</template>

<script>
import { vuexData } from "js/mixin";
export default {
    mixins: [vuexData],
    name: "Aevaluated",
    props: ["id"],
    data() {
        return {
            evaluateOne: "",
            size: 14
        };
    },

    methods: {
        async addCard(id) {
            if (!this.userName) {
                this.$router.push({ name: "Login" });
                return;
            }
            try {
                const { data } = await this.Api.addShop(id);
                if (data.code == 200) {
                    this.$toast(data.msg);
                }
            } catch (error) {
                this.$toast("网络错误");
            }
        }
    },

    async created() {
        try {
            const { data } = await this.Api.evaluateOne(this.id);
            if (data.code == 200) {
                this.evaluateOne = data.evaluateOne;
            }
        } catch (error) {
            this.$toast("网络错误");
        }
    }
};
</script>

<style lang="stylus" scoped>
.aevaluated-warp {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    background: #fff;

    .evaluateOne {
        display: flex;
        padding: 0 10px;
        align-items: center;
        margin-top: 10px;

        .middle {
            flex: 1;
        }

        img {
            width: 50px;
            margin-right: 15px;
            flex: 0 0 50px;
            height: 50px;
            border: 1px solid #eee;
            border-radius: 50%;
        }

        .name {
            display: block;
            margin-bottom: 10px;
        }

        .time {
            float: right;
            color: #666;
        }
    }

    .content {
        margin: 15px 10px 10px 10px;
        padding-bottom: 15px;
        line-height: 1.4;
        letter-spacing: 1px;
    }

    .goods {
        display: flex;
        padding: 0 10px;

        img {
            width: 55px;
            height: 50px;
            flex: 0 0 55px;
            margin-right: 10px;
        }

        .name {
            flex: 1;
            line-height: 1.6;
        }

        .cart {
            flex: 0 0 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            text-align: center;
            background: #FFE6E2;
            margin-left: 10px;

            i {
                font-size: 18px;
                color: red;
            }
        }
    }

    .btn {
        width: 90%;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        bottom: 10%;
        transform: translateX(-50%);
    }
}
</style>

