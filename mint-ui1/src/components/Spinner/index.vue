<template>
  <div class="page-spinner">
    <gheader :examplename="examplename"></gheader>
    <div class="page-spinner-wrapper">
      <mt-cell title="snake">
        <mt-spinner color="#26a2ff" type="snake"></mt-spinner>
      </mt-cell>

      <mt-cell title="double-bounce">
        <mt-spinner color="#26a2ff" type="double-bounce"></mt-spinner>
      </mt-cell>

      <mt-cell title="triple-bounce">
        <mt-spinner color="#26a2ff" type="triple-bounce"></mt-spinner>
      </mt-cell>

      <mt-cell title="fading-circle">
        <mt-spinner color="#26a2ff" type="fading-circle"></mt-spinner>
      </mt-cell>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Spinner',
  data () {
    return {
      examplename: 'Spinner'
    }
  }
}
</script>
