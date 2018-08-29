<template>
  <div class="right" id="right">
  	<div class="right-test"><span>恭喜你已答对所有题目</span></div>
  	<router-link to="/buycar" class="right-start">我要抽奖</router-link>
  </div>
</template>
<script>
  export default {
  	name: 'right',
  	created () {
  	
    }
    
  }
</script>

<style scoped>
  .right{
 	  overflow: hidden;
  	background: url(../assets/bg_2.png) no-repeat;
  	background-size: 100% 100%;
  	color: #DDBA82;
  }
  input[type='radio']{
  	opacity:0; 
  	display:inline-block;  
  	height:1.3rem; 
  }
  label{
  	background:url(../assets/radio.png) no-repeat right center;
  	background-size:1rem 1rem;   
  	height:1.3rem; 
  	padding-right:1.67rem;
  }
  input[type='radio']:checked + label {
  	background:url(../assets/radio_checked.png) no-repeat right center;
  	background-size:1rem 1rem;  
  }
  ul{
  	width: 100%;
  	box-sizing:border-box;
  	padding: 0 10%;
  	height:auto;
  	margin-bottom: 10%;
  }
  ul li{
  	list-style: none;
  	box-sizing:border-box;
  	float: left;
  	line-height: 3.4rem;
	  font-size: 1.3rem;
	  padding-left:;
  }
  .right-test{
  	box-sizing:border-box;
  	margin: 5% auto;
  	width: 60%;
  	height: 60%;
    min-height: 24rem;
	  background: url(../assets/denglong3.png) no-repeat;
	  background-size:100% 100%; 
	  padding-top: 45%;
  }
  .right-test span{
  	display: block;
  	width: 80%;
  	margin: 0 auto;
  	font-size: 1.5rem;
  	text-align: center;
    line-height: 1.7rem;
  }
  .right-start{
  	display: block;
  	clear:both;
  	height:2rem;
  	width:6rem;
  	border-radius: 0.3rem;
  	background: #E1B787; 
  	color: #CB1625;
  	font-size: 1.3rem;
  	margin: 4.6rem auto;
	  text-align: center;
	
  }
  
</style>