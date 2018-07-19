<template>
  <div class="tumu" id="tumu">
	<div class="tumu-dengmi"><span>猜灯谜游戏</span></div>
	<div class="tumu-select">选择灯谜</div>
	<ul>
	  <li>
	  	<span></span>
	  	<input type="radio" name="sex" id="a" class="radio"><label @click="selectQuestion('MAGOTAN')" for="a" class="radio" >新迈腾</label>
	  </li>
	  <li>
	  	<span></span>
	  	<input type="radio" name="sex" id="b" class="radio"><label @click="selectQuestion('JETTA')" for="b" class="radio" >新捷达</label>
	  </li>
	  <li>
	  	<span></span>
	  	<input type="radio" name="sex" id="c" class="radio"><label @click="selectQuestion('SAGITAR')" for="c" class="radio" >新速腾</label></li>
	  <li>
	  	<span></span>
	  	<input type="radio" name="sex" id="d" class="radio"><label @click="selectQuestion('CTREK')" for="d" class="radio" >蔚&nbsp;&nbsp;&nbsp;领</label>
	  </li>
	  <li>
	  	<span></span>
	  	<input type="radio" name="sex" id="e" class="radio"><label @click="selectQuestion('BORA')" for="e" class="radio" >宝&nbsp;&nbsp;&nbsp;来</label>
	  </li>
	  <li>
	  	<span></span>
	  	<input type="radio" name="sex" id="f" class="radio"><label @click="selectQuestion('GOLF')" for="f" class="radio" >高尔夫</label>
	  </li>
	  <li class="lib">
	  	<span></span>
	  	<input type="radio" name="sex" id="g" class="radio"><label @click="selectQuestion('CC')" for="g" class="radio" >&nbsp;C&nbsp;&nbsp;&nbsp;C&nbsp;</label>
	  </li>
	  <li class="lib">
	  	<span></span>
	  	<input type="radio" name="sex" id="h" class="radio"><label @click="selectQuestion('SCARLETT')" for="h" class="radio" >嘉&nbsp;&nbsp;&nbsp;旅</label>
	  </li>
	</ul>
	<a class="timu-start" @click="start">开始游戏</a>
  </div>
</template>
<script>
export default {
  name: 'tumu',
  data () {
    return {
      hashStr : ''
    }
  },
  created () {
    
  },
  methods : {
    selectQuestion (str) {
      this.hashStr = str;
    },
    start () {
      if(this.hashStr == ''){
        alert('请选择车型')
      }else{
        this.$router.push('/dati?model='+this.hashStr)
      }
    }
  }
}
</script>

<style scoped>
  .tumu{
    overflow-x:hidden; 
  	overflow-y: auto;
  	background: url(../assets/bg.png) no-repeat;
  	background-size:100% 100%; 
  	color: #DDBA82;
  	padding: 0 8%; 
	  box-sizing:border-box;
  }
  .tumu-dengmi{
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
  	padding-top: 20%;
  }
  .tumu-dengmi span{
  	display: block;
  	width:4rem;
  	margin:0 auto;
    line-height: 1.4rem;
  }
  .tumu-select{
  	margin-top: 4%;
  	line-height: 1.6rem;
  	width: 5rem;
  	font-size: 1.2rem;
  	text-align: center;
  }
  ul{
  	border:0.06rem solid #DDBA82;
	  width: 100%;
	  height:13.6rem;
  }
  ul li{
  	border-bottom:0.06rem solid #DDBA82;
  	list-style: none;
  	box-sizing:border-box;
  	float: left;
  	line-height: 3.35rem;
  	width: 50%;
	  font-size: 1.4rem;
  }
  .lib{
    border-bottom: none;
  }
  ul li span{
  	margin:11% 5% 0 7%; 
  	float:left;
  	width:1.2rem;
  	height:1.4rem;
  	display: block;
  	background: url(../assets/denglong2.png) no-repeat;
  	background-size:100% 100%;
  }
  input[type='radio']{

  	opacity:0; 
  	display:none;  
  	height:1.3rem; 
  }
  label{
  	background:url(../assets/radio.png) no-repeat right center;
  	background-size:1rem 1rem;   
  	padding-right:1.67rem;
    display: block;
    width: 7rem;
  }
  input[type='radio']:checked + label {
  	background:url(../assets/radio_checked.png) no-repeat right center;
  	background-size:1rem 1rem;  
  }
  .timu-start{
  	display: block;
  	clear:both;
  	height:2rem;
  	width:6rem;
  	border-radius: 0.3rem;
  	background: #E1B787; 
  	color: #CB1625;
  	font-size: 1.3rem;
  	margin: 8% auto 0;
	  text-align: center;
  }

	
</style>