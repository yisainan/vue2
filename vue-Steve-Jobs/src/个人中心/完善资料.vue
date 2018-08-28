<template>
    <div class="page">
        <div class="mui-content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell" style="line-height:60px">
                    <a @tap.self="touxiang">头像<span class="mui-pull-right mui-navigate-right"><img v-bind:src="db.head_url" v-imgdef class="circle" /></span></a>
                </li>
                <li class="mui-table-view-cell">
                    <a @tap="edit1">会员名<span class="mui-pull-right mui-navigate-right">{{db.vname}}</span></a>
                </li>
                <li class="mui-table-view-cell">
                    性别
                    <span class="mui-pull-right mui-navigate-right">
                        <select class="mui-btn-block" v-model="db2.sex" @change="edit2"><option value="1">男</option><option value="0">女</option></select>
                    </span>
                </li>
                <li class="mui-table-view-cell" @tap="editdate">
                    <a>生日<span class="mui-pull-right mui-navigate-right" v-if="db2.btime!=null">{{db2.btime |dateShort}}</span></a>
                </li>
                <!--<li class="mui-table-view-cell">
                    <a v-href="{name:'提现银行'}">绑定银行卡<span class="mui-pull-right mui-navigate-right"></span></a>
                </li>-->
                <li class="mui-table-view-cell">
                    <a v-href="{name:'收货地址'}">我的收货地址<span class="mui-pull-right mui-navigate-right"></span></a>
                </li>
            </ul>
        </div>


    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; }
    .circle { width: 60px; height: 60px; border-radius: 50%; vertical-align: middle; }
    .mui-pull-right { margin-right: 20px; }
    select { padding: 0px; margin-bottom: 0px; }
</style>
<script>
    import comm from "../common/comm"
export default {
    mounted(){
        this.$api("Member/index").then(db=>{
            this.db=db;
        });
        this.$api("Member/vipinfo").then(db=>{
            this.db2=db;
        });
        comm.loadjs("js/mui.picker.min.js","js/mui.poppicker.js")
    },
    components: {},
    data(){
        return{
            db:{},
            db2:{}
        }
    },
    computed:{
        //...mapGetters(["vip"]),
        //...mapState({
        //_view:s=>s.view,
        //})
    },
    watch:{

    },
    methods:{
        touxiang(){
            //mui.toast("修改头像!");
        },
        edit1(){
            mui.prompt("请输入新的姓名",this.db.vname,({index,value})=>{
                if(index!=1||value=='')return;
                this.$api("Member/editinfo",{vname:value}).then(db=>{
                    this.db.vname=value;
                    //mui.toast("姓名修改成功!");
                })
            });
        },
        edit2(e){
            this.$api("Member/editinfo",{sex:this.db2.sex}).then(db=>{
                //mui.toast("性别修改成功!");
            })
        },
        editdate(){
            var picker = new mui.DtPicker({"type":"date","beginYear":1970,"endYear":2016,"value":this.$root.$options.filters.dateShort(this.db2.btime)});
            picker.show((rs)=>{
                this.$api("Member/editinfo",{btime:rs.text}).then(db=>{
                    this.db2.btime=new Date(rs.text)/1000;
                    //mui.toast("修改生日成功!");
                })
                picker.dispose();
            });
        }
    }
    }
</script>