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


                <transition
                  v-on:before-enter="beforeEnter"
                  v-on:enter="enter"
                  v-on:after-enter="afterEnter"
                >
                  <div v-show="isShow" class="ball"></div>
                </transition>

                



            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button @click="addcart" class="mui-btn mui-btn-danger">加入购物车</button>
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
  //导入用户通信的空白的vue实例
  import { objVue } from '../../../communication.js'

  //获取操作localStorage的模块
  import { setItem } from '../../../common/localstorageHelp.js'
 
    //导出组件
    export default {
      data () {
        return {
          //轮播图组件需要的 接口地址
          imgUrl: '',
          id: -1,
          goods: {},
          //number组件中的数子
          count: 1,
          //控制动画的小球显示或者隐藏
          isShow: false
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
          //console.log('numchanged:' + count);
          this.count = count;
        },
        //点击加入购物车
        addcart() {
          //1 获取number子组件中的数字
          // console.log(this.count)
          //2 更新底部栏中的badge的值
          //把值通知给objVue
          objVue.$emit('updatebadge', this.count);

          //3 执行动画 -- 显示小球
          this.isShow = true;


          //4 本地存储要购买的商品和数量
          setItem({goodsId: this.id, count: this.count});
        },
        //执行动画的钩子函数
        beforeEnter(el) {
          //el 是要执行动画的元素
          //开始执行动画
          el.style.transform = 'translate3d(0,0,0)';
        },
        enter(el, done) {
          //getBoundingClientRect 可以获取元素在页面上的位置和大小
          let elX = el.getBoundingClientRect().left;
          let elY = el.getBoundingClientRect().top;

          //需要badge的位置
          let badge = document.querySelector('.mui-badge');
          let badgeX = badge.getBoundingClientRect().left;
          let badgeY = badge.getBoundingClientRect().top;

          //计算要过渡的距离
          let x = badgeX - elX;
          let y = badgeY - elY;

          el.style.transform = 'translate3d('+ x +'px,'+ y +'px,0)';

          done();
        },
        afterEnter(el) {
          this.isShow = false;
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
