<template>
  <ul>
    <li @mousemove="handleMove" v-for="(item, index) in list" :key="`item_${index}`">
      <!-- <span v-if="!render">{{ item.number }}</span>
      <render-dom v-else :render-func="render" :number="item.number"></render-dom> -->
      <slot name="aa" :number="item.number"></slot>
      <slot :number="item.number"></slot>
    </li>
  </ul>
</template>
<script>
import RenderDom from '_c/render-dom'
export default {
  name: 'List',
  components: {
    RenderDom
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleMove (event) {
      event.preventDefault()
    }
  }
}
</script>
