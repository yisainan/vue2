<template>
  <div class="mui-content">
        <div class="title">
            <h4>{{img.title}}</h4>
            <span>{{img.add_time | fmtDate('YYYY-MM-DD')}}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>点击次数{{img.click}}</span>
        </div>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(item, index) in images" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
              <img class="preview-img" :src="item.src" @click="$preview.open(index, images)">
            </li>
            
        </ul> 

        <p class="content" v-html="img.content">
        </p>


        <!-- 评论--> 
        <comment :id="id"></comment>
    </div>
</template>

<script>
  //导入评论的子组件
  import comment from '../../Subcom/comment.vue'

  import Vue from 'vue'
  //导入图片预览的组件
  // import VuePreview from 'vue-preview'
  // Vue.use(VuePreview)


  //导出组件
  export default {
    data () {
      return {
        //图片详情
        img: {},
        id: -1,
        images: []
      }
    },
    created() {
      this.id = this.$route.params.id;

      this.getdetail();

      this.getimages();
    },
    methods: {
      //获取图片的详细内容
      getdetail() {
        // let id = this.$route.params.id;
        let url = this.common.apiHost + 'getimageInfo/' + this.id;
        this.$http.get(url).then((response) => {
          this.img = response.body.message[0];
        })

      },
      //获取9宫格中图片的路径
      getimages() {
        let url = this.common.apiHost + 'getthumimages/' + this.id;
        this.$http.get(url).then((response) => {
          this.images = response.body.message;

          //给数组中的每一个对象增加  w  和 h 属性
          this.images.forEach((item) => {
            item.w = 600;
            item.h = 600;
          })
        })
      }
    },
    components: {
      comment: comment
    }
  }
</script>

<style scoped>
 .title {
        margin: 15px 5px;
    }
    
    .title h4 {
        color: dodgerblue;
    }
    
    .title span {
        font-size: 13px;
        color: rgba(92, 92, 92, 0.6);
    }
    /*9宫格样式*/
    
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border-left: 0px;
    }
    
    .mui-table-view-cell img {
        height: 100px;
    }
    
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: 0px;
        border-bottom: 0px;
        padding: 0;
        margin: 0;
    }
    
    .mui-grid-view.mui-grid-9 .mui-table-view-cell>a:not(.mui-btn) {
        padding: 0;
    }
</style>