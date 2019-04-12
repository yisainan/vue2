<template>
  <div class="page-badge">
    <gheader :examplename="examplename"></gheader>
    <div class="page-badge-wrapper">
      <div class="page-badge-container">
        <div class="page-part">
          <mt-badge type="primary" size="large">30</mt-badge>
          <mt-badge type="error" size="large">40</mt-badge>
          <mt-badge type="success" size="large">20</mt-badge>
          <mt-badge type="warning" size="large">10</mt-badge>
        </div>
        <div class="page-part">
          <mt-badge type="primary">30</mt-badge>
          <mt-badge type="error">30</mt-badge>
          <mt-badge type="success">20</mt-badge>
          <mt-badge type="warning">10</mt-badge>
        </div>
        <div class="page-part">
          <mt-badge type="primary" size="small">30</mt-badge>
          <mt-badge type="error" size="small">40</mt-badge>
          <mt-badge type="success" size="small">20</mt-badge>
          <mt-badge type="warning" size="small">10</mt-badge>
        </div>
        <div class="page-part">
          <mt-badge size="small" color="#888">自定义颜色</mt-badge>
        </div>
      </div>
      <div class="page-part">
        <mt-cell title="徽章">
          <span style="margin-right: 5px;">未读消息</span>
          <mt-badge type="error" size="small">10</mt-badge>
        </mt-cell>
      </div>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Badge',
  data () {
    return {
      examplename: 'Badge'
    }
  }
}
</script>
