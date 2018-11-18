<template>
  <div class="main">
    <v-navbar @open="openSidebar"></v-navbar>
    <div class="view">
      <router-view></router-view>
    </div>
    <v-sidebar :categories="categories"
      :nav-status="LeftNavStatus"
      @close="closeSidebar"></v-sidebar>
  </div>
</template>

<script>
import VSidebar from '~/v-sidebar'
import VNavbar from '~/v-navbar'
export default {
  name: 'App',
  components: {
    VSidebar,
    VNavbar
  },
  data() {
    return {
      LeftNavStatus: false,
      categories: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$axios.get('/category').then(response => {
        this.categories = response.data.cate1Info
        // console.log(response.data.cate1Info)
      })
    },
    openSidebar() {
      this.LeftNavStatus = true
    },
    closeSidebar() {
      this.LeftNavStatus = false
    }
  }
}
</script>

<style lang="scss">
body.slide-overflow {
  overflow: hidden;
}
.view {
  margin-top: 1.233rem;
}
html body {
  line-height: 1.5;
  font-family: 'Helvetica Neue', 'Arial', 'PingFang SC', 'Hiragino Sans GB', 'STHeiti',
    'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  color: #333;
  background-color: #f4f4f4;
}
* {
  box-sizing: border-box;
}
.clearfix {
  &:before,
  &:after {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
  }
}
</style>
