<template>
  <div>
    <ul v-for="(item,index) in list" :key="index">
      <li>
        单价 {{item.danjia}} 
        <span class="btn btn-info" @click="jian(index)">-</span>数量 {{item.shuliang}}<span class="btn btn-info" @click="jia(index)">+</span> 
        总价{{item.danjia*item.shuliang}}</li>
    </ul>
    总计：{{zongji}}
  </div>
</template>
<script>
export default {
  data(){
    return {
      list: [
        {'danjia':123,'shuliang':1},
        {'danjia':234,'shuliang':1},
        {'danjia':345,'shuliang':1},
        {'danjia':456,'shuliang':1},
      ],
      danjia: 123,
      shuliang: 0
    }
  },
  computed: {
    zongji: function() {
      var ZJ = 0;
      for(var i of this.list){
        ZJ+=i.danjia*i.shuliang
      }
      return ZJ;
    }
  },
  mounted(){

  },
  methods:{
    jian(index){
      if(this.list[index].shuliang>0){
        this.list[index].shuliang--;
      }
    },
    jia(index){
      this.list[index].shuliang++;
    }
  }
}
</script>
<style scoped>
ul {
  padding-left: 10px; 
  padding-top: 10px;
}
li {
  margin-bottom: 5px;
}
</style>
