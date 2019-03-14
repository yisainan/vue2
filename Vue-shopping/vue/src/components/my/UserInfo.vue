<template>
    <van-popup v-model="show" position="right" class="popup" :overlay="false">
        <van-nav-bar title="个人资料" left-arrow @click-left="goBack"/>
        <van-cell-group>
            <p @click="github">
                <van-field
                    class="border-bottom"
                    value="https://github.com/yzbgyq/Vue-shopping"
                    disabled
                    clearable
                    label="github"
                />
            </p>
            <div id="setAvatar" class="set-avatar border-bottom">
                <span>头像</span>
                <div>
                    <img
                        v-if="userName"
                        :onerror="defaultImg"
                        :src="tempAvatar || userName.avatar"
                        alt
                        srcset
                    >
                    <van-icon name="arrow"/>
                </div>
                <div class="cropper">
                    <Cropper :imgStyle="imgStyle" @callback="callback"/>
                </div>
            </div>
            <p @click="noName">
                <van-field class="border-bottom" v-model="username" disabled clearable label="用户名"/>
            </p>

            <van-field v-model="nickname" clearable label="昵称" placeholder="请输入昵称"/>
            <p @click="showGender=true" class="gender">
                <van-field
                    class="border-bottom"
                    v-model="gender"
                    clearable
                    disabled
                    label="性别"
                    placeholder="男"
                />
            </p>

            <van-field v-model="email" clearable label="邮箱" placeholder="请输入邮箱"/>
            <p @click="showBirth = true;" class="birth">
                <van-field v-model="birth" clearable disabled label="出生年月" placeholder="出生年月"/>
            </p>
        </van-cell-group>
        <van-popup v-model="showBirth" position="bottom" :overlay="true">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirm"
                @cancel="showBirth = false"
            />
        </van-popup>
        <van-popup v-model="showGender" position="bottom" :overlay="true">
            <van-picker
                class="gender-picker"
                :columns="columns"
                @change="onChange"
                show-toolbar
                title="性别"
                @cancel="showGender=false"
                @confirm="showGender=false"
            />
        </van-popup>
        <div class="normal">
            <van-button
                size="normal"
                class="normal-btn"
                type="primary"
                @click="post"
                :loading="loading"
            >保存</van-button>
            <van-button @click="show=false" size="normal" class="normal-btn normal-btn-default">取消</van-button>
        </div>
    </van-popup>
</template>

<script>
import Cropper from "@/components/my/Cropper";
import { goBack, vuexData } from "js/mixin";

export default {
    mixins: [vuexData],
    components: {
        Cropper
    },
    data() {
        return {
            show: false,
            loading: false,
            defaultImg: 'this.src="' + require("img/vue.jpg") + '"',
            imgStyle: {
                width: "55px",
                height: "55px",
                "border-radius": "50%",
                display: "none"
            },
            nickname: "",
            username: "",
            tempAvatar: "", //裁剪的临时图片
            showBirth: false,
            showGender: false,
            year: "",
            month: "",
            day: "",
            gender: "男",
            email: "",
            currentDate: new Date(),
            columns: ["男", "女", "保密"],
            maxDate: new Date(),
            minDate: new Date(1937, 12, 31),
            birth: "" // ,出生年月
        };
    },
    mounted() {
        
    },
    methods: {
        showPop() {
            this.show = true
            this.setting()
        },
        goBack() {
            this.show = false;
            setTimeout(() => {
                this.tempAvatar = "";
            }, 300);
        },
        github() {
            window.open("https://github.com/yzbgyq/Vue-shopping", "_blank");
        },
        callback(img) {
            this.tempAvatar = img;
        },
        noName() {
            this.$toast("用户名暂时不能修改哟~~");
        },
        // 修改用户资料
        async setting() {
            try {
                const { data } = await this.Api.user();
                if (data.code == 200) {
                    this.username = data.userInfo.username;
                    this.gender = data.userInfo.gender;
                    this.birth =
                        data.userInfo.year +
                        "年" +
                        data.userInfo.month +
                        "月" +
                        data.userInfo.day +
                        "日";
                    this.year = data.userInfo.year;
                    this.month = data.userInfo.month;
                    this.day = data.userInfo.day;
                    this.email = data.userInfo.email;
                    this.id = data.userInfo._id;
                    this.nickname = data.userInfo.nickname;
                }
            } catch (error) {
                this.$toast("获取用户信息失败");
            }
        },
        confirm(val) {
            let d = new Date(val);
            this.year = d.getFullYear();
            this.month = d.getMonth() + 1;
            this.day = d.getDate();
            this.birth = this.year + "年" + this.month + "月" + this.day + "日";
            this.showBirth = false;
        },

        onChange(picker, value) {
            this.gender = value;
        },
        // 保存
        async post() {
            this.loading = true;
            let datas = {
                gender: this.gender,
                email: this.email,
                year: this.year,
                month: this.month,
                day: this.day,
                id: this.id,
                nickname: this.nickname,
                avatar: this.tempAvatar ? this.tempAvatar : undefined
            };
            try {
                const { data } = await this.Api.saveUser(datas);
                if (data.code == 200) {
                    this.loading = false;
                    this.setName(data.user);
                    this.$toast(data.msg);
                } else {
                    this.$toast(data.msg);
                    this.loading = false;
                }
            } catch (error) {
                this.loading = false;
                this.$toast("修改失败,网络错误");
            }
        }
    }
};
</script>

<style scoped lang='less'>
.popup {
    height: 100%;
    width: 100%;
    background: #fff;
}
.normal {
    margin-top: 50px;
    text-align: center;
}
.normal-btn {
    width: 80%;
}
.normal-btn-default {
    margin-top: 10px;
}
.cropper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.set-avatar {
    height: 80px;
    line-height: 80px;
    display: flex;
    padding: 0 15px;
    position: relative;
    span {
        flex: 0 0 75%;
    }
    div {
        flex: 1;
        img {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            margin-right: 5px;
        }
    }
}
</style>

