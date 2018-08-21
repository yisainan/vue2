<template>
    <div class="mui-content">
        <div v-for="(item,index) in goodslist" :key="item.id" class="row">
            <div class="left">
                <mt-switch v-model="values[index]"></mt-switch>
            </div>

            <div class="center">
                <img width="75" height="75" :src="item.thumb_path" alt="">
            </div>

            <div class="right">
                <h4>{{item.title}}</h4>
                <span>￥{{item.sell_price}}</span>
                <number @numchanged="getcount" :id="item.id" :initcount="item.count"></number>
                <a href="javascript:void(0)" @click="remove(item.id)">删除</a>
            </div>
        </div>



        <div class="footer">
            <div class="left">
                <h4>总计(不含运费)</h4>
                <span>已选择商品{{getTotalCount}}件，共计￥{{totalPrice}}元</span>
            </div>
            <div class="right">
                <button class="mui-btn mui-btn-danger">去结算</button>
            </div>
        </div>

         {{values}}
    </div>

   
</template>

<script>
    import number from '../Subcom/number.vue'

    import { getItems, removeItem, setItem } from '../../common/localstorageHelp.js'

    import { objVue } from '../../communication.js'

    export default {
        data() {
            return {
              //绑定到开关控件
              values: [],
              //商品列表
              goodslist: [],
              //总价
              totalPrice: 0
            }
        },
        created() {
          //获取本地存储中商品的数据，请求服务器
          this.initpage()
        },
        methods: {          
          //获取本地存储中商品的数据，请求服务器
          initpage() {

            //获取 ids   5，6,7
            let array = getItems();  //从本地存储中获取的数据
            let tmpArray = []; //存储id
            array.forEach((item) => {
              tmpArray.push(item.goodsId);
            })
            let ids = tmpArray.join(',');

            //发送请求，获取数据
            let url = this.common.apiHost + 'goods/getshopcarlist/' + ids;
            this.$http.get(url).then((response) => {
              this.goodslist = response.body.message;
              //初始化绑定开关控件的values
              this.goodslist.forEach((item, index) => {
                this.values.push(false);
              })

              //给goodslist中的每一项增加 count属性
              for(let i = 0; i < array.length; i++) {
                for(let j = 0; j < this.goodslist.length; j++) {
                  let item = this.goodslist[j];
                  if(array[i].goodsId === item.id) {
                    item.count = array[i].count;
                    break;
                  }
                }
              }

            })
          },
          remove(id) {
            //1 本地存储中删除
            removeItem(id);

            //2 删除goodslist和values对应的数据
            //数组中 findIndex    es6   把满足条件的索引返回
            let index =  this.goodslist.findIndex((item) => {
              if(item.id === id) {
                return true;
              }
            })
            this.goodslist.splice(index, 1);
            this.values.splice(index, 1);

            //3 更新badge 
            objVue.$emit('update'); 

            //4 更新总价
            this.getTotalPrice();

          },
          getcount(obj) {
            //1 更新本地存储
            //obj  id,count,type
            if(obj.type == 'add') {
              //更新本地存储
              setItem({goodsId: obj.id, count: 1});
            }else if(obj.type == 'sub') {
              setItem({goodsId: obj.id, count: -1});
            }

            let array = getItems();  //从本地存储中获取的数据
            for(let i = 0; i < array.length; i++) {
                for(let j = 0; j < this.goodslist.length; j++) {
                  let item = this.goodslist[j];
                  if(array[i].goodsId === item.id) {
                    item.count = array[i].count;
                    break;
                  }
                }
              }


            //2 更新badge 
            objVue.$emit('update'); 

            //3 更新总价
            this.getTotalPrice();
          },
          //计算总价钱
          getTotalPrice() {
            this.totalPrice = 0;
            this.values.forEach((item, index) => {
              if(item) {
                //计算总价钱
                this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
              }
            })
          }
        },
        components: {
          number: number
        },
        //计算属性   依赖于 data中的数据，如果data中的数据发生变化就会调用
        computed: {
          getTotalCount() {
            let count = 0;
            this.totalPrice = 0;
            
            
            this.values.forEach((item, index) => {
              if(item) {
                count += this.goodslist[index].count;

                //计算总价钱
                this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
              }
            })


            return count;
          }
        }
    }
</script>

<style scoped>
    .row {
        padding: 10px 5px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.5);
        display: flex;
        align-items: center;
    }
    
    .row .center {
        padding: 0 10px;
    }
    
    .row .right h4 {
        color: dodgerblue;
        margin-bottom: 10px;
    }
    
    .row .right span {
        color: red;
        font-size: 20px;
        margin-right: 10px;
    }
    
    .row .right a {
        font-size: 14px;
        color: gray;
        margin-left: 10px;
    }
    
    .footer {
        background-color: lightgray;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        padding: 10px 5px;
        align-items: center;
    }
    
    .footer .left span {
        font-size: 14px;
    }
</style>