<template>
  <div class="page-button">
    <gheader :examplename="examplename"></gheader>
    <div class="page-button-wrapper">
      <div class="page-button-group">
        <mt-button size="large">default</mt-button>
        <mt-button size="large" type="primary">primary</mt-button>
        <mt-button size="large" type="danger">danger</mt-button>
      </div>
      <div class="page-button-group">
        <mt-button>default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
      </div>
      <div class="page-button-group">
        <mt-button size="small">default</mt-button>
        <mt-button size="small" type="primary">primary</mt-button>
        <mt-button size="small" type="danger">danger</mt-button>
      </div>
      <div class="page-button-group">
        <mt-button disabled size="large">default</mt-button>
        <mt-button disabled size="large" type="primary">primary</mt-button>
        <mt-button disabled size="large" type="danger">danger</mt-button>
      </div>
      <div class="page-button-group">
        <mt-button plain size="large">default</mt-button>
        <mt-button plain size="large" type="primary">primary</mt-button>
        <mt-button plain size="large" type="danger">danger</mt-button>
      </div>
      <div class="page-button-group">
        <mt-button>
          <img src="../../assets/img/tabbardefault.png" height="20" width="20" slot="icon">
          带自定义图片
        </mt-button>
      </div>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'MTButton',
  data () {
    return {
      examplename: 'Button'
    }
    
  }
}
</script>
