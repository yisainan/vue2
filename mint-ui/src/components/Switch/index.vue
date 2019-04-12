<template>
  <div class="page-switch">
    <gheader :examplename="examplename"></gheader>
    <div class="page-part page-switch-padding">
      <mt-switch v-model="value1" @change="handleChange(value1)">
        <label v-text="value1"></label>
      </mt-switch>
    </div>
    <div class="page-part page-switch-padding">
      <mt-switch v-model="value3" @change="handleChange(value3)">
        <label v-text="value3"></label>
      </mt-switch>
    </div>
    <mt-cell :title="'选项 ' + value2">
      <mt-switch v-model="value2" @change="handleChange(value2)"></mt-switch>
    </mt-cell>
    <mt-cell :title="'选项 ' + value3">
      <mt-switch v-model="value4" @change="handleChange(value4)"></mt-switch>
    </mt-cell>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Switcher',
  data() {
    return {
      examplename: 'Switch',
      value1: false,
      value2: false,
      value3: true,
      value4: true
    }
  },
  methods: {
    handleChange(event) {
      console.log(event)
    }
  }
}
</script>
