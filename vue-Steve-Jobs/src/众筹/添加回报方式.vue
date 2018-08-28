<template>
    <div class="mui-fullscreen page">
        <div class="mui-input-row">
            <label>支持金额</label>
            <input type="number" placeholder="请填写支持金额" v-model="db.money" number>
            <span class="mui-pull-right">元</span>
        </div>
        <textarea placeholder="请填写回报具体内容" v-model="db.content"></textarea>
        <div class="mui-input-row" style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc">
<label>限制数量</label>
<input type="number" placeholder="默认不限制" v-model="db.num" number>
<span class="mui-pull-right">份</span>
</div>
<p class="mui-text-center" style="margin-top: 20px">
<button type="button" class="mui-btn submit" id="post" @tap="submit">保存</button>
</p>
</div>
</template>
<style scoped>
.page{background: #FFFFFF;font-family: "微软雅黑";color: #444;}
.mui-input-row{height: 50px;line-height: 50px;padding-top: 6px}
.mui-input-row .mui-pull-right{position: absolute;right: 10px;top:0}

textarea{height: 200px;border:none; border-top:1px solid #ccc; }

.mui-btn{width: 85%; padding:8px 0px;margin-bottom: 10px;border-color:#8194A4;color:#0B2E4C;font-size: 16px;border-radius:6px  } 
    #post{background-color:#0B2E4C ;color:#fff; border:none;}
</style>
<script>
    import cache from "../common/cache"
    export default {
        created() {

        },
        mounted() {
            if (this.$route.params.index > -1) {
                this.db = this.data.report[this.$route.params.index];
            }
        },
        components: {},
        data() {
            return {
                data: cache.get("发布众筹") || {
                    check: true,
                    manifesto: "",
                    report: []
                },
                db: {
                    money: '',
                    content: "",
                    num: ''
                }
            }
        },
        // computed: {

        // },
        // watch: {

        // },
        methods: {
            submit() {
                if (~~this.db.money <= 0) return mui.toast('请输入正确的支持金额!');
                if (~~this.db.money > 0 && this.db.content != '') {
                    this.db.num = ~~this.db.num;
                    if (this.$route.params.index > -1) {
                        this.db = this.data.report[this.$route.params.index];
                    } else {
                        this.data.report.push(this.db);
                    }
                    cache.set("发布众筹", this.data);
                    mui.back();
                }
            }
        }
    }
</script>