<template>
  <div class="argu">
    {{ $route.params.name }}
    {{ name }}
  </div>
</template>

<script>
  export default {
    name: 'argu',
    props: {
      name: {
        type: String,
        default: 'lison'
      }
    },
  }

</script>
