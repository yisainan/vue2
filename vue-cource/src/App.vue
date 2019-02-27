<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div> -->
    <!-- <transition-group :name="routerTransition"> -->
    <router-view key="default"/>
    <router-view key="email" name="email"/>
    <router-view key="tel" name="tel"/>
    <!-- </transition-group> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      routerTransition: ''
    }
  },
  watch: {
    '$route' (newRoute) {
      this.UPDATE_ROUTER(newRoute)
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ])
  }
}
</script>

<style lang="less">
html,body{
  height: 100%;
}
body{
  margin: 0;
}
.router-enter{
  opacity: 0;
}
.router-enter-active{
  transition: opacity 1s ease;
}
.router-enter-to{
  opacity: 1;
}
.router-leave{
  opacity: 1;
}
.router-leave-active{
  transition: opacity 1s ease;
}
.router-leave-to{
  opacity: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@font-face {font-family: 'iconfont';
    src: url('./assets/font/iconfont.eot');
    src: url('./assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/font/iconfont.woff') format('woff'),
    url('./assets/font/iconfont.ttf') format('truetype'),
    url('./assets/font/iconfont.svg#iconfont') format('svg');
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont-svg {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
