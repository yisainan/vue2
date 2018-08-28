<template>
  <div class="page">
    <template v-if="goods!=null">
      <swiper v-bind:list="header" hidetitle="true" :height="height"/>
      <div style="background:#fff">
        <div style="width:95%;margin:0 auto;">
          <div class="mui-clearfix">
            <div class="mui-pull-left" style="width:90%">
              <h5 v-html="goods.goods_name"></h5>
              ¥<b style="font-size: 24px"> {{goods.goods_price}}</b>
              <span v-if="goods.goods_freight==0">免邮</span>
              <span v-if="goods.goods_freight>0" style="font-size:12px">快递:¥{{goods.goods_freight}}</span>
            </div>
            <div class="mui-pull-right" @tap="sharebox=true" style="width: 10%;text-align:right">
              <img src="img/Bshome/share.png" style="width:16px;position:relative;right:3px;top:5px">
              <p>
                <small>分享</small>
              </p>
            </div>
          </div>
        </div>

      </div>
      <div class="share">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <p style="color:#383938;font-weight: 700;"><img src="img/Bshome/pp.png"
                                                            style="width:16px;margin-right:5px ;vertical-align: middle;"/>店铺品牌：{{goods.brand}}
            </p>
            <!--<h5 v-html="goods.goods_jianjie"></h5>-->
          </li>
        </ul>
      </div>
      <div class="collect" v-if="collection.length>0">
        <p>收藏</p>
        <img v-for="{v_img} in collection" v-bind:src="v_img" class="circle" v-imgdef/>
      </div>
      <div>
        <div id="slider" class="mui-slider">
          <div id="sliderSegmentedControl"
               class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <a class="mui-control-item" href="#item11" @tap="tab=1" v-bind:class="{'mui-active':tab==1}"> 商品描述</a>
            <a class="mui-control-item" href="#item22" @tap="tab=2" v-bind:class="{'mui-active':tab==2}"> 评价</a>
          </div>
          <div id="sliderProgressBar" v-if="tab==1" class="mui-slider-progress-bar mui-col-xs-6"></div>
          <div id="sliderProgressBar" v-if="tab==2" class="mui-slider-progress-bar mui-col-xs-6"
               style="-webkit-transform:translate3d(100%, 0px, 0px) translateZ(0px)"></div>
          <div class="mui-slider-group">
            <div id="item11" class="mui-slider-item mui-control-content mui-active" v-if="tab==1">
              <ul class="mui-table-view">
                <li class="mui-table-view-cell" v-html="goods.goods_body"></li>
              </ul>
            </div>
            <div id="item22" class="mui-slider-item mui-control-content" v-if="tab==2">
              <div class="mui-segmented-control" id="sliderProgressBar">
                <a class="mui-control-item mui-active  grey" @tap="etype=0">全部</a>
                <a class="mui-control-item red" @tap="etype=1">好评({{PL.good}})</a>
                <a class="mui-control-item red" @tap="etype=2">中评({{PL.middle}})</a>
                <a class="mui-control-item grey" @tap="etype=3">差评({{PL.bad}})</a>
              </div>
              <div calss="mui-silder-group">
                <div id="all" class="mui-control-content mui-silder-item mui-active">
                  <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="db in PL.evaluate">
                      <img v-bind:src="db.head_url" class="mui-pull-left"/><span>{{db.vname}}</span>
                      <p><span>{{db.ctime |dateShort}}</span>
                        <!--<span>颜色分类：eee粉色xxl</span>--></p>
                      <div class="detail">{{db.content}}</div>
                    </li>
                  </ul>
                  <div v-if="more" @tap="nextPL" class="mui-text-center more">点击加载更多</div>
                  <div class="no-content" v-if="(PL.evaluate||[]).length==0" style="padding-top:10px;">
                    <i></i>
                    <h4>暂无评论</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height:50px;"></div>
      <nav class="mui-bar-tab">
        <div class="mui-tab-item">
          <a class="shouc" @tap="collect"><img v-bind:src="'img/Bshome/like'+ifcollec+'.png'"
                                               style="width:15px;height:15px;vertical-align: top;margin:3px 5px 0 0;"/>收藏</a>
          <!--<img src="img/Bshome/chat.png" />
                              <label style="display:block;font-size:12px;margin-top: -2px;color:#666">联系卖家</label>-->
        </div>
        <a class="mui-tab-item" id="addToCart" @tap="gm(true)">加入购物车</a>
        <div class="mui-tab-item" id="buyNow" @tap="gm(false)">立即购买</div>
      </nav>
      <div class="mui-backdrop mui-active" v-show="showpopover" @tap.self="showpopover=false">
        <div class="popover">
          <img v-bind:src="header[0].posters" class="mui-pull-left"/>
          <p class="mui-pull-left">
          <div class="color">¥{{goods.goods_price*num}}</div>
          <div>已选：{{sp_value_name}}</div>
          </p>
          <div class="box">
            <CategorySelector @change="Categorychange" :sp_value_name="goods.sp_value_name" :goodsinfo="goodsinfo"/>
          </div>
          <div class="clear"></div>
          <p class="mui-pull-left" style="line-height:40px;">数量</p>
          <div class="mui-numbox mui-pull-right" data-numbox-step='1' data-numbox-min='1' data-numbox-max='100'
               v-mui="'numbox'">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input class="mui-input-numbox" v-model="num" type="number" @change="change($event)"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
          </div>
          <div class="close" @tap="showpopover=false">
            <img src="img/close.png" style="width:20px;height:20px;"></div>
          <div class="clear"></div>
          <button type="button" class="mui-btn" id="cartButton" @tap="submit">确认</button>
        </div>
      </div>
    </template>
    <!--<div class="sharebox" @tap="sharebox=false" v-if="sharebox">
        <h4>请点击右上角图标完成分享</h4>
        <img src="img/Bshome/share1.png" />
    </div>-->

    <div class="mui-fullscreen sharebox" @tap="sharebox=false" v-if="sharebox"
         style="background-image: url(img/ZC/share1.png);z-index: 33;"></div>
  </div>
