<template>
  <div class="thirdprize">
      <div class="thirdprize_header">
            三等奖
        </div>
        <div class="showPrize" v-if="isShow">
          <div v-if="isCur===1">
            <img src="../assets/Humidifier.png" alt="" />
            <p>
              小米加湿器
            </p>
          </div>
          <div v-else-if="isCur===2">
            <img src="../assets/wine.png" alt="" />
            <p>
              RIEDEL 梅洛醒酒器+红酒杯4支组合套装
            </p>
          </div>
          <div v-else-if="isCur===3">
            <img src="../assets/card.png" alt="" />
            <p>
              中石化油卡
            </p>
          </div>
          <p class="tos">请您在购车后,<br/>到购车经销商店领取奖品</p>
          <!-- 跳转合成页面 -->
          <a href="" class="thirdprize-start">下一步</a>
        </div>
        <div class="thirdprize_content" v-else="isShow">
            <div class="thirdprize_box">
                <dl>
                    <dt><img class="mi" src="../assets/Humidifier.png" alt="" @click="selectPrize(1)" :class="{active:isCur===1}"></dt>
                    <dd>小米加湿器</dd>
                </dl>
                <dl>
                    <dt><img src="../assets/wine.png" alt="" @click="selectPrize(2)" :class="{active:isCur===2}"></dt>
                    <dd>RIEDEL 梅洛醒酒器+红酒杯4支组合套装</dd>
                </dl>
                <dl>
                    <dt><img src="../assets/card.png" alt="" @click="selectPrize(3)" :class="{active:isCur===3}"></dt>
                    <dd>中石化油卡</dd>
                </dl>
            </div>
            <div class="thirdprize_box2">
                <h2>选择其中一款产品</h2>
                <p>请您在购车后,<br/>到购车经销商店领取奖品</p>
                <a @click="showPrize" class="thirdprize-start">领取奖品</a>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
  	name: 'thirdprize',
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
  .showPrize p{
    width:90%;
    padding: 0 5%;
    text-align: center;
  }
  .tos {
    padding: 5% 0;
  }
  .thirdprize{
    overflow: hidden;
    color: #DDBA82;
    background:url(../assets/bian.png) no-repeat center center #CB1625;
    background-size: 92% 92%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .thirdprize_header{
    width: 100%;
    height:5.33rem;
    line-height: 5.33rem;
    font-size:2rem;
    margin-top: 3.33rem;
    text-align: center;
    color:#E3B78A;
  }
  .thirdprize_content{
    width: 100%;
    flex:1;
    -webkit-flex:1;
    overflow-y:auto;
    overflow-x:hidden;
    padding-bottom: 2rem;
  }
  .thirdprize_content .thirdprize_box{
    width: 100%;
    height:9.5rem;
    padding:0 1%;
  }
  .thirdprize_box dl{
    width: 30.66%;
    text-align: center;
    float:left;
    margin:0 1%;
    height:8rem;
  }
  .thirdprize_box dt{
    width: 100%;
    height:7rem;
  }
  .mi{
    height:100%;
  }
  .thirdprize_box img{
    width: 80%;
    margin:0 auto;
  }
  .thirdprize_box img.active{
    border: solid 1px #cecece;
  }
  .thirdprize_box dd{
    width:100%;
    text-align: center;
    line-height: 1.1rem;
    font-size: 0.9rem;
    color:#E3B788;
  }
  .thirdprize_box2{
    margin-top:2rem; 
    width: 100%;
    text-align: center;
    color:#fff;
  }
  .thirdprize_box2 p{
    width: 13rem;
    font-size: 1.3rem;
    line-height:1.7rem; 
    margin: 0 auto;
    text-align: left;
    height: 5.5rem;
    box-sizing:border-box;
    padding-top:.3rem;
  }
  .thirdprize-start{
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