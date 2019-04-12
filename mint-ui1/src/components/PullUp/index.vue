<template>
  <div class="page-loadmore">
    <gheader :examplename="examplename"></gheader>
    <div class="page-loadmore-wrapper" 
      :style="{height: wrapperHeight + 'px'}">
      <mt-spinner v-show="list<1 && InitialLoading" color="#26a2ff"></mt-spinner>
      <mt-loadmore :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange"
        :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
        <ul class="page-loadmore-list">
          <li class="page-loadmore-listitem" v-for="(item,index) in list" :key="index">{{ item }}</li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'"
            :class="{'is-rotate': bottomStatus === 'drop'}">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>  
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'PullUp',
  data () {
    return {
      examplename: 'PullUp',
      list: [],
      InitialLoading: true,
      allLoaded: false,
      bottomStatus: '',
      wrapperHeight: 0
    }
  },
  mounted () {
    setTimeout(() => {
      for(let i = 1; i <=20; i++){
        this.list.push(i);
      }
      this.InitialLoading = false;
    }, 1500)
    
    let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
    if(windowWidth >= 768){//这里根据自己的实际情况设置容器的高度
      this.wrapperHeight = document.documentElement.clientHeight - 105;
    }else{
      this.wrapperHeight = document.documentElement.clientHeight - 80;
    }
  },
  methods: {
    handleBottomChange(status){
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        let lastValue = this.list[this.list.length - 1];
        if(lastValue < 40) {
          for(let i = 1; i <= 10; i++){
            this.list.push(lastValue + i)
          }
        }else {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      }, 1500)
    }
  }
}
</script>
