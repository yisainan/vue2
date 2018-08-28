<template>
   <div id="app">
    <!--头部-->
    <div class="header_futer">
      <img src="../static/images/img1.png"  alt="" class="img1"/> 
      <div class="box_futer"></div>
      <p class="futer_god">O2O未来偶像养成</p>
      <p class="loginOut" @click="loginout">退出登录</p>
    </div>
    <div class="content_futer">
      <div class="left_futer left_new">
        <ul class="app-left-bar">
          <!-- 通告&活动管理 -->
          <li class="one-bar">
              <p class="bar-title" @click="barContentShow">通告&活动管理<span class="float-left">+</span></p>
              <ul class="bar-content" id="barConentUl1">
                <li class="hoverl two-bar">
                  <router-link tag="div" to="/ReleaseNotice" class="router-l">
                    <span class="color-fff spans">发布通告&活动</span>
                  </router-link>
                </li>
                <li class="hoverl two-bar">
                  <router-link tag="div" to="/hello" class="router-l">
                    <span class="color-fff spans">已发布的的通告&活动</span>
                  </router-link>
                </li>
                <li class="hoverl two-bar">
                  <router-link tag="div" to="/drafts" class="router-l">
                    <span class="color-fff spans">草稿箱</span>
                  </router-link>
                </li>
              </ul>
          </li>
          <!-- 星闻管理 -->
          <li class="one-bar">
            <p class="bar-title" @click="barContentShow">星闻管理<span class="float-left">+</span></p>
            <ul class="bar-content" id="barConentUl2">
              <li class="hoverl two-bar">
                <router-link tag="div" to="/Releasenews" class="router-l">
                  <span class="color-fff spans">发布星闻</span>
                </router-link>
              </li>
              <li class="hoverl two-bar">
                <router-link tag="div" to="/news" class="router-l">
                  <span class="color-fff spans">已发布的星闻</span>
                </router-link>
              </li>
              <li class="hoverl two-bar">
                <router-link tag="div" to="/draftsNew" class="router-l">
                  <span class="color-fff spans">草稿箱</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- 激活码管理 -->
          <li class="one-bar">
            <p class="bar-title" style="padding: 0"><router-link tag="div" class="activation-a" to="/ActivationCode">激活码管理</router-link></p>
          </li>
        </ul>
      </div>
      <!-- 右侧路由 -->
      <div class="right_futer">
        <router-view class="router"></router-view>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  },
  mounted() {
    var path1=this.$route.path;
    if(path1.indexOf('ReleaseNotice') > -1){
     $('#barConentUl1').show();
     $('#barConentUl2').hide();
    }else if (path1.indexOf('Releasenews') > -1){
      $('#barConentUl1').hide();
      $('#barConentUl2').show();
    }
  },
  methods: {
    barContentShow(event) {
      var event = event || window.event,
          barContent = $(event.target).siblings('.bar-content'),
          siblingsBarContent = $(event.target).parents('.one-bar').siblings('li').children('.bar-content');
      siblingsBarContent.slideUp(300).data('show','false');
      if (barContent.data('show') != 'true') {
        barContent.slideDown(300).data('show','true');
      } else {
        barContent.slideUp(300).data('show','false');
      }
    },
    loginout() {
      localStorage.setItem('isLogin','false');
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="scss">
.color-fff {
  color: #fff;
}
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;
}
.float-left {
  float: right;
}
.color-fff {
  color: #fff;
}
.show {
  display: block;
}

.header_futer{
  position: relative;
  z-index: 1001;
  height:95px;
  background:#2E2E2E;
  border-bottom: 1px solid #8C8C8C;
  .img1{
    width:200px;
    padding: 26px 28px 0 57px;
    float: left;
  }
  .loginOut {
    position: absolute;
    right: 50px;
    top: 33px;
    color: #fff;
    cursor: pointer;
  }
  .box_futer{
    float: left;
    width:2px;
    height:20px;
    background:#fff;
    margin-top: 36px;
  }
  .futer_god{
    float: left;
    line-height: 95px;
    padding-left: 15px;
    color:#fff;
    font-weight: 500;
  }
}
.content_futer{
  overflow: hidden;

  .left_futer{
    position: fixed;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
    min-height:1080px;
  }
  .left_new{
    width: 240px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top:95px;
    background-color:#2E2E2E;
    overflow: hidden;
    outline: none;
  }
}
.app-left-bar {
  margin: 10px 0;
  color: #fff;
  .one-bar {
    min-height: 38px;
  }
  .bar-title {
    width: 100%;
    font-size: 16px;
    height: 38px;
    line-height: 38px;
    padding: 0 15px;
  }
  li {
    cursor: pointer;
  }
}
.bar-content {
  width: 100%;
  display: none;
  .hoverl {
    cursor: pointer;
  }
  .hoverl:hover {
    background: #74551E;
    color:#74551E;
  }
}
.two-bar {
  /* background: #353F4F; */
  height: 38px;
  line-height: 38px;
  width: 100%;
  font-size: 14px;
}
.router-l {
  padding: 0 30px;
}
.router-link-active {
  background: #74551E;
}

.right_futer {
  padding: 0 0 30px 240px;
  .router{
    height:100%;
    
  }
}
.activation-a {
  display: inline-block;
  width: 100%;
  padding: 0 15px;
}
</style>
