<template>
    <div class="mui-fullscreen page">
        <div class="mui-navbar-inner mui-bar mui-bar-nav">
            <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                <span class="mui-icon mui-icon-left-nav"></span>
            </button>
            <h1 class="mui-center mui-title">{{type}}收货地址</h1>
            <a class="mui-pull-right" style="line-height:45px;color:#000;" @tap="type='管理'" v-show="type!='管理'">管理</a>
<a class="mui-pull-right" style="line-height:45px;color:#000;" @tap="type='选择'" v-show="type=='管理'">完成</a>
</div>
<div class="mui-content"></div>
<ul class="mui-table-view" id="area">
    <template v-for="db,i in list">
        <li class="mui-table-view-cell" @tap="select(db)">
            <p>{{db.name}} <span class="mui-pull-right"> {{db.phone}}</span></p>
            <p><span class="on" v-if="db.is_use=='1'">[默认地址]</span>{{db.province}} {{db.city}} {{db.area}} {{db.detailed}}</p>
        </li>
        <li class="mui-table-view-cell" v-if="type=='管理'">
            <div class="mui-checkbox mui-left mui-pull-left">
                <input type="checkbox" name="is_use" @change="setdef(db,$event)" v-bind="{'checked':db.is_use==1}" /><label
                    style="margin-left:-10px;margin-top:5px;width:auto;">设为默认</label>
</div>
<div class="edit mui-pull-right" style="margin-top:5px;">
<span @tap="edit(db)"><i class="mui-icon mui-icon-compose"></i>编辑</span>
<span @tap="del(db,i)"><i class="mui-icon mui-icon-trash"></i>删除</span>
</div>
</li>
</template>
</ul>
<nav class="mui-bar-tab">
    <a v-href="{path:'/Bshome/ReceiptAddress/0'}" class="mui-tab-item"><button style="background-color:#0B2E4C;color:#fff;padding: 10px 0;" type="button" class="mui-btn mui-btn-block">添加新地址</button>
</a>
</nav>
</div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; }
    .mui-bar-tab { position: fixed; z-index: 9; }
    .mui-media-body p { margin: -3px; font-size: 12px; }
    .mui-media-body { margin-bottom: 15px; }
    .mui-checkbox input[type=checkbox]:checked:before { color: #0B2E4C; }
    .mui-checkbox input[type=checkbox]:before { font-size: 20px; vertical-align: middle; }
    .edit img { width: 20px; height: 20px; vertical-align: middle; }
    .edit span { margin-right: 10px; }
    #area .mui-table-view-cell.hidden { border-bottom: 5px solid #EEEEEE; display: none; }
    .hidden { display: none; }
    /*弹出付款*/
    #sure { position: absolute; bottom: 0 !important; left: 0 !important; top: 254px !important; z-index: 999; height: 363px !important; width: 100%; border-radius: 0px !important; padding: 10px; }
    span.on { color: #FF6A27;}
</style>
<script>
    import {mapGetters,mapState,mapMutations,mapActions} from "vuex"
    import comm from "../common/comm"
export default {
    mounted(){
        this.$store.dispatch('Bsfamily/order');
        comm.loadjs("js/mui.picker.min.js","js/mui.poppicker.js")
    },
    components: {},
    data(){
        return{
            type:"选择"
        }
    },
    computed:{
        //...mapGetters(["vip"]),
        ...mapState({
            list:s=>s.gwc.addressList,
        })
    },
    methods:{
        ...mapMutations(["SET_gwc_address","SETaddressDel"]),
        select(db){
            this.SET_gwc_address(db);
            this.$router.push(sessionStorage.getItem("backurl").substr(1));
        },
        del(db,i){
            this.$api("Bsfamily/delAddress",{aid:db.aid}).then(db=>{
                this.SETaddressDel(i);
            });
        },
        setdef(db,e){
            this.$api("Bsfamily/setDefaultAddress",{aid:db.aid}).then(a=>{
                setTimeout(()=>{
                    db.is_use ="1";
                })
            });
        },
        edit(db){
            sessionStorage.setItem("editAddress"+db.aid,JSON.stringify(db))   
            this.$router.push('/Bshome/ReceiptAddress/'+db.aid);
        }
    }
    }
</script>