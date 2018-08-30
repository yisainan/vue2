<template>
    <div class="mui-content">
        <div class="detail">
            <div class="top">
              <slider :imgUrl="imgUrl"></slider>
            </div>
        </div>
        <div class="sell">
            <h4>{{goods.title}}</h4>
            <div class="price">
                市场价：<s>￥{{goods.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 销售价：<span>￥{{goods.sell_price}}</span>
            </div>
            <div class="num">
                购买数量：<number @numchanged="getcount"></number>
                <div class="ball"></div>
            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button class="mui-btn mui-btn-danger">加入购物车</button>
            </div>
        </div>

        <div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{goods.goods_no}}</p>
                <p>库存情况：{{goods.stock_quantity}}件</p>
                <p>上架时间：{{goods.add_time | fmtDate('YYYY-MM-DD')}}</p>
            </div>
        </div>
        
        <div class="footer">
            <router-link to="/" class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</router-link>
            <router-link to="/" class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</router-link>
        </div>
    </div>
</template>

<script>
  //导入轮播图的组件
  import slider from '../../Subcom/slider.vue'
  //导入number组件
  import number from '../../Subcom/number.vue'

    //导出组件
    export default {
      data () {
        return {
          //轮播图组件需要的 接口地址
          imgUrl: '',
          id: -1,
          goods: {}
        }
      },
      created() {
        this.id = this.$route.params.id;
        //轮播图组件需要的 接口地址
        this.imgUrl = this.common.apiHost + 'getthumimages/' + this.id;

        //获取商品详情
        this.getgoods();


      },
      methods: {
        //根据id获取当前要显示的商品
        getgoods() {
          let url = this.common.apiHost + 'goods/getinfo/' + this.id;
          this.$http.get(url).then((response) => {
            this.goods = response.body.message[0];
          })
        },
        //获取子组件中的数据
        getcount(count) {
          console.log('numchanged:' + count);
        }
      },
      components: {
        slider: slider,
        number: number
      }
    }
</script>

<style scoped>
    .num {
        position: relative;
    }
    
    .ball {
        left: 115px;
        top: 3px;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: red;
        transition: all 0.5s linear;
        z-index: 1000;
        display: none;
    }
    
    .mui-content {
        background-color: #fff;
    }
    
    .top,
    .sell,
    .param,
    .footer {
        border: 1px solid rgba(92, 92, 92, 0.7);
        border-radius: 5px;
        margin: 5px;
        padding: 10px;
    }
    
    .sell h4 {
        color: dodgerblue;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .price,
    .num,
    .button {
        margin: 10px;
        font-size: 15px;
    }
    
    .price span {
        font-size: 18px;
        color: red;
    }
    
    .param h5 {
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
    }
    
    .info {
        margin-top: 10px;
        margin-left: 20px;
    }
    
    .info p {
        margin: 0;
    }
    
    .footer .mui-btn {
        width: 100%;
    }
    
    .footer .mui-btn-danger {
        margin-top: 10px;
    }
</style>
