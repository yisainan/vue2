<template>
  <div id="app">
    <h3>welcome Vue-webpack</h3>
    <strong>{{msg}}</strong>
    <News></News>
  </div>
</template>

<script>
import News from './components/News.vue'
export default{
  data () {
    return {
      msg: '我是数据'
    }
  },
  components: {
    News
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
