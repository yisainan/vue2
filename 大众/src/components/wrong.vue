<template>
  <div class="wrong" id="wrong">
  	<div class="wrong-test"><span>很遗憾您没有答对</span></div>
  	<router-link to="/timu" class="wrong-start">重新答题</router-link>
  </div>
</template>
<script>
  export default {
  	name: 'wrong',
  	created () {
  	
    }
  }
</script>

<style scoped>
  .wrong{
 	  overflow: hidden;
  	background: url(../assets/bg_2.png) no-repeat;
  	background-size: 100% 100%;
  	color: #DDBA82;
  }
  .wrong-test{
  	box-sizing:border-box;
  	margin: 5% auto;
  	width: 60%;
  	height: 60%;
    min-height: 26rem;
	  background: url(../assets/denglong3.png) no-repeat;
	  background-size:100% 100%; 
	  padding-top: 43%;
  }
  .wrong-test span{
  	display: block;
  	width: 80%;
  	margin: 0 auto;
  	font-size: 1.5rem;
  	text-align: center;
    line-height: 1.7rem;
  }
  .wrong-start{
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