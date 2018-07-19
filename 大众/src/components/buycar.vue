<template>
  <div class="buycar" id="buycar">
	<div class="buycar-dengmi"><span>购车有礼</span></div>
  	<ul>
  	  <li>
        <div class="buy-box1">
          <label for="">姓&nbsp;&nbsp;&nbsp;名:</label><input type="text" id="buy-name" v-model="buyname" name="name">
        </div>
  	  </li>
      <li>
        <div class="buy-box1">
          <label for="">姓&nbsp;&nbsp;&nbsp;名:</label><input type="text" id="buy-name" v-model="buyname" name="name">
        </div>
  	  </li>	
        
  	  <li class="lia">
  	  	<label for="">请选择就近城市经销商:</label>
  	  </li>
      <li class="lia">
        <span v-show="showProvince">请选择省份</span>
        <span v-show="showCity" style="left:52%">请选择城市</span>
        <select v-model="buystore1" class="province">
          <option :value="val" v-for="(val,key) in stores">
            {{key}}
          </option> 
        </select>
        <select v-model="buystore2" class="city">
          <option :value="val" v-for="(val,key) in buystore1">
            {{key}}
          </option> 
        </select>
      </li>
      <li class="lia">
        <span v-show="showShop">请选择经销商</span>
        <select v-model="buystore3" class="shop">
          <option :value="i" v-for="i in buystore2">
            {{i}}
          </option> 
        </select>
      </li>
  	  <li class="lib">
        <div @click="goto()" class="buycar-start">
  	  	  确认提交
        </div>
  	  </li>
  	</ul>
  </div>
</template>
<script>
import _$ from 'jquery'
export default {
  name: 'buycar',
  data () {
    return{
      buyname:"",
      buysex:"",
      buystore1:"",
      buystore2:"",
      buystore3:"",
      buymodel:"",
      buydate:"",
      buyidcard:"",
      buymobile:"",
      stores : '',
      showProvince : true,
      showCity : true,
      showShop : true
    }
  },
  watch : {
    buystore1 (nval,oval) {
      if(nval !== oval){
        this.showProvince = !this.showProvince
        this.showProvince = false
        this.showCity = true
      }
    },
    buystore2 (nval,oval) {
      if(nval !== oval){
        this.showCity = !this.showCity
        this.showCity = false
        this.showShop = true

      }
    },
    buystore3 (nval,oval) {
      if(nval !== oval){
        this.showShop = !this.showShop
      }
    }

  },
  methods:{
    goto () {
      console.log(this.buystore3)
      if(this.buyname && this.buysex && this.buystore3 && this.buymodel && this.buydate && this.buyidcard && this.buymobile){
        //手机号
        if(!(/^1[34578]\d{9}$/.test(this.buymobile))){ 
            alert("手机号码有误，请重填");  
            return false; 
        }
        //身份证
        if(!(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(this.buyidcard))){ 
            alert("身份证号码有误，请重填");  
            return false; 
        } 
        //日期格式 为以下几种  2012-05-14、2012/05/6、2012.5.14、20120528
        if(!(/^[1-9]\d{3}([-|\/|\.])?((0\d)|([1-9])|(1[0-2]))\1(([0|1|2]\d)|([1-9])|3[0-1])$/.test(this.buydate))){ 
            alert("日期格式有误，请重填");  
            return false; 
        }
        this.$http({
          url : '/api/lottery',
          method : 'POST',
          body : {
            'act':'lottery',
            'name':this.buyname,
            'sex':this.buysex,
            'store':this.buystore3,
            'model':this.buymodel,
            'date':this.buydate,
            'idcard':this.buyidcard,
            'mobile':this.buymobile
          }
        }).then(function(res){
          var data = JSON.parse(res.body)
          this.$parent.prize = data.data.prize
          this.$router.push('/shake')
        }, function(err){
          console.log(err);// 响应错误回调
        });

      }else{
        alert('请填写完整信息')
        return false;
      }
    }
  },
  
  created () {
  	this.$http({
      url : '/api/stores',
      method : 'GET',
      params : { act : 'stores' }
    })
    .then(function(res){
      this.stores = res.body.data
      // console.log(res.body.data['北京市']['东城区'])
    },function(err){
      console.log(err)
    });
  }
}
</script>

<style scoped>
  .buycar{
    overflow: hidden;
    background: url(../assets/bg_3.png) no-repeat;
    background-size:100% 100%; 
    color: #DDBA82;
    padding: 0 8%; 
    box-sizing:border-box;
  }
  .buycar-dengmi{
    margin-top: 4%;
    box-sizing:border-box;
    background: url(../assets/denglong.png) no-repeat;
    background-size: 100% 100%; 
    margin-left: 60%;
    line-height: 1.6rem;
    width:40%;
    height:30%;
    min-height: 12rem;
    font-size: 1.2rem;
    text-align: center;
    padding-top: 24%;
  }
  .buycar-dengmi span{
    display: block;
    width:5rem;
    margin:0 auto;
  }
  ul{
    margin-top:1rem;
    border:0.06rem solid #DDBA82;
    width: 100%;
    height:12rem;
  }
  ul li{
    border-bottom:0.06rem solid #DDBA82;
    list-style: none;
    box-sizing:border-box;
    line-height: 2rem;
    height:1.8rem;
    width: 100%;
    font-size: 1rem;
  }
  ul li input{
    padding-left: 0.2rem;
    background: none;
    border: none;
    outline: none;
    width:4rem;
    color:#ccc;
    font-size: 0.9rem;
  }
  ul li select{
    padding-left:1rem; 
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background:transparent;
    background-size:.8rem; 
    border: none;
    outline: none;
    color:#aaa;
  }
  .lia{
    padding-left:2%;
    position: relative;
  }
  .lia select{
    position: absolute;
    z-index: 33;
    top:30%;
  }
  .lia span{
    position: absolute;
    z-index: 1;
    color: #aaa;
    font-size: 15px;
  }
  .city{
    left: 50%;
  }
  
  .lib{
    border-bottom: none;
  }
  .buy-box1{
    height: 100%;
    float: left;
    width: 44%;
    padding-left:2%;
    display: -webkit-flex;
    display: flex;
  }
  .buy-box2{
    height:100%;
    float: right;
    width:54%;
    display: -webkit-flex;
    display: flex;
  }
  .buycar-start{
    display: block;
    clear:both;
    height:2rem;
    width:6rem;
    border-radius: 0.3rem;
    background: #E1B787; 
    color: #CB1625;
    font-size: 1.3rem;
    margin: .6rem auto 0;
    text-align: center;
  }
</style>