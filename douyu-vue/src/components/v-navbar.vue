<template>
  <nav id="toolbar">
    <div class="toolbar-icon" @click="showNav">
      <svg-icon icon-class="menu"></svg-icon>
    </div>
    <div class="toolbar-title" @click="showNav">
      <span>直播分类</span>
    </div>
    <div class="toolbar-left">
      <router-link :to="{name: 'index'}" class="user">斗鱼TV</router-link>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    showNav() {
      this.$emit('open')
    }
  }
}
</script>
<style lang="scss">
  #toolbar {
    background: #282828;
    color: #fff;
    font-size: .427rem;
    position: fixed;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    top: 0;
    z-index: 4;
    height: 1.233rem;
    line-height: 1.233rem;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    flex-direction: row;
    .toolbar-icon {
      -webkit-box-flex: 1 1 0%;
      -webkit-flex: 1 1 0%;
      flex: 1 1 0%;
      text-align: center;
    }
    .toolbar-title {
      -webkit-box-flex: 6 1 0%;
      -webkit-flex: 6 1 0%;
      flex: 6 1 0%;
    }
    .toolbar-left {
      -webkit-box-flex: 2 1 0%;
      -webkit-flex: 2 1 0%;
      flex: 2 1 0%;
      text-align: center;
      a {
        color: #f70;
        font-weight: 600;
      }
    }
  }
</style>
