<template>
  <div id="app">
    <Dheader></Dheader>
    <transition name="fade" mode="out-in">
      <keep-alive exclude="moviesDetail">
        <router-view class="view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  import Dheader from './header.vue'
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      'Dheader': Dheader
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../node_modules/element-ui/lib/theme-default/index.css'
  *
    margin: 0;
    padding: 0;
    font-family: '微软雅黑';
</style>
