<template>
  <div class="clr">
    {{msg}}
  </div>
</template>

<script>
  //引入其它模块

  //导出当前组件
  export default {
    data() {
      return {
        msg: 'Hello vue  xxxxxx'
      }
    }
  }

</script>

<style scoped>
  .clr {
    background-color: red;
  }
</style>