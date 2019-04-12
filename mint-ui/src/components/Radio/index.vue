<template>
  <div class="page-radio">
    <gheader :examplename="examplename"></gheader>
    <div class="page-radio-wrapper">
      <mt-radio class="page-part"
        title="单选框列表"
        v-model="value1"
        :options="options1">
      </mt-radio>
      <div>
        <mt-cell title="选中的项">{{ value1 }}</mt-cell>
      </div>
      <mt-radio class="page-part"
        title="第二个单选框列表"
        v-model="value2"
        :options="options2">
      </mt-radio>
      <div>
        <mt-cell title="选中的项">{{ value2 }}</mt-cell>
      </div>
      <mt-radio align="right"
        class="page-part"
        title="右对齐"
        v-model="value3"
        :options="options3">
      </mt-radio>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  data() {
    return {
      examplename: 'Radio',
      value1: '',
      value2: '值A',
      value3: ''
    }
  },
  created() {
    this.options1 = ['选项A', '选项B', '选项C'];
    this.options3 = ['选项A', '选项B', '选项C'];
    this.options2 = [
      {
        label: '被禁用',
        value: '值F',
        disabled: true
      },
      {
        label: '选项A',
        value: '值A'
      },
      {
        label: '选项B',
        value: '值B'
      }
    ]
  }
}
</script>
