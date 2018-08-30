<template>
  <div class="mui-content">
    <div class="title">
            <h3>标题</h3>
            <span>时间 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0次浏览</span>
        </div>
        <div class="content">
            内容
        </div>
  </div>
</template>

<script>
  //导出组件
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .title h3 {
        font-size: 16px;
        color: dodgerblue;
    }
    
    .title span {
        font-size: 12px;
        color: rgba(92, 92, 92, 0.6);
    }
    
    .title {
        border-bottom: 1px solid rgba(92, 92, 92, 0.3);
        padding: 10px 5px;
    }
    
    .content {
        padding: 10px;
        font-size: 13px;
        color: gray;
    }
</style>