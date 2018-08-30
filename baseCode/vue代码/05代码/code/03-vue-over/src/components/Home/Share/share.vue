<template>
    <div class="mui-content">
        <div class="title">
            <ul :style="ulWidth">
                <li>
                    <a @click="getimages(-1)" href="javascript:void(0)">全部</a>
                </li>
                <li v-for="item in menus" :key="item.id">
                    <a @click="getimages(item.id)" href="javascript:void(0)">{{item.title}}</a>
                </li>
            </ul>
        </div>

        <div class="images">
            <ul>
                <li v-for="item in images" :key="item.id">
                    <router-link :to="{name: 'sharedetail', params: {id: item.id}}">
                        <img :src="item.img_url" alt="">
                        <p class="cover">
                            <span>{{item.title}}</span><br>
                            {{item.zhaiyao}}
                        </p>
                    </router-link>
                </li>
                
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        //分类数据
        menus: [],
        //ul的宽度
        ulWidth: 'width: 600px',
        images: []
      }
    },
    created() {
      this.getmenus();

      //加载全部分类数据  -1全部分类数据
      this.getimages(-1);
    },
    methods: {
      //获取分类数据
      getmenus() {
        let url = this.common.apiHost + 'getimgcategory';
        this.$http.get(url).then((response) => {
          this.menus = response.body.message;

          //根据数据条数，设置ul的宽度
          this.ulWidth = 'width: ' + 76 * (this.menus.length + 1) + 'px';
        })
      },
      //根据分类的id 获取图片数据
      getimages(id) {
        //加载提示
        this.$indicator.open();

        let url = this.common.apiHost + 'getimages/' + id;
        this.$http.get(url).then((response) => {
          this.images = response.body.message;
          this.$indicator.close();
        }, () => {
          this.$toast('获取数据失败')
        })
      }
    }
  }
</script>

<style scoped>
    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    
    .title {
        overflow-x: auto;
        overflow-y: hidden;
    }
    
    .title>ul {
        width: 1000px;
    }
    
    .title>ul>li {
        display: inline-block;
        padding: 20px 5px;
    }
    
    .images {
        margin-top: 10px;
    }
    
    .images>ul {}
    
    .images img {
        height: 300px;
        width: 100%;
    }
    
    .images>ul>li {
        position: relative;
    }
    
    .images .cover>span {
        font-weight: bold;
    }
    
    .images .cover {
        color: #fff;
        position: absolute;
        left: 0px;
        bottom: 0px;
        background-color: rgba(92, 92, 92, 0.4);
        width: 100%;
        margin-bottom: 5px;
    }
</style>