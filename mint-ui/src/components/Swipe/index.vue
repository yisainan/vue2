<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="bannerList">
      <p class="bannerItemTitle">基础Swipe</p>
      <div class="banner1 bannerItem">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in imglist" :key="index">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <p class="bannerItemTitle">隐藏 indicators</p>
      <div class="banner2 bannerItem">
        <mt-swipe :show-indicators="false">
          <mt-swipe-item v-for="(item,index) in imglist" :key="index">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <p class="bannerItemTitle">取消自动播放</p>
      <div class="banner3 bannerItem">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(item,index) in imglist" :key="index">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <p class="bannerItemTitle">默认Item</p>
      <div class="banner4 bannerItem">
        <mt-swipe :auto="0" :defaultIndex="1">
          <mt-swipe-item v-for="(item,index) in imglist" :key="index">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <p class="bannerItemTitle">滑动事件 当前是第{{bannerindex5}}个item</p>
      <div class="banner5 bannerItem">
        <mt-swipe @change="handleChange">
          <mt-swipe-item v-for="(item,index) in imglist" :key="index">
            <img :src="item.img" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div>  
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Swipe',
  data () {
    return {
      examplename: 'Swipe',
      imglist:[
        {img: 'http://ooldo78yy.bkt.clouddn.com/banner_3.png'},
        {img: 'http://ooldo78yy.bkt.clouddn.com/2018-03-141521021985.png?imageView2/1/w/375/h/159'},
        {img: 'http://ooldo78yy.bkt.clouddn.com/2018-03-141521021828.png?imageView2/1/w/375/h/159'}
      ],
      bannerindex5: 1
    }
  },
  mounted () {

  },
  methods: {
    handleChange (index) {
      this.bannerindex5 = index+1;
    }
  }
}
</script>
<style scoped>
.bannerItem {
  width: 100%;
  position: relative;
  padding-bottom: 42.5%;
  height: 0;
}
.bannerItem:last-child {
  margin-bottom: 40px;
}
.bannerItemTitle {
  padding: 10px 0;
  text-align: center; 
}
.bannerItem div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%!important;
}
.mint-swipe-item img {
  width: 100%;
  height: 100%;
}
</style>
