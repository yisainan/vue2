<template>
    <!-- 下拉刷新组件 -->
    <div class="refresh" :style="transform" :class="[{transition:trans}]">
        <i :class="{rotate:isRotate}" :style="opac">刷</i>
    </div>
</template>

<script>
export default {
    props: {
        transformY: {
            type: Number,
            default: 0
        },
        
        rotate: {
            type: Number,
            default: 0
        },

        isRotate: {
            type: Boolean,
            default: false
        },

        trans: {
            type: Boolean,
            default: false
        },

        opacity: {
            type: Number,
            default: 0
        }

    },

    computed: {
        transform() {
            return `transform: translate3d(0,${this.transformY}px,0) rotate(${this.rotate}deg)`
        },

        opac() {
            return `opacity: ${this.opacity}`
        }
        
    }
}
</script>

<style lang="stylus" scoped>
.transition
    transition .5s
.refresh
    position: absolute;
    top: -42px;
    left: 50%;
    z-index: 3;
    background-color: #fff;
    width: 40px;
    height: 40px;
    line-height: 44px;
    margin-left: -30px;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    text-align: center; 
    i
        color: #E58267;
        font-size: 18px;
        font-family: "仿宋";
        font-weight: bold;
        display: inline-block;

    @-webkit-keyframes rotate 
        0% 
            -webkit-transform: rotate(0deg) translate3d(0, 0, 0);
            transform: rotate(0deg) translate3d(0, 0, 0);
        100% 
            -webkit-transform: rotate(360deg) translate3d(0, 0, 0);
            transform: rotate(360deg) translate3d(0, 0, 0);
    @keyframes rotate 
        0% 
            -webkit-transform: rotate(0deg) translate3d(0, 0, 0);
            transform: rotate(0deg) translate3d(0, 0, 0);
        100% 
            -webkit-transform: rotate(360deg) translate3d(0, 0, 0);
            transform: rotate(360deg) translate3d(0, 0, 0);
    .rotate 
        -webkit-transform-origin: 50% 48%;
        transform-origin: 50% 48%;
        -webkit-animation: rotate 0.8s infinite;
        animation: rotate 0.8s infinite;
</style>

