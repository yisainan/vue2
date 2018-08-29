<template>
  <div class="wrong" id="wrong" v-if="isCorrect">
    <div class="wrong-test"><span>很遗憾您没有答对</span></div>
    <a @click="reload" class="wrong-start">重新答题</a>
  </div>
  <div class="dati" id="dati" v-else="isCorrect">
    <div class="dati-test"><span>{{question.title}}</span></div>
    <ul>
      <li v-for="(val,key) in question.items">
        <input type="radio" name="question" :id="key" class="radio" >
        <label :for="key" class="radio" @click="next(val,$event)">{{key}}.{{val.split('|')[0]}}</label>
      </li>
    </ul>
    <a @click="reloadDraw" class="dati-start">{{questionBtn}}</a>
  </div>

</template>

<script>
import _$ from 'jquery';
export default {
	name: 'dati',
  data () {
    return {
      questionArr : [],
      question : '',
      i : 0,
      questionBtn : '下一题',
      questionResult : [],
      isCorrect : false,
      model : this.$route.query.model
    }
  },
  methods : {
    reload () {
      this.isCorrect = !this.isCorrect
    },
    next (str,e) {
      _$('label').removeClass('active')
      _$(e.target).addClass('active')
      var answer = str.split('|')[1]
      if(answer == 1){
        this.questionResult.push(str)
      }
    },
    reloadDraw () {
      _$('label').removeClass('active')
      if(!this.questionResult[this.i]){
        this.isCorrect = !this.isCorrect
        return false;
      }
      if( this.i == 1 ){
        this.questionBtn = '确认'
      }else if( this.i == 2 ){
        this.$http({
          url : '/api/question',
          method : 'POST',
          params : { act: "answer", model: this.model,question:this.questionResult }
        })
        .then(function(res){
          if(res.body.error == 0){
            this.$router.push('/right')
          }
        },function(err){
          console.log(err)
        })
        return false;
      };
      let i = this.i = this.i + 1;
      this.question = this.questionArr[i]

    }
  },
	created () {
    //获取车型
	  
    this.$http({
      url : '/api/question',
      method : 'POST',
      params : {act:"question",model:this.model}
    })
    .then(function(res){
      if(typeof res.body == 'object'){
        this.questionArr = res.body.data
        this.question = res.body.data[0]
      }else{
        let json = JSON.parse(res.body)
        this.questionArr = json.data
        this.question = json.data[0]
      }
    },function(err){
      console.log(err)
    })
  }
  
}
</script>

<style scoped>
  .dati{
 	  overflow: hidden;
  	background: url(../assets/bg_2.png) no-repeat;
  	background-size: 100% 100%;
  	color: #DDBA82;
  }
  input[type='radio']{
  	opacity:0; 
  	display:none;  
  	height:1.3rem; 
  }
  label{
  	background:url(../assets/radio.png) no-repeat right center;
  	background-size:1rem 1rem;   
  	height:1.3rem; 
  	padding-right:1.67rem;
  }
  .active {
  	background:url(../assets/radio_checked.png) no-repeat right center;
  	background-size:1rem 1rem;  
  }
  ul{
  	width: 100%;
  	box-sizing:border-box;
  	padding: 0 12%;
  }
  ul li{
  	list-style: none;
  	box-sizing:border-box;
  	float: left;
  	/*line-height: 3.4rem;*/
	  font-size: 18px;
	  padding-left: 5%;
  }
  .dati-test{
    position: relative;
  	box-sizing:border-box;
  	margin: 4% auto 0;
  	width: 50%;
  	height: 68%;
    min-height: 24rem;
	  background: url(../assets/denglong3.png) no-repeat;
	  background-size:100%; 
  }
  .dati-test span{
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    text-align: center;
  	display: block;
  	width: 90%;
    padding: 0 5%;
  	font-size: 16px;
  	text-align: center;
  }
  .dati-start{
  	display: block;
  	clear:both;
  	height:2rem;
  	width:6rem;
  	border-radius: 0.3rem;
  	background: #E1B787; 
  	color: #CB1625;
  	font-size: 1.3rem;
  	margin: 3rem auto 0;
	  text-align: center;
	
  }
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
    min-height: 24rem;
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