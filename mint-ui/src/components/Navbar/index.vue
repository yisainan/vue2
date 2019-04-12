<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">选项一</mt-tab-item>
        <mt-tab-item id="2">选项二</mt-tab-item>
        <mt-tab-item id="3">选项三</mt-tab-item>
      </mt-navbar>
      <div>
        <mt-cell class="page-part" title="当前选中">{{ selected }}</mt-cell>
      </div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell v-for="(n,index) in 10" :key="index" :title="'内容 '+ n"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="(n,index) in 4" :key="index" :title="'测试 '+ n"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="(n,index) in 6" :key="index" :title="'选项 '+ n"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      examplename: 'Navbar',
      selected: '1'
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
