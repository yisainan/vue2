<template>
  <div class="mui-content">
    <div class="title">
          <h3>{{news.title}}</h3>
          <span>时间：{{news.add_time | fmtDate('YYYY-MM-DD')}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{news.click}}次浏览</span>
      </div>
      <div class="content" v-html="news.content">
          
      </div>


      <!--  评论 -->
      <div class="comment">
        <!--添加评论-->
        <h4>提交评论</h4>

        <div class="submitcomment">
            <textarea placeholder="请输入评论内容"></textarea>
            <button class="mui-btn mui-btn-primary">发表</button>
        </div>
            
        <div class="title">
            <h4>评论列表</h4>
        </div>    
        
        <!--评论列表-->
        
        <div class="item">
            <div class="content">评论内容</div>
            <div>
                <span class="user">匿名用户</span>  <span>时间</span>
            </div>
        </div>

        <div class="more">
            <button class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
        </div>

    </div>
  </div>
</template>

<script>
  //导出组件
  export default {
    data () {
      return {
        news: {}
      }
    },
    created() {
        //console.log(this.$route.params.id);
        this.getdetail();
    },
    methods: {
      getdetail() {
        let url = this.common.apiHost + 'getnew/' + this.$route.params.id;

        this.$http.get(url).then((response) => {
          this.news = response.body.message[0];
        })
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

    /*  评论的样式 */
    .submitcomment {
        text-align: center;
    }
    
    .submitcomment textarea {
        margin-top: 10px;
        padding: 0;
        width: 96%;
        height: 60px;
    }
    
    .submitcomment button {
        width: 96%;
    }
    
    .title {
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align: middle;
        padding: 10px 0;
    }
    
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    
    .more {
        margin: 10px 0;
        text-align: center;
    }
    
    .more>button {
        width: 96%;
    }
</style>