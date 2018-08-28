<template>
    <div class="page">
        <div style="text-align: left;background-color: #EFEFEF">
            <a class="mui-table-view-cell" style="padding: 15px 0;display: block;color: #000000;font-size: 15px;" v-href="{name:'收货地址'}" v-if="data2.reciver==''">
                <span style="padding: 8px 10px;" class="mui-icon mui-icon-location mui-pull-left"></span>
                <p style="display: inline-block;font-size: 15px;line-height:42px;padding-left:50px;">请选择收货地址</p>
                <span class="mui-icon mui-icon-arrowright mui-pull-right" style="color:#CCCACC ;margin: 8px 10px;"></span>
            </a>
            <a class="mui-table-view-cell" style="padding: 15px 0;display: block;color: #000000;font-size: 15px;" v-href="{name:'收货地址'}" v-if="data2.reciver!=''">
                <span style="padding: 8px 10px;" class="mui-icon mui-icon-location mui-pull-left"></span>
                <p style="display: inline-block;font-size: 15px;">收货人：{{data2.reciver_name}}   {{data2.reciver_telphone}} <br />{{data2.reciver_province}}  {{data2.reciver_city}}  {{data2.reciver}} </p>
                <span class="mui-icon mui-icon-arrowright mui-pull-right" style="color:#CCCACC ;margin: 8px 10px;"></span>
            </a>
        </div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="db in goods">
                <h4 style="font-weight:300;border-bottom:1px solid #ccc;padding-bottom:10px;">选择商品</h4>
                <div class="mui-row">
                    <div class="mui-media-body">
                        <img v-bind:src="db.goods_image" class="mui-pull-left" style="width:70px;height:70px;margin-right:10px;" />
                        <div style="padding-top:5px;">
                            {{db.goods_name}}
                            <p>{{db.sp_name}}：{{db.sp_value_name}}</p>
                            <div><span class="mui-pull-left" style="font-size:17px;">￥{{db.price}}</span><span class="mui-pull-right" style="font-size:13px;">X{{db.num}}</span></div>
                        </div>
                    </div>
                    <div class="mui-clearfix mui-pull-right mui-numbox" data-numbox-min='1' style="width:90px;height:30px;padding: 0 30px;border-radius:0px;" v-mui="'numbox'">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" style="width:30px;">-</button>
                        <input id="box" class="mui-input-numbox" type="number" v-model="db.num" @change="db.num=~~$event.srcElement.value||1" />
                        <button class="mui-btn mui-btn-numbox-plus" type="button" style="width:30px;">+</button>
                    </div>
                    <p class="mui-pull-right" style="clear:both;color:#8792C4;margin:10px 0px;">支持7天无理由退货</p>
                </div>
            </li>
            <li class="mui-table-view-cell" style="margin-top:10px;">
                <div>
                    配送方式
                    <p v-if="other.goods_freight==0" class="mui-pull-right">免邮</p>
                    <p v-if="other.goods_freight>0" class="mui-pull-right">邮费:¥{{other.goods_freight}}</p>
                </div>
            </li>
        </ul>
        <ul class="mui-table-view" style="margin-top:10px;">
            <!--<li class="mui-table-view-cell">
                发票信息 <a href="#topPopover" class="mui-pull-right ">个人不开发票<span class="mui-icon mui-icon-arrowright"></span></a>
            </li>-->
            <li class="mui-table-view-cell">
                积分抵现 (可用积分抵￥{{other.integral}})
                <div class="mui-switch mui-pull-right mui-switch-mini" v-mui="'switch'" @toggle="changejf">
                    <div class="mui-switch-handle"></div>
                </div>
            </li>
            <li class="mui-table-view-cell">
                <textarea style="padding:3px;margin:0px" rows="1" placeholder="订单备注：对本次交易的说明">{{data.order_message}}</textarea>
            </li>
        </ul>
        <div style="height:50px;"></div>

        <nav class="mui-bar-tab" style="background-color:#fff;">
            <span class="mui-tab-item mui-pull-riight" style="width: 100%;font-size: 15px; color:#181818;padding-right: 15px;text-align:right;line-height:50px;">
                合计:<span style="color:#0B2E4C;">￥{{yinfu |f2}}</span>
            </span>
            <a class="mui-tab-item" style="width:30%; background-color:#0B2E4C;color: #FFFFFF;" @tap="submit">
                确认付款
            </a>
        </nav>
    </div>
