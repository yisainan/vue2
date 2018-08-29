<template>
  <div class="index" id="index">
    
    <img class="index-img1 fadeIn animated" src="../assets/txt.png" alt="">
    <img class="index-img2 fadeIn animated" src="../assets/car.png" alt="">

  	<router-link to="/timu">
      <img class="index-img fadeIn animated" src="../assets/index2.png" alt=""> 
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
	created () {

	}
}
</script>

<style scoped>
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
.fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
.index{
	width:100%;
	height:100%;
	background: url(../assets/index1.png) no-repeat center;
  background-size:100% 100%; 
	position: relative;
	overflow: hidden;
}
.index-img1{
  width:70%;
  position:absolute;
  left:55%;
  top:39%;
  transform:translate3d(-50%,-50%,0);
}
.index-img2{
  width:92%;
  position:absolute;
  left:50%;
  top:55%;
  transform:translate3d(-50%,-50%,0);
  animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}

.index-img{
	width:8rem;
	height:2.5rem;
  position:absolute;
  left:50%;
  top:85%;
  transform:translate3d(-50%,-50%,0);
  animation-delay:0.9s;
  -webkit-animation-delay:0.9s;
}

</style>