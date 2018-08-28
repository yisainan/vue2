<template>
    <div class="mui-fullscreen page">
        <h1 class="title" @click="message">众筹消息<span class="mui-badge"  style="top: -8px;position: relative;">{{mess}}</span></h1>
        <tab ref='tab' :list="['正在进行中','已成功','已结束']" width="33%" @change='tabchange' />
        <template v-if="tab==0">
            <ZCcard :data="item" v-for="item in begin" @link="link">
                已完成{{item.moneybl}}% 剩余{{item.residueday}}天
            </ZCcard>
            <div class="no-content" v-if="begin.length==0">
                <i></i>
                <h4>暂无众筹</h4>
            </div>
        </template>

        <template v-if="tab==1">
            <ZCcard :data="item" v-for="item in success" @link="link">
                众筹已完成，耗时{{item.haoshi}}天
            </ZCcard>
            <div class="no-content" v-if="success.length==0">
                <i></i>
                <h4>暂无众筹</h4>
            </div>
        </template>

        <template v-if="tab==2">
            <ZCcard :data="item" v-for="item in end" @link="link">
                <template v-if="item.is_raise==1">众筹已完成，耗时{{item.haoshi}}天</template>
                <template v-if="item.is_raise==0">众筹失败</template>
            </ZCcard>
            <div class="no-content" v-if="end.length==0">
                <i></i>
                <h4>暂无众筹</h4>
            </div>
        </template>
    </div>
</template>
<style scoped>
    .mui-badge{padding: 1px 3px;background-color:red; color:#fff;font-size:10px;}
.page{background: #fff;}
.title{background: #E8E8E8; font-size: 16px;margin: 0;padding: 0 20px;line-height: 40px;color: #666;}
.tab{border-top: 1px solid #ccc;margin-top:10px }
</style>
<script>
    import tab from './tab'
    import ZCcard from "./ZCcard"

    export default {
        mounted() {
            this.$api("Zhongchou/myzc").then(db => {
                Object.assign(this.$data, db);
                this.mess=db.mess;
            });
        },
        components: { tab, ZCcard },
        data() {
            return {
                tab: 0,
                begin: [],
                success: [],
                end: [],
                mess:0
            }
        },
        computed: {
            items() {
                return this.begin || [];
            }
        },
        methods: {
            tabchange({index}) {
                this.tab = index;
            },
          message(){
            	this.$router.push({name:'众筹消息'})
            },
            link(db) {
                this.$router.push({ name: 'TA的众筹', params: { uid: localStorage.getItem("uid"), id: db.eid } })
            }
        }
    }
</script>