<template>
  <div class="home" id="home">
	  <img class="home-star1 pulse animated infinite" src="../assets/star.png" alt="">
	  <img class="home-star2 pulse animated infinite" src="../assets/star.png" alt="">
	  <img class="home-star3 pulse animated infinite" src="../assets/star.png" alt="">
	  <img class="home-star4 pulse animated infinite" src="../assets/star.png" alt="">
	  <img class="home-star5 pulse animated infinite" src="../assets/star.png" alt="">
	  <img class="home-star6 pulse animated infinite" src="../assets/star.png" alt="">

  	<router-link to="/index">
      <img class="home-img" src="../assets/img.png" alt=""> 
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
	created () {
    let self = this;
		setTimeout(function(){
       self.$router.push('/index');
    },2500)
	}
}
</script>

<style scoped>
.home{
	width:100%;
	height:100%;
	background: #CB1625;
	position: relative;
	overflow: hidden;
}
.home-star1{
	position: absolute;
	left:80%;
	top:7%;
  width:2.5rem;
  height:2.5rem;
}
.home-star2{
	position: absolute;
	left:10%;
	top:18%;
  width:2.5rem;
  height:2.5rem;
  animation-delay:0.15s;
  -webkit-animation-delay:0.15s;
}
.home-star3{
	position: absolute;
	left:60%;
	top:20%;
  width:2.5rem;
  height:2.5rem;
  animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}
.home-star4{
	position: absolute;
	left:44%;
	top:41%;
  width:2.5rem;
  height:2.5rem;
  animation-delay:0.6s;
  -webkit-animation-delay:0.6s;
}
.home-star5{
	position: absolute;
	left:78%;
	top:80%;
  width:2.5rem;
  height:2.5rem;
  animation-delay:0.8s;
  -webkit-animation-delay:0.8s;
}
.home-star6{
	position: absolute;
	left:4%;
	top:90%;
  width:2.5rem;
  height:2.5rem;
  animation-delay:0.45s;
  -webkit-animation-delay:0.45s;
}
.home-img{
	width:7%;
	height:15%;
  position:absolute;
  left:48%;
  top:49%;
  transform:translate3d(-50%,-30%,0);
}
</style>