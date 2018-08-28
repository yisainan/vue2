<template>
    <div class="tab">
        <a v-for="item,i in list" v-html="item.title||item" @tap="tab=i" :style="{width:width}" :class="{'active':tab==i}"></a>
    </div>
</template>
<style>    
    .tab a{display:inline-block;border-bottom:1px solid #ddd;text-align: center;color: #888;font-size: 16px;font-family: "微软雅黑";padding: 8px }
    .tab a.active{border-bottom:2px solid #79A3C4;color: #79A2C4;}
</style>
<script>
    export default {
        props: ["list", "width"],//,"index"
        mounted() {
            if (this.list && this.list.length > 0) this.tab = 0;
        },
        data() {
            return {
                tab: -1,
            }
        },
        watch: {
            tab(t) {
                this.$emit("change", { index: t, data: this.list[t] });
            }
        },
        methods: {

        }
    }
</script>