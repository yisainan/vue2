<template>
    <div class="app">
        <div class="content" ref="content">
            <slot>
                <h5>已达成</h5>
                <div>
                    <small>¥</small>100</div>
            </slot>
        </div>
    </div>
</template>
<style scoped>
    .app {
        position: relative;
        width: 150px;
        height: 150px;
        margin: 0 auto;
        overflow: hidden;
    }
    
    .content {
        position: absolute;
        top: 25px;
        z-index: 99;
        left: 25px;
        width: 100px;
        height: 100px;
        text-align: center;
        background: #ffffff !important;
        border-radius: 50%;
        display: none;
        font-family: "微软雅黑"
    }
    
    .content h5 {
        margin: 23px 0 5px 0;
        color: #bbb;
        font-size: 16px
    }
    
    .content div {
        color: #042b61;
        font-size: 20px;
    }
    
    .content p {
        font-size: 12px;
        color: #bbb;
    }
    
    .content small {
        font-size: 14px;
        position: relative;
        top: -3px
    }
</style>
<script>
    import circle from "../common/circle"
    export default {
        props: ["value"],
        mounted() {

        },
        methods: {
            update() {
                this.$refs.content.style.display = "none";
                var f = ~~this.value;
                if (f > 100) f = 100;
                if (f < 1) f = 1;
                //console.log(f, this.value);
                circle({
                    parent: document.querySelector(".app"),
                    width: 150,
                    radius: 65,
                    arc: 10,
                    perent: f,
                    color: ['#ccc', '#042b61'],
                    textColor: '#042B61',
                    textSize: '24px',
                    animated: true,
                    after: () => {
                        this.$refs.content.style.display = "block"
                    }
                });
            }
        },
        watch: {
            value() {
                this.update();
            }
        }
    }

</script>