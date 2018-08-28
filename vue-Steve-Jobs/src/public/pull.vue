<template>
    <div class="mui-scroll-wrapper" ref="box" v-bind:style="{top:top+'px'}">
        <div class="mui-pull-top-pocket mui-block" v-bind:class="{'mui-visibility':obj.y>0}" v-if="down">
            <div class="mui-pull" v-show="flag">
                <div class="mui-pull-loading mui-icon" v-bind:class="{'mui-spinner': type==2,'mui-icon-pulldown':type!=2}" v-bind:style="css1"></div>
                <div class="mui-pull-caption" v-if="type==0">下拉可以刷新</div>
                <div class="mui-pull-caption" v-if="type==1">释放立即刷新</div>
                <div class="mui-pull-caption" v-if="type==2">正在刷新</div>
            </div>
        </div>
        <div class="mui-scroll" @scrollstart.self="scrollstart" @scroll.self="scroll" @scrollbottom="scrollbottom">
            <slot>
                <div class="no-content">
                    <i></i>
                    <h4>暂无内容</h4>
                </div>
            </slot>
            <div class="mui-pull-bottom-pocket mui-block mui-visibility" v-if="type==4">
                <div class="mui-pull">
                    <div class="mui-icon mui-spinner mui-visibility" style="transition: -webkit-transform 0.3s ease-in; transform: rotate(180deg); animation: spinner-spin 1s step-end infinite;position: relative;top: 8px;"></div>
<div class="mui-pull-caption mui-visibility">正在加载...</div>
</div>
</div>
<!--<div v-if="nodata" class="nodata">已经没有更多数据</div>-->
<div v-if="nodata" class="yqxtsdkn"></div>
</div>
</div>
</template>
<style scoped>
    .mui-scroll-wrapper { position:relative;height:100%;}
    .nodata { color:#efefef;text-align:center;margin-top:10px;line-height: 30px; font-size: 12px; background:#0B2E4C}
</style>
<script>
    export default {
        mounted() {
            var box = this.$refs.box;
            this.obj = mui(box).scroll();
        },
        props: ["down", "up", "top"],
        data() {
            return {
                flag: false,
                Y: 0,
                obj: {},
                type: 0,
                nodata: false
            }
        },
        computed: {
            css1() {
                return {
                    transition: this.type > 0 ? '-webkit-transform 0.3s ease-in' : "",
                    transform: this.type > 0 ? 'rotate(180deg)' : "",
                    animation: this.type == 2 ? "spinner-spin 1s step-end infinite" : ""
                };
            }
        },
        watch: {
            type(a, b) {
                if (b == 1) {
                    this.type = 2;
                }
                if (a == 2) {
                    this.flag = false;
                    this.obj.setTranslate(0, 50);
                    this.$emit("down", () => {
                        this.type = 0;
                        this.obj.setTranslate(0, 0);
                        this.obj.reLayout();
                        this.nodata = false;
                    });
                }
            }
        },
        methods: {
            scrollstart() {
                if (this.obj.lastY <= 0) {
                    this.flag = true;
                } else {
                    this.Y = 0;
                    this.flag = false;
                }
            },
            scroll() {
                if (this.down && this.flag) {
                    this.type = this.obj.y > 50 ? 1 : 0;
                    if (this.obj.y > 0) {
                        this.Y = this.obj.y;
                    }
                }
            },
            scrollbottom() {
                if (this.nodata || !this.up || this.type == 4) return;
                this.type = 4;
                this.$emit("up", (n) => {
                    this.type = 0;
                    if (n == true) this.nodata = true;
                    this.obj.reLayout();
                });
            }
        }
    }
</script>