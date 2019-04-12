<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="imgLazyLoadList">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <img v-lazy="imgUrl">
        </li>
      </ul>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'LazyLoad',
  data () {
    return {
      examplename: 'LazyLoad',
      imgUrl: 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg',
      list: 9
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped>
.imgLazyLoadList li {
  padding: 10px;
}
.imgLazyLoadList li:last-child {
  margin-bottom: 40px;
}
.imgLazyLoadList img {
  width: 100%;
  margin: auto;
}
/* image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
} */
</style>
