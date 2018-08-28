<template>
    <div v-if="data">
        <img class="poster_map" :src="data.poster_map" :style="{height:height+'px'}" @tap="$emit('link',data)" />
        <div class="progress">
            <p class="mui-progressbar mui-progressbar-in">
                <span :style="{'transform':'translate3d(-'+(100-bili)+'%, 0px, 0px)' }"></span>
            </p>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.poster_map{width: 100%;margin-top: 2px;}
.progress,.content{padding:0 20px;}
.mui-progressbar{height: 10px;margin: 5px 0;}
.mui-progressbar span{background: url(./progress.png);background-size: cover;}
.content{margin-bottom: 15px;color: #999;font-family: "微软雅黑";font-size: 16px}
</style>
<script>
    //import {mapGetters,mapState,mapMutations,mapActions} from "vuex"
    //import Hello from './components/Hello'
    export default {
        props: ["data"],
        created() { this.height = window.innerWidth * 30 / 64; },
        // mounted() {
        //     console.log(this.bili)
        // },
        components: {},
        data() {
            return {
                height: 0
            }
        },
        computed: {
            bili() {
                var f = ~~(this.data.moneybl);
                if (f < 1) f = 1;
                if (f > 100) f = 100;
                return f;
            }
        },
        // watch: {

        // },
        methods: {
            //...mapMutations(["zzzz"]),
            //...mapActions(["fundddd"]),
            //submit(){
            //
            //}
        }
    }
</script>