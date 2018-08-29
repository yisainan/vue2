<template>
  <div class="secondprize">
      <div class="secondprize_header">
            二等奖
        </div>
        <div class="showPrize" v-if="isShow">
          <div v-if="isCur===1">
            <img src="../assets/zhaguo.png" alt="" />
            <p>
              飞利浦空气炸锅
            </p>
          </div>
          <div v-else-if="isCur===2">
            <img src="../assets/sound.png" alt="" />
            <p>
              索尼（SONY）HT-CT390
            </p>
          </div>
          <div v-else-if="isCur===3">
            <img src="../assets/toothbrush.png" alt="" />
            <p>
              博朗3d牙刷尊享版
            </p>
          </div>
          <p class="tos">请您在购车后,<br/>到购车经销商店领取奖品</p>
          <!-- 跳转合成页面 -->
          <a href="" class="secondprize-start">下一步</a>
        </div>
        <div class="secondprize_content" v-else="isShow">
            <div class="secondprize_box">
                <dl>
                    <dt><img src="../assets/zhaguo.png" alt="" @click="selectPrize(1)" :class="{active:isCur===1}"></dt>
                    <dd>飞利浦空气炸锅</dd>
                </dl>
                <dl>
                    <dt><img src="../assets/sound.png" alt="" @click="selectPrize(2)" :class="{active:isCur===2}"></dt>
                    <dd>索尼（SONY）HT-CT390</dd>
                </dl>
                <dl>
                    <dt><img src="../assets/toothbrush.png" alt="" @click="selectPrize(3)" :class="{active:isCur===3}"></dt>
                    <dd>博朗3d牙刷尊享版</dd>
                </dl>
            </div>
            <div class="secondprize_box2">
                <h2>选择其中一款产品</h2>
                <p>请您在购车后,<br/>到购车经销商店领取奖品</p>
                <a @click="showPrize" class="secondprize-start">领取奖品</a>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
  	name: 'secondprize',
  	data () {
      return {
        isCur : '',
        isShow : false
      }
    },
    created () {
    
    },
    methods : {
      selectPrize (id) {
        this.isCur = id
      },
      showPrize () {
        (this.isCur) && (this.isShow = !this.isShow)
      }
    }
  }
</script>

<style scoped>
  .showPrize {
    text-align: center;
    font-size: 1.4rem
  }
  .tos {
    padding: 5% 0;
  }
  .secondprize{
    overflow: hidden;
    color: #DDBA82;
    background:url(../assets/bian.png) no-repeat center center #CB1625;
    background-size: 92% 92%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .secondprize_header{
    width: 100%;
    height:5.33rem;
    line-height: 5.33rem;
    font-size:2rem;
    margin-top: 3.33rem;
    text-align: center;
    color:#E3B78A;
  }
  .secondprize_content{
    width: 100%;
    flex:1;
    -webkit-flex:1;
    overflow-y:auto;
    overflow-x:hidden;
    padding-bottom: 2rem;
  }
  .secondprize_content .secondprize_box{
    width: 100%;
    height:9.5rem;
    padding:0 1%;
  }
  .secondprize_box dl{
    width: 30.66%;
    text-align: center;
    float:left;
    margin:0 1%;
    height:8rem;
  }
  .secondprize_box dt{
    width: 100%;
    height:6rem;

  }
  .secondprize_box img{
    width: 70%;
    margin:0 auto;
  }
  .secondprize_box img.active{
    border: solid 1px #cecece;
  }
  .secondprize_box dd{
    width:100%;
    text-align: center;
    line-height: 1.1rem;
    font-size: 0.9rem;
    color:#E3B788;
    padding: 0 5%;
    box-sizing:border-box;
  }
  .secondprize_box2{
    width: 100%;
    text-align: center;
    color:#fff;
  }
  .secondprize_box2 p{
    width: 13rem;
    font-size: 1.3rem;
    line-height:1.7rem; 
    margin: 0 auto;
    text-align: left;
    height: 5.5rem;
    box-sizing:border-box;
    padding-top:.3rem;
  }
  .secondprize-start{
    display: block;
    clear:both;
    height:2rem;
    width:6rem;
    border-radius: 0.3rem;
    background: #E1B787; 
    color: #CB1625;
    font-size: 1.3rem;
    margin: 0.6rem auto 0;
    text-align: center;
  
  }
  
</style>