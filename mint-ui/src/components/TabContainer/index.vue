<template>
  <div class="page-tabcontainer">
    <gheader :examplename="examplename"></gheader>
    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</mt-button>
    </div>
    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container"
        v-model="active" swipeable>
        <mt-tab-container-item id="tab-container1">
          <mt-cell v-for="(n,i) in 15" :key="i" title="tab-container1"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <mt-cell v-for="(n,i) in 10" :key="i" title="tab-container2"></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <mt-cell v-for="(n,i) in 10" :key="i" title="tab-container3"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'TabContainer',
  data() {
    return {
      examplename: 'TabContainer',
      active: 'tab-container1'
    }
  }
}
</script>
<style scoped>
.nav {
  padding: 10px;
}
</style>
