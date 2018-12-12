<template>
  <div class="search-list" v-loading="searchLoading">
    <searchTag v-for="(subject,index) in searchList.subjects" :subject="subject" :key="index"></searchTag>
  </div>
</template>

<script>
  import searchTag from '../components/searchTag.vue'
  export default{
    data () {
      return {

      }
    },
    mounted () {
      if (this.searchText === '') {
        let searchText = this.$route.query.searchText
        this.$store.commit('SEARCH_TEXT', {searchText})
        this.$store.dispatch('getSearchList')
      }
    },
    components: {
      searchTag
    },
    computed: {
      searchText () {
        return this.$store.getters.searchText
      },
      searchList () {
        return this.$store.getters.searchList
      },
      searchLoading () {
        return this.$store.getters.searchLoading
      }
    }
  }
</script>
<style rel="stylesheet/stylus" lang="stylus">
  .search-list
    width: 950px;
    min-height: 500px;
    margin: 30px auto;

</style>
