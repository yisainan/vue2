<template>
  <div>
    <div class="mui-fullscreen page">
      <h1 class="title">{{title}}</h1>
      <div class="content">
        <img :src="endorsement.e_avatar">
        <div style="text-align: center;">{{endorsement.e_content}}</div>
      </div>
      <div class="jingdu clear">
        <mycircle data-type="" circle :value="moneybl">
          <h5>总额</h5>
          <div>
            <small>¥</small>
            {{endorsement.apply_amount}}
          </div>
          </mycircle>
          <p class="mui-text-center">已完成:{{moneybl}}% {{endorsement.e_raise_cash}}元</p>
          <div class="progress">
            <p class="mui-progressbar mui-progressbar-in">
              <span :style="{'transform':'translate3d(-'+(100-bili2)+'%, 0px, 0px)' }"></span>
            </p>
          </div>
          <p class="mui-text-center"> 剩余时间:{{residueday}}天</p>
      </div>
      <tab ref='tab' :list="['项目详情','报名相关','参赛标准']" width="33%" @change='tabchange'/>
      <div :class="{showall:true,active:showall}">
        <div v-if="tab==0" v-html="endorsement.description" class="article"></div>
        <div v-if="tab==1" v-html="endorsement.apply" class="article"></div>
        <div v-if="tab==2" v-html="endorsement.entry" class="article"></div>
      </div>
      <div class="mui-text-center imgbtn" :class="{active:showall}" @tap="showall=!showall"><img src='img/showall.png'/>
      </div>
      <div class="title">已有{{count}}人支持</div>
      <div class="zhic">
        <!--{{showrid}}-->
        <div class="zce" v-for="item in suppor">
          <img :src="item.s_avatar" class="man"/>
          <div class="cont">
            <h5><span class="mui-ellipsis">{{item.s_name}}</span>支持了<b>{{item.s_amount}}</b>元</h5>
            <p>留言:{{item.s_comments}} <span class="replay" style="float:right;" @click="showrid=item.sid"><img
              src="img/ZC/replay.png" class="replay"/>回复</span></p>
            <p v-for="a in item.reply"><span class="mui-ellipsis">{{a.vname}}</span>回复
              <!--<span class="mui-ellipsis" >{{item.s_name}}</span>-->:{{a.content}}
            </p>

            <textarea :placeholder="'回复'+item.s_name+';：'" @keyup.13="submit123($event,item)" v-if="showrid==item.sid"
                      class="replaycontent"></textarea>
          </div>
        </div>
        <div v-if="more" @tap="nextPL" class="mui-text-center more">点击加载更多</div>
      </div>
    </div>
    <nav class="mui-fullscreen btnx1" v-if="endorsement.ftype==1">
      <button class="mui-btn mui-btn-success" disabled="disabled">众筹成功</button>
    </nav>
    <nav class="mui-fullscreen btnx1" v-if="endorsement.ftype==2">
      <button class="mui-btn" disabled="disabled">众筹失败</button>
    </nav>
    <nav class="mui-fullscreen btnx2" v-if="endorsement.ftype==0&&isme">
      <button class="mui-btn" v-href="{name:'支持众筹',params: { id: $route.params.id },query:{vid:0}}">自己付款</button>
      <button class="mui-btn active" @tap="sharebox=true">分享给大家</button>
    </nav>
    <nav class="mui-fullscreen btnx3" v-if="endorsement.ftype==0&&!isme">
      <button class="mui-btn active"
              v-href="{name:'支持众筹',params: { id: $route.params.id},query:{vid:$route.params.uid}}">支持TA
      </button>
      <button class="mui-btn" v-href="{name:'发布项目',params:{id:$route.params.id}}">我要参加</button>
      <button class="mui-btn" @tap="sharebox=true">分享给大家</button>
    </nav>
    <div class="mui-fullscreen sharebox" v-if="sharebox" @tap="sharebox=false"
         style="background-image: url(img/ZC/share1.png);z-index: 33;"></div>
  </div>
