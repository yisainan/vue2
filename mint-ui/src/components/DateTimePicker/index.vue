<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="page-datetime">
      <div class="page-datetime-wrapper">
        <mt-button @click="open('picker1')" size="large"> 点击弹出 DateTimePicker</mt-button>
        <mt-button @click="open('picker2')" size="large">点击弹出 DatePicker</mt-button>
        <mt-button @click="open('picker3')" size="large">点击弹出 TimePicker</mt-button>
        <mt-button @click="open('picker4')" size="large">自定义模板</mt-button>
        <mt-button @click="open('picker5')" size="large">设定初始值</mt-button>
      </div>
      <mt-datetime-picker 
        ref="picker1"
        v-model="value"
        :closeOnClickModel="false"
        @visible-change="handleVisibleChange"
        @confirm="handleChange">
      </mt-datetime-picker>
      <mt-datetime-picker 
        ref="picker2"
        type="date"
        v-model="value2"
        @confirm="handleChange">
      </mt-datetime-picker>
      <mt-datetime-picker 
        ref="picker3"
        type="time"
        v-model="value3"
        @confirm="handleChange">
      </mt-datetime-picker>
      <mt-datetime-picker 
        ref="picker4"
        type="date"
        v-model="value4"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleChange">
      </mt-datetime-picker>
      <mt-datetime-picker 
        ref="picker5"
        type="time"
        v-model="value5"
        @confirm="handleChange">
      </mt-datetime-picker>
      
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'DateTimePicker',
  data () {
    return {
      examplename: 'DateTimePicker',
      value: null,
      value2: null,
      value3: null,
      value4: null,
      value5: '04:32',
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false
    }
  },
  mounted() {

  },
  methods: {
    open(picker) {
      // console.log(picker);
      this.$refs[picker].open();
    },
    handleChange(value) {
      // console.log(value);
      Toast({
        message: '已选择 ' + value.toString(),
        position: 'bottom'
      })
    },
    handleVisibleChange(isVisible) {
      // console.log('弹窗是否显示：',isVisible);
    }
  }
}
</script>
<style  scoped>
 /* @component-namespace page {
    @component datetime {
      @descendent wrapper {
        padding: 0 20px;
        position: absolute 50% * * *;
        width: 100%;
        transform: translateY(-50%);

        button:not:(last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }  */
</style>
  
