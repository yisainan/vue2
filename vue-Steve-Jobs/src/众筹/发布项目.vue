<template>
    <div class="mui-fullscreen page">
        <ul class="mui-table-view kqzc" v-show="db.report.length==0">
            <li class="mui-table-view-cell">
                <span>开启支持回报</span>
                <div class="mui-switch mui-switch-mini" :class="{'mui-active':db.check}" @tap="db.check=!db.check">
                    <div class="mui-switch-handle"></div>
                </div>
            </li>
        </ul>
        <div class="title" v-if="cachezc&&db.report.length>0">{{cachezc.project_name}}</div>
        <div class="declare">
            <div>众筹宣言：</div>
            <textarea v-model="db.manifesto" ></textarea>
        </div>
        <ul class="mui-table-view huibao" v-if="db.check&&db.report.length>0">
            <li class="mui-table-view-cell" v-for="item,i in db.report">
                <div class="mui-slider-right mui-disabled">
                    <a class="mui-btn mui-btn-red" @tap='del(i)'>删除</a>
                </div>
                <div class="mui-slider-handle">
                    <a class="mui-navigate-right" v-href="{ name: '添加回报方式', params: { index: i }}">
                        支持<b>{{item.money}}</b>元<span class="mui-pull-right">{{item.num>0?item.num:'不限'}}</span>
                        <p class="mui-h6 mui-ellipsis">{{item.content}}</p>
					</a>
                </div>
            </li>
        </ul>
        <p class="mui-text-center">
            <button type="button" :disabled="!db.check" class="mui-btn btnadd" @tap="addhuibao">添加回报方式</button><button type="button"
                class="mui-btn submit" id="post" @tap="submit">发布项目</button>
        </p>
        <div class="checkbox mui-checkbox  mui-active">
            <input type="checkbox" v-model="tongyi" /><span @tap="tk" >阅读并同意《众筹项目发起条款》</span>
        </div>
    </div>
</template>
<style scoped>
.page{background: #FFFFFF;font-family: "微软雅黑";color: #444;}
.title{padding: 10px 10px 10px 25px;border-bottom: 1px solid #ccc}
.kqzc{height: 50px;background: #EEEEEE;padding: 3px 0 0 10px}
.mui-switch.mui-active{border-color: #7BA4C4;background-color: #7BA4C4;}
.mui-switch .mui-switch-handle{background: #D5EBFF;}
.huibao{margin-bottom: 10px;}
.huibao b{color: #D70505;}
.huibao .mui-pull-right{top:10px;right: 20px;position: relative;}
.huibao a{color:#0B2E4C }
/*中间*/
 .declare{padding: 5px 25px 0px 25px;margin-bottom:20px;}
 .declare div{color: #777;margin: 3px}



.mui-btn{width: 85%; padding:8px 0px;margin-bottom: 10px;border-color:#8194A4;color:#0B2E4C;font-size: 16px;border-radius:6px  } 
    #post{background-color:#0B2E4C ;color:#fff; border:none;}
    .btnadd:disabled{background: #ccc}
/*下面*/
.checkbox{padding:10px 0px;text-align: center;font-size: 14px}
    .mui-checkbox input[type=checkbox] { position: initial}
    .mui-checkbox input[type=checkbox]:checked:before{color: #13D011;}
     .mui-checkbox input[type=checkbox]:before{font-size: 21px;}
     input[type=checkbox]{margin: 6px 0px 0px 30px;}
    textarea { height:200px;font-size:14px;border-color: #eee;margin-bottom: 0px}
</style>
<script>
    import cache from "../common/cache"
    export default {
        created() {

        },
        mounted() {
            if (this.db.manifesto == "") {
                this.$api("Zhongchou/sendProduct", { fid: this.$route.params.id }).then(db => {
                    this.db.manifesto = db.declaration;
                });
            }
        },
        components: {},
        data() {
            return {
                cachezc: cache.get("当前众筹"),
                db: cache.get("发布众筹") || {
                    check: true,
                    manifesto: "",
                    report: []
                },
                tongyi: true
            }
        },
        // computed: {

        // },
        // watch: {

        // },
        methods: {
            addhuibao() {
                cache.set("发布众筹", this.db);
                this.$router.push({ name: '添加回报方式', params: { index: -1 } })
            },
            del(i) {
                this.db.report.splice(i, 1);
                var list = this.db.report;
                cache.set("发布众筹", this.db);
                this.db.report = [];
                this.$nextTick(() => {
                    this.db.report = list;
                });
            },
            submit() {
                if (!this.tongyi) return mui.toast("请同意项目发起条款");
                var db = this.db;
                db.fid = this.$route.params.id;
                if (!db.check) db.report = [];
                this.$api("Zhongchou/doSendProduct", db).then(db => {
                    mui.toast('发布众筹成功!');
                    cache.set("发布众筹", null);
                    this.$router.replace({ name: "发布众筹成功", params: { id: this.$route.params.id } });
                });
            },
            
        }
    }
</script>