</template>
<style scoped>
  .mui-ellipsis {
    display: inline-block;
    width: 77px;
    vertical-align: bottom;
  }

  .page {
    background: #fff;
    overflow: auto;
    bottom: 50px;
  }

  .title {
    font-size: 16px;
    margin: 0;
    padding: 0 20px;
    line-height: 40px;
    color: #666;
  }

  .content {
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    padding: 15px 10px;
    height: 120px;
    font-family: "微软雅黑";
    font-size: 16px;
    color: #666;
  }

  .article section, .article p {
    width: 95%;
    margin: 0 auto;
    display: inline-block;
  }

  .content div {
    font-size: 14px;
    height: 86px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content img {
    width: 90px;
    margin: 0 10px;
    float: left;
  }

  .cont p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .progress {
    padding: 10px 20px;
  }

  .mui-progressbar {
    height: 10px;
    margin: 5px 0;
  }

  .mui-progressbar span {
    background: url(./progress.png);
    background-size: contain;
  }

  .jingdu {
    margin: 30px 0
  }

  /*选项卡*/

  .tab {
    border-top: 1px solid #ccc;
    margin-top: 10px;
  }

  .showall {
    height: 100px;
    overflow: hidden;
    clear: both;
    background: #EDEDED;
    margin-top: 6px
  }

  .showall.active {
    height: auto;
    background: #fff;
    min-height: 150px;
  }

  .imgbtn {
    border-top: 1px solid #ccc;
    margin-top: 6px;
    margin-bottom: 10px
  }

  .imgbtn.active img {
    transform: rotate(-180deg);
    transition-duration: .3s;
  }

  /*支持者*/

  .zce {
    padding: 10px 15px;
  }

  .zce img.man {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 8px;
  }

  /*留言*/
  .replay {
    font-size: 13px;
  }

  .replay img {
    width: 15px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .zce h5 {
    color: #222
  }

  /*.replaycontent{display:none;}*/
  .zce b {
    color: orangered
  }

  /*底部按钮*/

  nav {
    background: #fff
  }

  nav {
    height: 50px;
    top: inherit;
    text-align: center
  }

  nav .mui-btn {
    margin: 8px 2px 0 2px;
    border-radius: 6px;
    font-size: 14px;
    height: 36px
  }

  nav .mui-btn.active {
    background: #7BA4C4;
    border: none;
    color: #fff;
  }

  nav .mui-btn.yellow {
    background: #FF9916;
    color: #fff;
  }

  nav.btnx1 .mui-btn {
    width: 90%;
  }

  nav.btnx2 .mui-btn {
    width: 45%;
  }

  nav.btnx3 .mui-btn {
    width: 30%;
  }

  .sharebox {
    background-size: cover;
  }

  .more {
    padding: 10px;
  }
</style>
<script>
  import mycircle from "../public/circle"
  import comm from '../common/comm'
  import cache from "../common/cache"
  import tab from './tab'
  import wxapi from '../common/wxapi'
  export default {
    created() {
      if (this.$route.params.uid == this.uid) {
        this.isme = true
      }
    },
    mounted() {
      var cmd = "otherzhongchou";
      if (this.isme) cmd = "myzhongchou"
      this.$api("Zhongchou/" + cmd, {
        fid: this.$route.params.id,
        page: 0,
        vid: this.$route.params.uid
      }, -10).then((db) => {
        Object.assign(this.$data, db);
      if (!this.isme) {
        this.title = this.endorsement.e_name + "的众筹"
      }
      comm.updateTitle(this.title);
      // this.suppor = [
      //     { s_avatar: "1111", s_name: "sssss", s_comments: "sss", s_amount: 12 }
      // ]
      wxapi.showMenuItems(this.endorsement.e_name + "的众筹", this.endorsement.e_avatar, this.$route.params.id, localStorage.getItem('uid'), 5);
      this.more = this.suppor.length == 5;
    })
      ;
      // window.test = this;
    },
    components: {tab, mycircle},
    data() {
      return {
        sharebox: false,
        tab: 0,
        showall: false,
        title: "我的众筹",
        showrid: null,
        uid: localStorage.getItem("uid"),

        endorsement: {ftype: 0},
        suppor: [],
        "count": "0",
        "moneybl": null,
        "daybl": 0.8,
        "residueday": 8,
        apply: 0,
        fid: 0,
        isme: false,
        more: true,
      }
      // return new Promise(f => {
      //     f({ title: "xxxx" })
      //     return { title: "xxx" }
      // });
      // Zhongchou/myzhongchou
      // return {
      //
      //
      // }
    },
    computed: {
      bili2() {
        var f = ~~(this.daybl || 100);
        if (f < 1) f = 1;
        if (f > 100) f = 100;
        return f;
      }
    },
    watch: {},
    methods: {
      //...mapMutations(["zzzz"]),
      //...mapActions(["fundddd"]),
      tabchange({index}) {
        this.tab = index;
      },
      nextPL() {
        var cmd = "otherzhongchou";
        if (this.isme) cmd = "myzhongchou"
        this.$api("Zhongchou/" + cmd, {
          fid: this.$route.params.id,
          page: this.suppor.length,
          vid: this.$route.params.uid
        }, -10).then((db) => {
          this.suppor = this.suppor.concat(db);
        // console.log(this.suppor.length, db)
        this.more = db.length == 5;
      })
        ;
      }
      ,
      submit123: function (e, item) {
        var content = e.srcElement.value
        this.$api("Zhongchou/reply", {
          content, sid: item.sid
        }).then((data) => {                     //,vid:item.vid
          item.reply.push(data)
        this.showrid = null;
        mui.toast('回复成功');
      })
        ;
        //

        //alert("显示下面的内容");
//           	$(a).next().show();
        //this.nextNode.display="block";
      }
    }
  }

</script>
