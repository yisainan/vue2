<template>
        <!-- 返回上一页组件 -->
        <div class="icon" @click="back"><van-icon name="arrow-left" class="arrow"/></div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$emit('back')
            // this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.icon {
    position: fixed;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgba(0,0,0,.5);
    top: 1.3%;
    left: 2%;
    text-align: center;
    line-height:35px;
    z-index: 15;

}
.arrow {
    color: #fff;
    margin-top: 10px;
    margin-left: -2px;
}
</style>
