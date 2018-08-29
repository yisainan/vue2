<template>
  <div class="yaoyao">
      <dl>
        <dd>新春大众<br/>摇一摇</dd>
        <dt><img  src="../assets/yao.png" alt=""></dt>
      </dl>
      <!-- 摇一摇功能启动后将其删掉 -->
      <!-- <router-link to="/firstPrize">下一页</router-link> -->
      <!--  -->
    </div>
</template>
<script>
  export default {
  	name: 'yaoyao',
  	created () {
      console.log(this.$parent.prize)
      var speed,self = this;
      //判断手机是否有摇一摇功能
      if (window.DeviceMotionEvent) {     //绑定devicemotion事件
        window.addEventListener('devicemotion',deviceMotionHandler, false);
      }else{
        alert('您的设备不支持摇一摇功能,系统将自动为您摇动手机^_^');
        speed = 888;    
      }
      //初始化
      var SHAKE_THRESHOLD = 800;
      var last_update = 0;
      var x, y, z, last_x, last_y, last_z;

      function deviceMotionHandler(eventData) {
        var acceleration =eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update)> 300) {
            var diffTime = curTime -last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;
              //speed = 888;
              //当速度高于阈值时
            if (speed > SHAKE_THRESHOLD) {
              self.$router.push('/'+self.$parent.prize)
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
        
      }

    }
  }
</script>

<style scoped>
  .yaoyao{
    overflow: hidden;
    background:url(../assets/bian.png) no-repeat center center #CB1625;
    background-size: 92% 92%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    color: #DDBA82;
  }
  .yaoyao dl{
    width:40%;
    text-align: center;
    margin:0 auto;
    margin-top: 45%;
  }
  .yaoyao dd{
    font-size:2rem;
    color:#E9BC85;
  }
  .yaoyao dt{
    width:60%;
    margin:0 auto;
    margin-top: 1.4rem;
  }
  .yaoyao img{
    width:100%;
  }
  
</style>