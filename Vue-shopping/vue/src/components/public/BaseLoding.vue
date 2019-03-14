<template>
    <!-- 数据加载提示loadding -->
    <div class="loader31 loader" v-show="showFlag">
        <div class="loader-31">
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    props: {
        showFlag: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style lang="css" scoped>
.loader {
    width: 40px;
    height: 40px;
    margin: auto;
    float: left;
    justify-content: center;
    display: flex;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 13%;
    transform: translateX(-50%);
}
@-webkit-keyframes loader31 {
	0% {
		-webkit-transform: scale(1);
		opacity: 0.5;
	}
	50% {
		-webkit-transform: scale(0);
		opacity: 1;
	}
	100% {
		-webkit-transform: scale(1);
		opacity: 0.5;
	}
}
.loader-31 {
    width: 40px;
	height: 40px;
	position: relative;
}
.loader-31 div {
	width: 40px;
	height: 40px;
	border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
	background: #fff;
	opacity: 0.5;
}
.loader-31 div:nth-child(1) {
    background: #acb9c8;
	-webkit-animation: loader31 2s 0s infinite ease-in-out;
}
.loader-31 div:nth-child(2) {
    background: #5B7492;
	-webkit-animation: loader31 2s -1s infinite ease-in-out;
}
</style>
