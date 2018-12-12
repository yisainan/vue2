<template>
  <div class="wrapper" v-loading="loadingMoving">
    <h2>豆瓣新片榜 · · · · · · </h2>
    <div class="indent">
      <div class="">
        <p class="ul first"></p>
        <searchTag v-for="(subject,index) in ranking250.subjects" :key="index" :subject="subject"></searchTag>
      </div>
    </div>
  </div>
</template>
<script>
  import searchTag from '../components/searchTag.vue'
  export default{
    props: {
      data: Object
    },
    data () {
      return {
        timer: null,
        isLoad: false,
        page: 1,
        totalPage: 0,
        start: 1
      }
    },
    mounted () {
      document.title = 'top250'
      this.$store.commit('PAGE_START', {start: 8})
      this.$store.dispatch('loadingtop250')
    },
    components: {
      searchTag
    },
    computed: {
      ranking250 () {
        this.isLoad = false
        this.totalPage = this.$store.getters.ranking250.total
        return this.$store.getters.ranking250
      },
      loadingMoving () {
        return this.$store.getters.loadingMoving
      }
    }
  }
</script>
<style rel="stylesheet/stylus" lang="stylus">
  .wrapper
    width: 950px;
    min-height: 500px;
    margin: 30px auto;
</style>
