<template>
  <div class="number">
    <div @click="sub" class="left">-</div><div class="middle">{{count}}</div><div @click="add" class="right">+</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 1,
        type: ''
      }
    },
    created() {
      this.count = this.initcount || 1;
    },
    props: ['initcount', 'id'],
    methods: {
      sub() {
        if(this.count > 1) {
          this.count--;
          this.type = 'sub';
          
          this.notify();
        }
      },
      add() {
        this.count++;
        this.type = 'add';
        
        this.notify();
      },
      //模拟触发事件
      notify() {
        //当数子发生变化的时候调用   触发事件（通知父组件）
        this.$emit('numchanged', {type: this.type, count: this.count, id: this.id});
      }
    }
  }
</script>

<style scoped>
  .number, .number div {
    display: inline-block;
    text-align: center;
  }

  .number div {
    width: 30px;
    height: 25px;
    border: 1px solid rgba(92,92,92,0.6);
  }

  .number .middle {
    width:40px;
  }
</style>