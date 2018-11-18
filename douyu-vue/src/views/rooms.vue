<template>
  <div class="m-row">
    <div class="title">
      <svg-icon icon-class="tv"></svg-icon>
      <span>{{cateName}}</span>
      <strong>{{gameName}}</strong>
    </div>
    <div class="live-list clearfix">
      <router-link v-for="(roomlist, index) in roomlists"
        :key="index"
        :to="{name: 'detail', params: {id: roomlist.room_id}}"
        class="live">
        <img class="live-feature"
          :src="roomlist.room_src">
        <div class="live-title">{{roomlist.room_name}}</div>
        <div class="live-info">
          <span class="dy-name">{{roomlist.nickname}}</span>
          <span class="popularity">{{roomlist.online | fixed}}</span>
        </div>
      </router-link>
    </div>
    <v-more-button>
      <div class="more-button"
        v-if="!hidden">
        <div v-show="!loading"
          @click="loadMore">加载更多</div>
        <div v-show="loading"
          class="ball-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </v-more-button>
  </div>
</template>
<script>
import VMoreButton from '~/v-more-button.vue'
export default {
  name: 'rooms',
  props: ['name'],
  data: () => ({
    roomlists: [],
    params: {
      name: '',
      offset: 0,
      limit: 8
    },
    hidden: false,
    loading: false,
    cateName: '',
    gameName: ''
  }),
  created() {
    this.params.name = this.name
    this.fetchData()
  },
  mounted() {
    this.cateName = this.$cookie.get('cateName')
    this.gameName = this.$cookie.get('gameName')
  },
  methods: {
    fetchData() {
      const url = `/api/live/${this.params.name}?offset=${this.params.offset}&limit=${this.params.limit}`
      this.$axios.get(url).then(response => {
        this.loading = false
        this.roomlists = response.data.data
      })
    },
    loadMore() {
      this.params.limit = this.params.limit + 8
      if (this.params.limit > 100) {
        this.params.limit = 100
        this.hidden = true
      }
      this.loading = true
      this.fetchData()
    }
  },
  components: {
    VMoreButton
  }
}
</script>
<style lang="scss">
.m-row {
  .play-icon {
    width: 0.3999999rem;
    height: 0.3999999rem;
    vertical-align: sub;
  }
  .title {
    font-size: 12px;
    margin-left: 10px;
    line-height: 0.8333333rem;
    strong {
      margin-left: 4px;
      color: #fa7122;
    }
  }
}
.live-list {
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
      border-radius: 0.2rem;
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
        padding-left: 0.2rem;
      }
      .popularity {
        float: right;
        padding-right: 0.2rem;
      }
    }
  }
}
</style>