</template>
<style scoped>
  .page {
    font-size: 15px;
    font-family: "微软雅黑";
  }

  .mui-slider-indicator {
    text-align: right;
  }

  .mui-slider-indicator .mui-indicator {
    width: 4px;
    height: 4px;
    margin: 1px 2px;
  }

  .mui-slider-item a img {
    max-width: 100%;
    height: 300px;
  }

  .mui-clearfix div, .mui-clearfix span {
    color: #0A2D4B;
    font-size: 14px;
  }

  img.circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .share {
    border-top: 10px solid #EFEFF4;
    border-bottom: 10px solid #EEF6F9;
  }

  .collect {
    background: #fff;
    padding: 10px 10px 10px 15px;
    border-bottom: 10px solid #E9ECF1;
  }

  .mui-segmented-control.mui-segmented-control-inverted ~ .mui-slider-progress-bar {
    background-color: #113351;
  }

  .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
    color: #000000;
  }

  .color {
    color: #113351;
  }

  h5 {
    line-height: 20px;
    font-size: 15px;
    color: #000514;
  }

  .mui-tab-item img {
    width: 23px;
    height: 23px;
    margin-bottom: -5px;
    margin-top: 3px;
  }

  .mui-bar-tab {
    position: fixed;
    z-index: 9;
  }

  .mui-bar-tab > .mui-tab-item {
    background-color: #E9ECF1;
    color: #fff;
  }

  #addToCart {
    background-color: #0B2E4C;
    color: #fff;
  }

  #buyNow {
    background-color: #7CA5C5;
    color: #fff;
  }

  /*购物车弹出*/
  .mui-popover-arrow.mui-bottom:after {
    color: green !important;
  }

  .popover {
    background: #fff;
    position: fixed;
    bottom: 0;
    margin-bottom: 0 !important;
    width: 100%;
    padding: 8px;
  }

  .popover img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  #cartButton {
    left: 0;
    background-color: #0B2E4C;
    width: 100%;
    color: #fff;
    height: 50px;
    border: none;
  }

  .box {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 8px;
    margin-bottom: 10px;
    text-align: left;;
  }

  .box span {
    padding: 3px 10px;
    border: 1px solid #C6C6C6;
    font-size: 12px;
    margin: 5px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }

  .mui-numbox {
    border-radius: 0px !important;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 5px;
  }

  #item22 .mui-segmented-control {
    border: none;
    padding: 12px 0 12px 15px;
    border-bottom: 1px solid #c8c7cc;
  }

  #item22 .mui-control-item {
    float: left;
    margin-right: 10px;
    border: 1px solid #939598;
    padding: 3px 10px;
    border-radius: 15px;
    line-height: 20px;
    color: #000;
    overflow: visible;
    width: auto;
    border: none;
    font-size: 10px;
  }

  #item22 .mui-control-item.mui-active {
    background-color: #0B2E4C;
    color: #fff;
  }

  #item22 ul li:not(:first-child) {
    border-top: 5px solid #efefef;
  }

  #item22 img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .detail {
    color: #0B2E4C;
  }

  .red {
    background-color: #FEECEA;
  }

  .grey {
    background-color: #ccc;
  }

  /*.sharebox { background: rgba(0,0,0,.5); position: fixed; width: 100%; height: 100%; top: 0; bottom: 0; z-index: 90; }
      .sharebox h4 { text-align: center; margin: 25% 0 15px 0; color: #efefef; }
      .sharebox img { width: 80%; margin: 0 auto; display: block; }*/
  .sharebox {
    background-size: cover;
  }

  .more {
    padding: 10px;
  }

  .shouc {
    color: #0B2E4C
  }
