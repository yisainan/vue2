<template>
    <div class="mui-fullscreen">
        <form class="mui-input-group">
            <!--//province=湖北省 city=武汉市 area=洪山区 detailed=国家级孵化器(详细地址) is_use=1(是否默认地址0不是 1是) name=张宏扬 phone=18696168012-->
            <div class="mui-input-row">
                <label> 收 货 人</label>
                <input type="text" v-model="db.name" placeholder="请输入姓名">
            </div>
            <div class="mui-input-row">
                <label>联系电话</label>
                <input type="tel" class="mui-input-clear" v-model="db.phone" placeholder="请输入11位手机号"><span class="mui-icon mui-icon-clear mui-hidden"></span>
            </div>
            <div class="mui-input-row" id="showCityPicker3">
                <label>所在地区</label>
                <input type="text" placeholder="请选择" v-model="adtext" id="showCity" readonly="readonly" style="width:55%;margin-right:20px">
                <span class="mui-icon mui-navigate-right mui-pull-right"></span>
            </div>
            <!--<div class="mui-input-row">
                <label>街道</label>
                <input type="text" class="mui-input-clear" v-model="db.detailed" placeholder="请输入街道门牌信息">
            </div>-->
            <div class="mui-input-row">
                <textarea placeholder="请填写详细地址，不少于5个字" v-model="db.detailed"></textarea>
            </div>
            <div class="mui-input-row">
                <div style="line-height:30px; margin-left: 13px;">
                    设为默认
                    <div class="mui-switch mui-switch-blue mui-switch-mini" v-mui="'switch'" v-bind:class="{'mui-active':db.is_use==1}" @toggle="change">
                        <div class="mui-switch-handle"></div>
                    </div>
                </div>
            </div>
            <nav class="mui-bar-tab" style="margin: 30px 0px;padding:0 8px;">
                <button style="background-color: #0B2E4C; color:#FFFFFF;padding:5px 0px; border:none;border-radius:0px;bottom:0px;padding:10px 0px;" type="button" class="mui-btn mui-btn-block" @tap="submit">保存地址</button>
            </nav>
        </form>
    </div>
</template>
<style scoped>

</style>
<script>
export default {
    mounted(){
        var id=this.$route.params.id;
        if(id>0){
            this.db=JSON.parse(sessionStorage.getItem("editAddress"+id)) ;
        }
        var vm=this;
        require.ensure([], function(){
            var cityData3 = require('../assets/city/city.data-3.js');
            var cityPicker3 = new mui.PopPicker({
                layer: 3
            });
            cityPicker3.setData(cityData3.default);
            var showCityPickerButton = document.getElementById('showCity');
            showCityPickerButton.addEventListener('tap', function(event) {
                cityPicker3.show(function(items) {
                    vm.db.province=(items[0] || {}).text;
                    vm.db.city=(items[1] || {}).text;
                    vm.db.area=(items[2] || {}).text;
                });
            }, false);
        }, 'city');
    },
    data(){
        return{
            db:{province:"",city:"",area:"",detailed:"",is_use:0,name:"",phone:""}
        }
    },
    computed:{
        adtext(){
            if(this.db.province=="")return "";
            return this.db.province+" "+this.db.city+" "+this.db.area;
        }
    },
    methods:{
        change(e){
            var jf=e.detail.isActive;
            this.db.is_use=jf?1:0;
        },
        submit(){
            if (this.db.name == "") return mui.toast("收货人姓名不能为空!");
            if (!/^1\d{10}$/.test(this.db.phone)) return mui.toast('手机号格式不正确!');
            var id=this.$route.params.id;
            if(id==0){
                this.$api("Bsfamily/addAddress",this.db).then(db=>{
                    mui.back();
                }) 
            }else{
                this.db.aid=id;
                this.$api("Bsfamily/editAddress",this.db).then(db=>{
                    mui.back();
                }) 
            }
            
        }
    }
    }
</script>