<template>
  <div class="mui-content">
      <div class="title">
          <h3>{{news.title}}</h3>
          <span>时间：{{news.add_time | fmtDate('YYYY-MM-DD')}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{news.click}}次浏览</span>
      </div>
      <div class="content" v-html="news.content">
          
      </div>


      <!--  评论 -->
      <comment :id="id"></comment>
  </div>


</template>

<script>
  //导入评论子组件
  import comment from '../../Subcom/comment.vue'

  //导出组件
  export default {
    data () {
      return {
        news: {},
        id: -1
        
      }
    },
    created() {
        //console.log(this.$route.params.id);
        //获取文章详情
        this.getdetail();

        this.id = this.$route.params.id;

    },
    methods: {
      //获取文章详细信息
      getdetail() {
        let url = this.common.apiHost + 'getnew/' + this.$route.params.id;

        this.$http.get(url).then((response) => {
          this.news = response.body.message[0];
        })
      }
      
    },
    components: {
      comment: comment
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