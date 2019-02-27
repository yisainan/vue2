<template>
  <div>
    <p>AShow: {{ content }}</p>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
