<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'lison'
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // console.log(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(to.name, from.name)
    next()
  }
}
</script>
