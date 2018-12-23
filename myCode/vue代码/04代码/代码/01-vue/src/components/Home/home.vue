<template>
  <div class="mui-content">
      <!-- 轮播图 -->
      <slider :imgUrl="imgUrl"></slider>


      <!-- 9宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li v-for="(item, index) in menus" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="item.url">
                <span class="mui-icon" :class="item.className"></span>
                <div class="mui-media-body">{{item.title}}</div>
          </router-link>
        </li>
       
    </ul> 
  </div>
</template>

<script>
  //导入轮播图组件
  import slider from '../Subcom/slider.vue'

  //导出组件
  export default {
    data () {
      return {
        
        //存储9宫格的数据  将来做数据绑定
        menus: [],
        //请求轮播图的地址
        imgUrl: ''
      }
    },
    created() {
      //可以认为  组件创建完毕后执行
      this.imgUrl = this.common.apiHost + 'getlunbo';

      this.getmenus();
    },
    methods: {
      
      //获取9宫格菜单的数据
      getmenus() {
        let url = this.common.apiHost + 'getmenus';
        this.$http.get(url).then((response) => {
          //把获取到的服务器的数据，记录到data中，做数据绑定
          this.menus = response.body.message;
        }, () => {
          //失败之后
        })
      }
    },
    components: {
      slider: slider
    }

  }
</script>

<style scoped>
  .mui-icon {
    width: 50px;
    height: 50px;
    /*背景图像自动缩放直到适应且填充满整个容器。（CSS3）*/
    background-repeat: round;
  }

  .icon-news {
    background-image: url(../../../statics/images/menu1.png);
  }

  .icon-share {
    background-image: url(../../../statics/images/menu2.png);
  }

  .icon-buy {
    background-image: url(../../../statics/images/menu3.png);
    
  }

  .icon-feedback {
    background-image: url(../../../statics/images/menu4.png);
    
  }

  .icon-video {
    background-image: url(../../../statics/images/menu5.png);
    
  }

  .icon-contact {
    background-image: url(../../../statics/images/menu6.png);
    
  }


  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
  }


  
</style>