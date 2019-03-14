<template>
    <div id="app">
        <transition :name="animate">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view id="view"></router-view>
            </keep-alive>
            <router-view v-else id="view"></router-view>
        </transition>
    </div>
</template>

<script>
import { vuexData } from "js/mixin";
export default {
    mixins: [vuexData],
    name: "App",
    data() {
        return {
            tabArr: [
                { id: 1, title: "商城", icon: "wap-home" },
                { id: 2, title: "分类", icon: "wap-nav" },
                { id: 3, title: "购物车", icon: "shopping-cart" },
                { id: 4, title: "我的", icon: "contact" }
            ],
            animate: ""
        };
    },

    methods: {
        // 切换路由
        change(i) {
            const pageName = ["Home", "Category", "ShoppingCart", "My"];
            this.$router.push({ name: pageName[i - 1] });
        },

        async keeplogin() {
            try {
                const { data } = await this.Api.keeplogin();
                if (data.code == 200) {
                    this.setName(data.userInfo);
                }
            } catch (error) {
                this.$toast("网络错误");
            }
        }
    },

    created() {
        // this.keeplogin();
    },
    watch: {
        $route(to, from) {
            let animate = this.$router.animate;
            let tabPages = ["My", "ShoppingCart", "Category", "Home"];
            if (tabPages.includes(to.name) && animate != 2) {
                this.animate = "fade";
            } else {
                this.animate = "slide-left";
            }
            if (animate == 1) {
                this.animate = "slide-right";
            }
            this.$router.animate = 0;
        }
    },
};
</script>
<style>
#app {
    width: 100%;
    height: 100%;
}
.van-tabbar-item--active {
    color: transparent;
}
.fade-enter {
    opacity: 0;
}

.fade-leave {
    opacity: 1;
}

.fade-enter-active {
    transition: opacity 0.3s;
}

.fade-leave-active {
    opacity: 0;
    transition: opacity 0s;
}
#view {
    width: 100%;
    height: 100%;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
}
.slide-top-enter,
.slide-bottom-leave-active {
    opacity: 0;
    transform: translate(0, 100%);
}
.slide-top-leave-active,
.slide-bottom-enter {
    opacity: 0;
    transform: translate(0, -100%);
}
</style>

