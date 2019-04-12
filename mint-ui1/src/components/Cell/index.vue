<template>
  <div class="page-cell">
    <gheader :examplename="examplename"></gheader>
    <div class="page-cell-wrapper">
      <mt-cell title="标题文字"></mt-cell>
      <mt-cell title="标题文字" value="说明文字"></mt-cell>
      <mt-cell title="标题文字" icon="more" value="带icon"></mt-cell>
      <mt-cell title="标题文字" icon="more">
        <span>icon 是图片</span>
        <img src="../../assets/img/tabbardefault.png" width="24" height="24">
      </mt-cell>
      <mt-cell title="标题文字" is-link value="带链接"></mt-cell>
      <mt-cell title="标题文字" is-link >
        <span style="color: green">这里是元素</span>
      </mt-cell>
      <mt-cell title="标题文字">
        <mt-button size="small" type="primary" icon="back">按钮</mt-button>
      </mt-cell>
      <mt-cell title="标题" label="描述信息" is-link></mt-cell>
      <mt-cell title="原生跳转" label="跳转到https://mint-ui.github.io" is-link to="https://mint-ui.github.io"></mt-cell>
      <mt-cell title="路由跳转" label="跳转到/#/toast" is-link to="/Toast"></mt-cell>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Cell',
  data() {
    return {
      examplename: 'Cell'
    }
  }
}
</script>
