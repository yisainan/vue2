<template>
  <div id="app">
    <img class="app-img" src="./assets/logo.png">
    <div class="music">
      <img src="./assets/music.png" @click="music" :class="{autoplay:isPlay}" />
      <audio id="audio1" style="display:none" autoplay loop src="http://125.39.59.10/xdispatch/7xs7hz.com1.z0.glb.clouddn.com/baowo2.m4a">
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
    <router-view class="app-view"></router-view>
  </div>
    <!-- <div>
      <Alert :title="title":value="value"></Alert> 
    </div> -->
</template>

<script>
//rem 适配
import { setREM } from './script/util';
import { Alert } from 'vux';
import home from './components/home';
export default {
  components:{
    home,
    Alert
  },
  name: 'app',
  methods : {
    music () {
      var myAudio = document.getElementById('audio1');
      if(myAudio.paused){
          this.isPlay = true
          myAudio.play();
      }else{
          this.isPlay = false
          myAudio.pause();
      }
    }
  },
  data (){
    return{
      title : "测试",
      value : true,
      show : true,
      demo1 : "",
      prize : '',
      isPlay : true
    }
  },
  created () {

    setREM()
    this.$http({
      url : '/api/question',
      method : '',
      params : {act:"chek"}
    })    
    .then(function(res){
      if(res.body.data.is_answer == 1){
        this.$router.push('/buycar')
      }else if(res.body.data.is_ziliao == 1){
        this.$router.push('/shake')
      }else if(res.body.data.is_finish == 1){
        this.$router.push('/shake')
      }
    },function(err){
      console.log(err)
    })
  }
}

</script>

<style lang="less">
@import '~vux/src/styles/index.less';
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: -webkit-flex;
  display: flex;
  flex-direction:column;
}
a{
  color: #DDBA82;
}
.app-img{
  width: 100%;
  height: 3rem;
}
.app-view{
  -webkit-flex:1;
  flex:1;
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@keyframes pulse {
  0% {
    -webkit-transform: scale3d(0.5, 0.5, 0.5);
    transform: scale3d(0.5, 0.5, 0.5);
  }
  25% {
    -webkit-transform: scale3d(0.7, 0.7, 0.7);
    transform: scale3d(0.7, 0.7, 0.7);
  }
  50% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  75% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
  }
  100% {
    -webkit-transform: scale3d(2, 2, 2);
    transform: scale3d(2, 2, 2);
  }
}
.pulse {
  -webkit-animation-name: pulse;
  animation-name: pulse;
}
.clearfix:after{
  clear:both;
  display:block;
  visibility:hidden;
  height:0;
  content:".";
}

</style>
