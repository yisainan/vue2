<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-spinner v-show="list<1 && InitialLoading" color="#26a2ff"></mt-spinner>
      <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
        <div class="hot-list">
          <div class="hot-one hot-item" v-for="(item,index) in list" :key="index">
            <a href="javascript:;" class="show clearfix">
              <div class="img-box">
                <img src="http://p18nr20h5.bkt.clouddn.com/o_1caahtfg41c9s1tv41hatr9718o4a.jpeg!180x120" class="fl">
              </div> 
              <h5 class="white-space">别让错误的认知毁掉我们的人生</h5> 
              <p>
                女孩天生就不擅长数学、女孩学不好数学是正常的。因为
                <span class="color_e85647">...详情</span>
              </p> 
              <p class="read">
                <span class="fa fa-eye"></span> 391 &nbsp;&nbsp;&nbsp;
                <span class="fa fa-pencil-square-o"></span> 10
              </p>
           </a>
          </div>
        </div>
        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
        </div>
        <div v-if="allLoaded" style="text-align:center;">没有更多数据了</div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Loadmore',
  data (){
    return {
      examplename: 'Loadmore',
      pageNum: 1,//页码
      InitialLoading: true,//初始加载
      list: 0,//数据
      allLoaded: false,//数据是否加载完毕
      bottomStatus: '',//底部上拉加载状态
      wrapperHeight: 0,//容器高度
      topStatus: '',//顶部下拉加载状态
      translate: 0,//
      moveTranslate: 0,
    }
  },
  mounted (){
    let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
    if(windowWidth >= 768){//这里根据自己的实际情况设置容器的高度
      this.wrapperHeight = document.documentElement.clientHeight - 105;
    }else{
      this.wrapperHeight = document.documentElement.clientHeight - 80;
    }
    // const that = this;
    // window.onresize = function temp() {
    //   windowWidth = document.documentElement.clientWidth;//获取屏幕高度
    //   console.log(windowWidth);
    //   if(windowWidth >= 768){//这里根据自己的实际情况设置容器的高度
    //     this.wrapperHeight = document.documentElement.clientHeight - 105;
    //   }else{
    //     this.wrapperHeight = document.documentElement.clientHeight - 80;
    //   }
    // };
    setTimeout(()=>{//页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
      this.list = 12;
    },1500)
  },
  methods:{
    handleBottomChange(status) {
      this.moveTranslate = 1;
      this.bottomStatus = status;
    },
    loadBottom() {
      this.handleBottomChange("loading");//上拉时 改变状态码
      this.pageNum += 1;
      setTimeout(() => {//上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
        if(this.pageNum <= 3){//最多下拉三次
          this.list += 12;//上拉加载 每次数值加12
        }else{
          this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
        }
        this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    translateChange(translate) {
      const translateNum = +translate;
      this.translate = translateNum.toFixed(2);
      this.moveTranslate = (1 + translateNum / 70).toFixed(2);
    },
    loadTop() {//下拉刷新 模拟数据请求这里为了方便使用一次性定时器
      this.handleTopChange("loading");//下拉时 改变状态码
      this.pageNum = 1;
      this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
      setTimeout(() => {
        this.list = 12;//下拉刷新 数据初始化
        this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    },
  }
}
</script>
<style scoped>
  .page-loadmore-wrapper {
      overflow: scroll
  }
  .hot-list {
    padding: 0 8px;
  }
  .hot-item {
    padding: 10px 0;
  }
  .hot-one {
    overflow: hidden;
    border-bottom: 1px dashed #ccc;
  }
  .hot-one a img {
    padding-right: 10px;
  }
  .hot-item a img {
    width: 135px;
    height: 90px;
  }
  .fl {
    float: left;
  }
  .hot-one a h5 {
    margin-top: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 6px;
    font-size: 16px;
    color: #000;
  }
  .hot-one a p {
    font-size: 12px;
    color: #828282;
    margin: 0 0 3px;
  }
  .color_e85647 {
    color: #e85647;
  }
  div.hot-list>div:first-child .img-box {
    overflow: hidden;
  }
  div.hot-list>div:first-child img {
    width: 100%;
    height: auto;
    padding-right: 0;
  }
</style>
