<template>
  <div>
    <list :list="list" :style="{color: 'red'}">
      <count-to slot="aa" slot-scope="count" :end-val="count.number"></count-to>
    </list>
  </div>
</template>
<script>
import List from '_c/list'
import CountTo from '_c/count-to'
export default {
  data () {
    return {
      list: [
        { number: 100 },
        { number: 45 }
      ]
    }
  },
  components: {
    List,
    CountTo
  },
  methods: {
    renderFunc (h, number) {
      return (
        <CountTo nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd} endVal={number} style={{color: 'pink'}}></CountTo>
      )
    },
    handleClick (event) {
      // console.log(event)
    },
    handleEnd () {
      // console.log('end!')
    }
  }
}
</script>
