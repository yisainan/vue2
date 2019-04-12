<template>
  <div class="page-loadmore">
    <gheader :examplename="examplename"></gheader>
    <div class="page-loadmore-wrapper" 
      :style="{height: wrapperHeight + 'px'}">
      <mt-spinner v-show="list<1 && InitialLoading" color="#26a2ff"></mt-spinner>
      <mt-loadmore :top-method="loadTop"
        @top-status-change="handleTopChange" ref="loadmore" :auto-fill="false">
        <ul class="page-loadmore-list">
          <li class="page-loadmore-listitem" v-for="(item,index) in list" :key="index">{{ item }}</li>
        </ul>
        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
        </div>
      </mt-loadmore>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'PullDonw',
  data() {
    return {
      examplename: 'PullDown',
      list: [],
      InitialLoading: true,
      topStatus: '',
      wrapperHeight: 0
    }
  },
  mounted() {
    setTimeout(() => {
      for(let i = 1; i < 20; i++) {
        this.list.push(i);
      }
      this.InitialLoading = false;
    },1500)
    
    let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
    if(windowWidth >= 768){//这里根据自己的实际情况设置容器的高度
      this.wrapperHeight = document.documentElement.clientHeight - 105;
    }else{
      this.wrapperHeight = document.documentElement.clientHeight - 80;
    }
  },
  methods: {
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        let firstValue = this.list[0];
        for(let i = 1;i < 10; i++){
          this.list.unshift(firstValue - i);
        }
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    }
  }
}
</script>