</style>
<script>
  import swiper from '../public/swiper'
  import wxapi from '../common/wxapi'
  import CategorySelector from '../public/CategorySelector'
  export default {
    created() {
      var tjuid = this.$route.params.uid;
      if (tjuid != localStorage.getItem("uid")) {
        localStorage.setItem("tjruid", tjuid)
        localStorage.setItem("tjrsid", this.$route.params.id)
      }
      this.height = window.innerWidth * 64 / 75;
    },
    mounted() {
      this.$api("Bsfamily/goodsDetail", {goods_id: this.$route.params.id}).then((obj) => {
        for (var k in obj.goods.sp_value_name
    )
      {
        obj.goods.sp_value_name[k].select = null;
      }
      ;
      Object.assign(this.$data, obj);
      this.collection = obj.collection || [];
      this.header = obj.goods.goods_img.split(',').map((a)=> {
          return {posters: a, s_title: ""}
        }
    )
      ;
      //if (this.sp_names.length > 0) this.sp_value_name = this.sp_names[0];
      wxapi.showMenuItems(obj.goods.goods_name, this.header[0].posters, this.$route.params.id, localStorage.getItem('uid'));
    })
      ;
      setTimeout(() => {
        this.nextPL();
    },
      0
    )
      ;
    },
    //beforeRouteLeave (to, from, next) {
    //    setTimeout(wxapi.hideMenuItems,100);
    //},
    components: {swiper, CategorySelector},
    data() {
      return {
        gid: 0,
        height: 0,
        sharebox: false,
        showpopover: false,
        goods: null,
        add: false,//添加到购物车
        num: 1,
        sp_value_name: "",
        collection: [],//[]v_img
        header: [],
        sp_names: [],
        pagepl: 0,
        PL: {},
        etype: 0,
        ifcollec: 2,
        tab: 1,
        more: true,
        goodsinfo: []
      }
    },
    methods: {
      change(e) {
        this.num = ~~e.srcElement.value;
        if (this.num < 1) this.num = 1;
      },
      Categorychange(db) {
        this.gid = db.goods_id;
        console.log(this.gid);
        this.goods.goods_price = db.goods_price
        var ss = [];
        for (var k in db.sp_value_name) {
          ss.push(db.sp_value_name[k].val);
        }
        this.sp_value_name = ss.join();
      },
      gm(t) {
        this.add = t;
        this.showpopover = true;
      },
      submit() {
        if (this.gid == 0) return mui.toast("请选择规格");
        if (this.add) {
          this.$api("Bsfamily/addCart", {
            goods_id: this.gid,
            num: this.num
            // sp_name: this.goods.sp_name,
            // sp_value_name: this.sp_value_name
          }).then((db) => {
            mui.toast("添加到购物车成功!");
          this.$router.go(-1);
          //this.$router.push({name:"购物车"});
        })
          ;
        } else {
          this.$store.commit("选择商品", this.goods);
          this.$store.commit("更新商品订单", {
            goods_id: this.gid,
            buyNum: this.num,
            // sp_name: this.goods.sp_name,
            // sp_value_name: this.sp_value_name,
            reciver_name: "",//收货人姓名
            reciver_telphone: "",//收货人电话
            reciver_province: "",//收货人省
            reciver_city: "",//收货人市
            reciver: "",//收货人详细地址
            posters: this.header[0].posters //附加参数
          });
          this.$router.push({name: "确认订单"});
        }
      },
      collect() {
        this.ifcollec = this.ifcollec == 1 ? 2 : 1;
        var data = {
          goods_id: this.goods.goods_id,
          ifcollec: this.ifcollec
        };
        this.$api("Bsfamily/collect", data)
      },
      nextPL() {
        var page = (this.PL.evaluate || []).length;
        this.$api("Bsfamily/evaluate", {goods_id: this.$route.params.id, page, etype: this.etype}).then((obj) => {
          if (page == 0
      )
        {
          this.PL = obj;
        }
      else
        {
          var list = obj.evaluate || [];
          this.PL.evaluate = this.PL.evaluate.concat(list);
        }
        this.more = (obj.evaluate || []).length == 5;
      })
        ;
      }
    },
    watch: {
      etype() {
        this.PL.evaluate = [];
        this.nextPL();
      }
    }
  }
</script>
