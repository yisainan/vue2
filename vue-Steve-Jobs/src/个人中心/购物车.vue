<template>
  <div class="page mui-fullscreen">
    <ul class="mui-table-view" v-if="list.length>0">
      <li class="mui-table-view-cell mui-checkbox mui-left mui-transitioning" v-for="db,i in list">
        <div class="mui-slider-right mui-disabled">
          <a class="mui-btn mui-btn-red" style="transform: translate(0px, 0px);" @tap="del(db,i)">删除</a>
        </div>
        <div class="mui-slider-handle" style="transform: translate(0px, 0px);">
          <input type="checkbox" name="checkbox" v-model="db.checked"/>
          <img v-bind:src="db.goods_image" v-imgdef class="mui-pull-left pic"/>
<span>
                        <div>{{db.goods_name}}</div>
                        <p>{{db.sp_name}} {{db.sp_value_name}}</p>
                        <p class="color">
                          ￥{{db.price}}
                            <span class="mui-pull-right grey" @tap.stop>
                                <div class="mui-clearfix mui-pull-right mui-numbox" data-numbox-min='1'
                                     style="width:90px;height:30px;padding: 0 30px;border-radius:0px;" v-mui="'numbox'">
                                  <button class="mui-btn mui-btn-numbox-minus" type="button" style="width:30px;">-
                                  </button>
                                  <input id="box" class="mui-input-numbox" type="number" v-model="db.num"
                                         @change="editnum(db,$event)"/>
                                  <button class="mui-btn mui-btn-numbox-plus" type="button" style="width:30px;">+
                                  </button>
                                </div>
</span>
                        </p>
</span>
        </div>
      </li>
    </ul>
    <div v-if="list.length==0" class="mui-text-center gcwclear" style="padding-top:20%">
      <img src="img/my/gwc.png" style="width: 30%;margin: 25% 35% 0 35%;"/>
      <h4>购物车还是空的</h4>
        <p>快去挑几件喜欢的商品吧~</p>
        <button class="mui-btn" v-href="{path:'/Bshome'}">去逛逛</button>
    </div>
    <div style="height:50px;"></div>
    <nav class="mui-bar mui-bar-tab" v-if="list.length>0">
    <span class="mui-tab-item mui-checkbox mui-left">
                <input type="checkbox" name="checkbox" @click="selectall"/>
                <label>全选</label>
            </span>
      <span class="mui-tab-item sum">合计：{{heji}}<h6>不含运费</h6></span>
      <a class="mui-tab-item" id="buyNow" @tap="submit">结算</a>
    </nav>
  </div>
</template>
<style scoped>
  .color {
    color: #FC7D29;
  }

  .grey {
    color: grey;
  }

  .page {
    font-size: 15px;
    font-family: "微软雅黑";
    background: #F8F8F8;
  }

  .pic {
    width: 70px;
    height: 70px;
    margin-right: 15px;
  }

  .mui-table-view-cell input[type=checkbox] {
    top: 27px;
    left: -38px;
  }

  .mui-tab-item input[type=checkbox]:checked:before {
    color: #0B2E4C;
  }

  label {
    color: #000;
    text-align: left;
    vertical-align: super;
  }

  .sum {
    line-height: 18px;
    color: #0B2E4C;
    padding-top: 10px;
    font-size: 14px;
  }

  h6 {
    font-size: 9px;
    color: #ccc;
  }

  #buyNow {
    background-color: #0B2E4C;
    color: #fff;
  }

  .gcwclear h4 {
    color: #666;
    margin-top: 10px;
  }

  .gcwclear button {
    margin-top: 10px;
    padding: 6px 55px;
    color: #8692A1;
    border: 2px solid #8692A1;
    font-size: 16px;
    font-weight: 700;
    border-radius: 6px;
  }

  .gcwclear p {
    margin-top: 10px;
    color: #bbb
  }
</style>
<script>
  import pull from '../public/pull'
  export default {
    mounted() {
      this.shuaxin();
    },
    components: {pull},
    data() {
      return {
        list: []
      }
    },
    computed: {
      //})
      heji() {
        var p = 0;
        this.list2.forEach((a) => {
          p += parseFloat(a.price) * a.num;
      })
        ;
        return p.toFixed(2);
      },
      list2() {
        return this.list.filter((b) => b.checked
      )
        ;
      }
    },
    methods: {
      selectall(e) {
        this.list.forEach((a) => {a.checked = e.srcElement.checked;
      })
      },
      shuaxin() {
        this.$api("Member/shopping").then((list) => {
          this.list = (list || []).map((a )=> {a.checked = false;
        return a;
      })
        ;
      })
        ;
      },
      del(db, i) {
        mui.confirm("是否删除此项商品", ({index}) => {
          if (index != 1
      )
        return;
        this.$api("Member/deleshopping", {shid: db.shid}).then((list) => {
          this.list.splice(i, 1);
      })
        ;
      })
      },
      editnum(db, e) {
        var num = ~~e.srcElement.value;
        if (isNaN(num) || num < 1) return
        db.num = num;
        this.$api("Member/numshopping", {shid: db.shid, num});
      },
      submit() {
        var ss = this.list2;
        if (ss.length == 0) return mui.toast("请选择一个商品进行结算")
        var shid = ss.map((a )=> a.shid
      ).
        join();
        this.$router.push({name: '结算', params: {id: shid}})
      }
    }
  }
</script>
