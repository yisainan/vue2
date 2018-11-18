<template>
  <section class="content">
    <div class="m-row">
      <v-swiper></v-swiper>
      <div class="live-list">
        <router-link v-for="(livelist, index) in livelists"
          :key="index"
          :to="{name: 'detail', params: {id: livelist.room_id}}"
          class="live">
          <img class="live-feature"
            :src="livelist.room_src">
          <div class="live-title">{{livelist.room_name}}</div>
          <div class="live-info">
            <span class="dy-name">{{livelist.nickname}}</span>
            <span class="popularity">{{livelist.online | fixed}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import VSwiper from '~/v-swiper'
export default {
  components: {
    VSwiper
  },
  data() {
    return {
      livelists: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$axios.get('/api/live').then(response => {
        this.livelists = response.data.data
      })
    }
  }
}
</script>

<style lang="scss">
.m-row {
  background: #fff;
}
.live-list {
  position: relative;
  box-sizing: border-box;
  padding: 0 0.13333333rem 0.13333333rem;
  width: 100%;
  &:after {
    display: block;
    content: '';
    clear: both;
  }
  .live {
    float: left;
    position: relative;
    display: block;
    margin: 0.13333333rem;
    width: 4.6rem;
    height: 3.28rem;
    color: #333;
    font-size: 12px;
    .live-feature {
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      width: 100%;
      height: 2.61333333rem;
      background-color: #000;
      border-radius: 0.1rem;
    }
    .live-title {
      position: absolute;
      bottom: 0;
      left: 0.2rem;
      width: 4rem;
      color: #000;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 0.66666667rem;
    }
    .live-info {
      position: absolute;
      bottom: 0.66666667rem;
      left: 0;
      width: 100%;
      color: #fff;
      /*padding: .1rem 0;*/
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      background: linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.1) 30%,
        rgba(0, 0, 0, 0.8) 100%
      );
      .dy-name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 2.746666666rem;
        display: inline-block;
        padding-left: 0.1rem;
      }
      .popularity {
        float: right;
        padding-right: 0.2rem;
      }
    }
  }
}
</style>
