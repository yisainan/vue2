<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
      default: '#515a6e'
    }
  },
  computed: {
    classes () {
      return [
        'iconfont',
        `icon-${this.icon}`
      ]
    },
    styles () {
      return {
        color: this.color,
        fontSize: `${this.size}px`
      }
    }
  }
}
</script>

<style>

</style>
