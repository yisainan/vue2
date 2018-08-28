<template>
    <div class="item" v-href="href" :style="{height:height+'px','margin-top':top+'px'}">
        <img :src="src" v-if="src" />
        <p class="title">{{title}}</p>
    </div>
</template>
<style scoped>
   .item { position: relative; float: left; width: 100%; }
        .item img { width: 100%; height: 100%; float: left; }
        .item .title { width: 100%; position: absolute; bottom: 0; clear: both; background: rgba(11, 46, 76,.8); margin: 0; text-align: center; color: #eee;line-height: 30px; }
</style>
<script>
    export default {
        props: ["title", "src", "href","top"],
        created() {
            this.height = window.innerWidth * 30 / 64;
        },
//          mounted() {
//           setTimeout(()=>{
// console.log("src",this.src)
//           },200)
//         },
        data() {
            return { height: 0 }
        },
        methods: {
            click(t, item) {

            }
        }
    }
</script>