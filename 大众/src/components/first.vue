<template>
  <div class="firstPrize">
      <div class="firstPrize_header">
            一等奖
      </div>
      <div class="showPrize" v-if="isShow">
        <div v-if="isCur===1">
          <img src="../assets/Headset.png" alt="" />
          <p>
            beats 耳机
          </p>
        </div>
        <div v-else-if="isCur===2">
          <img src="../assets/Bracelet.png" alt="" />
          <p>
            潘多拉手串
          </p>
        </div>
        <div v-else-if="isCur===3">
          <img src="../assets/Water_purifier.png" alt="" />
          <p>
            家用净水器
          </p>
        </div>
        <p class="tos">请您在购车后,<br/>到购车经销商店领取奖品</p>
        <!-- 跳转合成页面 -->
        <a href="" class="firstPrize-start">下一步</a>
      </div>
      <div class="firstPrize_content" v-else="isShow">
          <div class="firstPrize_box">
              <dl>
                  <dt><img src="../assets/Headset.png" alt="" @click="selectPrize(1)" :class="{active:isCur===1}"></dt>
                  <dd>beats 耳机</dd>
              </dl>
              <dl>
                  <dt><img src="../assets/Bracelet.png" alt="" @click="selectPrize(2)" :class="{active:isCur===2}"></dt>
                  <dd>潘多拉手串</dd>
              </dl>
              <dl>
                  <dt><img src="../assets/Water_purifier.png" alt="" @click="selectPrize(3)" :class="{active:isCur===3}"></dt>
                  <dd>家用净水器</dd>
              </dl>
          </div>
          <div class="firstPrize_box2">
              <h2>选择其中一款产品</h2>
              <p>请您在购车后,<br/>到购车经销商店领取奖品</p>
              <a @click="showPrize" class="firstPrize-start">领取奖品</a>
          </div>
      </div>
    </div>
</template>
<script>
  export default {
  	name: 'firstPrize',
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
  .firstPrize{
    overflow: hidden;
    color: #DDBA82;
    background:url(../assets/bian.png) no-repeat center center #CB1625;
    background-size: 92% 92%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
  }
  .firstPrize_header{
    width: 100%;
    height:5.33rem;
    line-height: 5.33rem;
    font-size:2rem;
    margin-top: 3.33rem;
    text-align: center;
    color:#E3B78A;
  }
  .firstPrize_content{
    width: 100%;
    flex:1;
    -webkit-flex:1;
    overflow-y:auto;
    overflow-x:hidden;
    padding-bottom: 2rem;
  }
  .firstPrize_content .firstPrize_box{
    width: 100%;
    height:9.5rem;
    padding:0 1%;
  }
  .firstPrize_box dl{
    width: 30.66%;
    text-align: center;
    float:left;
    margin:0 1%;
  }
  .firstPrize_box dt{
    width: 100%;
    height:5.2rem;
  }
  .firstPrize_box img{
    width: 70%;
    margin:0 auto;
  }
  .firstPrize_box img.active{
    border: solid 1px #cecece;
  }
  .firstPrize_box dd{
    width:100%;
    text-align: center;
    line-height: 2.66rem;
    font-size: 0.9rem;
    color:#E3B788;
  }
  .firstPrize_box2{
    width: 100%;
    text-align: center;
    color:#fff;
  }
  .firstPrize_box2 p{
    width: 13rem;
    font-size: 1.3rem;
    line-height:1.7rem; 
    margin: 0 auto;
    text-align: left;
    height: 5.5rem;
    box-sizing:border-box;
    padding-top:.3rem;
  }
  .firstPrize-start{
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