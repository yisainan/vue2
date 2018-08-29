<template>
	<div class="music" v-music>
     <img src="./assets/music.png" @click="music" :class="{autoplay}" />
     <audio id="audio1" style="display:none" autoplay loop src="http://125.39.59.10/xdispatch/7xs7hz.com1.z0.glb.clouddn.com/baowo2.m4a">
       您的浏览器不支持 audio 标签。
     </audio>
   </div>
</template>
<script>
	export default{
	components:{
	   music 
  	},
  	name: 'music'

	}
</script>
<style>

.music img{
  max-width:100%;
  position: fixed;
  z-index: 999;
  width: 2.5rem;
  height: 2.5rem;
  left: .5rem;
  top: 3.5rem;
}
.autoplay {
  -webkit-animation: rotate 1s linear infinite;
  animation: rotate 1s linear infinite;
}
@keyframes rotate{ 0%{
    -webkit-transform:rotate(0);
  }
  to{
    -webkit-transform:rotate(360deg);
  }
}
@-webkit-keyframes rotate{ 0%{
    -webkit-transform:rotate(0);
  }
  to{
    -webkit-transform:rotate(360deg);
  }
}
</style>