</template>
<style scoped>
    .page { font-family: "微软雅黑"; font-size: 15px; }
    .mui-content { background-color: #EEEEEE; }
    .popover { background: #fff; position: fixed; bottom: 0; margin-bottom: 0 !important; width: 100%; padding: 8px; }
    .mui-table-view-cell.mui-checkbox.mui-left, .mui-table-view-cell.mui-radio.mui-left { padding-left: 15px; }
    .mui-table-view .mui-media-object { line-height: 80px; max-width: 80px; border-radius: 5px; height: auto; }
    /*/*.mui-table-view-cell:after{height: 0px;}*/ /*这个是把li的线隐藏啦*/
    .mui-table-view:before, .mui-table-view:after { height: 0px; }
    textarea { border: 0px solid rgba(0,0,0,.2); font-size: 15px; height: 50px; }
    .mui-table-view-cell.mui-active { background-color: #FFFFFF; }

    #address1 .mui-table-view-cell { }
    #address2 .mui-input-group .mui-input-row { height: 60px; }
    #address2 .mui-input-row label { padding: 21px 15px; }
    #address2 input[type=text] { height: 60px; }
    #address2 .mui-input-group .mui-input-row:after { background-color: #ddd; left: 0px; }
    #address2 .mui-input-group:before, #address2 .mui-input-group:after { height: 0px; }

    .mui-media-body p { margin: -3px; font-size: 12px; }
    .mui-media-body { margin-bottom: 15px; }
    .mui-checkbox input[type=checkbox]:checked:before { color: #0B2E4C; }
    .mui-checkbox input[type=checkbox]:before { font-size: 20px; vertical-align: middle; }
    .edit img { width: 20px; height: 20px; vertical-align: middle; }
    .edit span { margin-right: 10px; }
    #area .mui-table-view-cell.hidden { border-bottom: 5px solid #EEEEEE; display: none; }
    .hidden { display: none; }
    nav {     position: fixed;}
</style>
<script>
    import {mapGetters,mapState,mapMutations,mapActions} from "vuex"
export default {
    mounted(){
        this.$store.dispatch('Bsfamily/order');
        this.$api("Member/shoppinginfo",{shid:this.$route.params.id}).then(db=>{
            this.goods=db.goods;
            this.other=db.other;
        });
        sessionStorage.setItem("backurl",location.hash)
    },
    data(){
        return {
            goods:[],
            other:{integral:0,goods_freight:"0.00"},
            data:{
                type:0,
                order_message:""
            }
        }
    },
    computed:{
        ...mapState({
            data2:s=>s.gwc.data,
            aid:s=>s.gwc.aid,
        }),
        yinfu(){
            var p=0
            this.goods.forEach(a=>{
                p+=a.num*a.price;
            });
            p+=this.other.goods_freight-0;
            if(this.data.type){
                p-=this.other.integral
            }
            if(p<0)p==0;
            return p;
        }
    },
    methods:{
        changejf(e){
            var jf=e.detail.isActive
            this.data.type=jf?1:0;
        },
        submit(){            
            if(this.aid==0)return mui.toast("请选择一个收货地址");
            var data=this.data;
            data.aid=this.aid;
            data.shid=this.goods.map(a=>{ return {id:a.shid,num:a.num}});
            data.goods_freight=this.other.goods_freight;
            this.$api("Member/shoppingpay",data).then(db=>{
                this.$router.replace({name:"付款",params:{id:"none"} });
            });
        }
    }
    }
</script>