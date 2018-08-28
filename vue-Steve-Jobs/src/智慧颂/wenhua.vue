<template>
    <div class="item2" v-lazy:background-image="'img/n5/bg-0.png'">
        <canvas ref="item2_canvas"></canvas>
        <div ref="item2_div" class="animated fadeIn">
            <!--营销服务-->
            <a v-href="{path:'/Praise/Story/2'}" style="top:18%;left: 24%;animation-delay:7s" class="animated swing" v-lazy:background-image="'img/n5/2.png'"></a>
            <!--资本顶层设计-->
            <a v-href="{path:'/Praise/Story/3'}" style="top:51%;left: 6%;animation-delay:9s" class="animated swing" v-lazy:background-image="'img/n5/3.png'"
                @animationend="animationend"></a>
            <!--人才服务-->
            <a v-href="{path:'/Praise/Story/4'}" style="top:18%;left: 59%;animation-delay:5s" class="animated swing" v-lazy:background-image="'img/n5/4.png'"></a>
            <!--平台定制-->
            <a v-href="{path:'/Praise/Story/5'}" style="top:51%;left: 77%;animation-delay:2s" class="animated swing" v-lazy:background-image="'img/n5/5.png'"></a>
            <!--产业顶层设计-->
            <a v-href="{path:'/Praise/Story/1'}" style="top:48%;left:40%;animation-duration:1s" class="animated rubberBand" v-lazy:background-image="'img/n5/1.png'"></a>
        </div>
    </div>
</template>
<style scoped>
    .item2 {
        background-size: 100% 100%;
        height: 0;
        padding-bottom: 50%;
        position: relative;
        overflow: hidden;
    }
    
    .item2 canvas {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    
    .item2 a {
        display: block;
        position: absolute;
        background-size: 100% 100%;
        width: 28%;
        height: 55%;
        /*animation-delay:*/
        /*animation-iteration-count: infinite;*/
        animation-duration: 2s;
    }
</style>
<script>
    import c from "./zhexian"
    export default {
        mounted() {
            c.init(this.$refs.item2_canvas)
        },
        data() {
            return {
                src: ""
            }

        },
        methods: {
            link2(url) {

            },
            animationend() {
                window.test = this.$refs.item2_div;
                this.$refs.item2_div.style.display = 'none'
                setTimeout(() => {
                    this.$refs.item2_div.style.display = 'block'
                }, 100);
            }
        }
    }

</script>