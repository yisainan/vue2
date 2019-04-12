<template>
  <div class="page-cell">
    <gheader :examplename="examplename"></gheader>
    <div class="page-cell-swipe-wrapper">
      <mt-cell-swipe v-for="(n,i) in 15" :key="i"
        :right="rightButtons"
        title="swipe me"></mt-cell-swipe>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'CellSwipe',
  data() {
    return {
      examplename: 'CellSwipe',
      rightButtons: null
    }
  },
  created() {
    this.rightButtons = [
      {
        content: 'Mark as Unread',
        style: { background: 'lightgray', color: '#fff' }
      },
      {
        content: 'Delete',
        style: { background: 'red', color: '#fff' },
        handler: () => this.$messagebox('delete')
      }
    ]
  },
  methods: {
    leftButtonHandler(evt) {
      console.log(123);
    }
  }
}
</script>
