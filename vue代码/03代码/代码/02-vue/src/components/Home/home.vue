<template>
  <div class="mui-content">
      <!-- 轮播图 -->
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in images">
          <a :href="item.url">
            <img :src="item.img" alt="">
          </a>
        </mt-swipe-item>
      </mt-swipe>


      <!-- 9宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li v-for="item in menus" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="item.url">
                <span class="mui-icon" :class="item.className"></span>
                <div class="mui-media-body">{{item.title}}</div>
          </router-link>
        </li>
       
    </ul> 
  </div>
</template>

<script>
//轮播图的过程
// 1 下载mint-ui   npm install mint-ui --save
// 2 全局引入  app.js 中
// import mintUI from 'mint-ui';
// Vue.use(mintUI);
// 3 引入mint-ui的样式 样式在node_modules
//  import '........css'
// 4 把文档中给的代码拿过来，然后修改
// 5 修改样式






//当前模块中按需导入
//   import { Swipe, SwipeItem } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);


//全局导入   app.js 
// import mintUI from 'mint-ui';
// Vue.use(mintUI);

  //导出组件
  export default {
    data () {
      return {
        //存储获取到的轮播图数据   将来做数据绑定
        images: [],
        //存储9宫格的数据  将来做数据绑定
        menus: []  
      }
    },
    created() {
      //可以认为  组件创建完毕后执行
      this.getlunbo();

      this.getmenus();
    },
    methods: {
      //获取轮播图
      getlunbo() {
        //向服务器发送请求
        let url = 'http://localhost:8899/api/getlunbo';
        this.$http.get(url).then((response) => {
          //获取服务器返回的数据，记录到data中，做数据绑定用
          this.images = response.body.message;
        })
      },
      //获取9宫格菜单的数据
      getmenus() {
        let url = 'http://localhost:8899/api/getmenus';
        this.$http.get(url).then((response) => {
          //把获取到的服务器的数据，记录到data中，做数据绑定
          this.menus = response.body.message;
        }, () => {
          //失败之后
        })
      }
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


  /*  轮播图的样式 */
  .mint-swipe  {
    height: 250px;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
</style>