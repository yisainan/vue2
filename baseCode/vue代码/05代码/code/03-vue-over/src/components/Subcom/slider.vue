<template>
  <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in images" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
  //导出组件
  export default {
    data () {
      return {
        //存储获取到的轮播图数据   将来做数据绑定
        images: []
      }
    },
    created() {
      this.getlunbo();
    },
    props: ['imgUrl'],
    methods: {
      //获取轮播图
      getlunbo() {
        //向服务器发送请求
        this.$http.get(this.imgUrl).then((response) => {
          //获取服务器返回的数据，记录到data中，做数据绑定用
          this.images = response.body.message;
        })
      },
    }
  }
</script>

<style scoped>
  /*  轮播图的样式 */
  .mint-swipe  {
    height: 250px;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
</style>