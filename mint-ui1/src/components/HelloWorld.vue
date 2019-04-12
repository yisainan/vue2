<template>
  <div class="hello">
    <div class="logo">
      <img src="../assets/img/mint-ui-logo.png" alt="">
      <p class="mint-ui-title">Mint UI 示例</p>
      <p class="mint-home-desc">基于 Vue.js 的移动端组件库</p>
    </div>
    <section class="page-route-list">
      <div v-for="(group,index) in navs" :key="index">
        <div class="page-title">{{group.title}}</div>
        <mt-cell v-for="(item,index) in group.list" :key="index"
          :to="item.path"
          is-link>
          <div slot="title">
            <i :class="['indexicon', 'icon-' + item.icon]"></i>
            <span>{{item.name}}</span>  
          </div>  
        </mt-cell>
      </div>
    </section>
  </div>
</template>

<script>
import { navs } from '../nav.route.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎来到 Mint-ui示例',
      navs: []
    }
  },
  created() {
    this.navs = navs;
    // console.log(this.navs)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    text-align: center;
  }
  h4 {
    padding-left: 10px;
    padding-top: 10px;
  }
  ul {
    padding: 10px 0px 5px 10px;
  }
  ul li:last-child {
    margin-bottom: 40px;
  }
</style>
