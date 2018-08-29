<template>
  <div class="receive">
    <dl>
      <dt>
        <img src="../assets/present.png" alt="">
      </dt>
      <dd>装饰礼包</dd>
    </dl>
    <a class="receive-start">领取奖品</a>
  </div>
</template>
<script>
  export default {
  	name: 'receive',
  	created () {
    }
    
  }
</script>

<style scoped>
  .receive{
    overflow: hidden;
    background:url(../assets/bian.png) no-repeat center center #CB1625;
    background-size: 92% 92%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    color: #DDBA82;
  }
  .receive dl{
    width:40%;
    text-align: center;
    margin:0 auto;
    margin-top: 50%;
  }
  .receive dd{
    font-size:15px;
    color:#E9BC85;
  }
  .receive dt{
    width:75%;
    margin:0 auto;
    margin-top: 20px;
  }
  .receive img{
    width:100%;
  }
  .receive-start{
    display: block;
    clear:both;
    height:2rem;
    width:6rem;
    border-radius: 0.3rem;
    background: #E1B787; 
    color: #CB1625;
    font-size: 1.3rem;
    margin: 10% auto 0;
    text-align: center;
  }
  
</style>