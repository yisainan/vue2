<template>
  <swiper class="my-swipe" :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(billboard, index) in billboards" :key="index">
      <img class="live-img" :src="billboard.imageUrl">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  data: () => ({
    billboards: [
      {
        imageUrl:
          'https://staticlive.douyucdn.cn/storage/webpic_resources/upload/slide/2017/0828/201708281533217578.jpg'
      },
      {
        imageUrl:
          'https://staticlive.douyucdn.cn/storage/webpic_resources/upload/slide/2017/0907/201709071732053454.png'
      },
      {
        imageUrl:
          'https://staticlive.douyucdn.cn/storage/webpic_resources/upload/slide/2017/0915/201709151037285098.jpg'
      },
      {
        imageUrl:
          'https://staticlive.douyucdn.cn/storage/webpic_resources/upload/slide/2017/0918/201709181538588580.jpg'
      },
      {
        imageUrl:
          'https://staticlive.douyucdn.cn/storage/webpic_resources/upload/slide/2017/0810/201708101123152416.jpg'
      },
      {
        imageUrl:
          'https://staticlive.douyucdn.cn/storage/webpic_resources/upload/slide/2017/0908/201709082136105853.jpg'
      }
    ],
    swiperOption: {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true,
      spaceBetween: 20,
      autoHeight: true,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true
      },
      paginationClickable: true
    }
  })
}
</script>

<style lang="scss">
.my-swipe {
  img {
    width: 100%;
    height: 180px;
  }
}
.swiper-pagination {
  bottom: 20px !important;
}
</style>
