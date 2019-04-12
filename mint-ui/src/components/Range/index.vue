<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <div class="page-range">
      <p class="page-range-header">基本功能</p>
      <mt-cell v-for="(item,key) in cells1" :key="key" :title="item.title" :label="'value:'+item.value">
        <mt-range v-model="item.value">
          <div slot="start" v-if="item.start">{{item.start}}</div>
          <div slot="end" v-if="item.end">{{item.end}}</div>
        </mt-range>
      </mt-cell>
      <p class="page-range-header">自定义</p>
      <mt-cell v-for="(item,index) in cells2" :key="item.index" :title="item.title"
        :label="'value:' + item.value">
        <mt-range v-model="item.value" :min="item.min || 0"
          :max="item.max || 100"
          :step="item.step || 1"
          :bar-height="item.barHeight || 1"
          :disabled="item.disabled">
          <div slot="start" v-if="item.start">{{item.start}}</div>
          <div slot="end" v-if="item.end">{{item.end}}</div>
        </mt-range>
      </mt-cell>
      <p class="page-range-header">场景举例</p>
      <mt-cell v-for="(item,index) in cells3" :key="item.title" :title="item.title"
        :label="'value:'+item.value">
        <mt-range v-model="item.value" :min="item.min || 0"
          :max="item.max ||100"
          :step="item.step || 1">
          <div slot="start" v-if="item.start"
           :style="{'font-size': item.start + 'px'}">{{item.start}}</div>
          <div slot="end" v-if="item.end"
           :style="{'font-size': item.end + 'px'}">{{item.end}}</div>
        </mt-range>
      </mt-cell>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Range',
  data () {
    return {
      examplename: 'Range',
      rangeValue1: 0,
      rangeValue2: 20,
      rangeValue3: 0,
      rangeValue4: 0,
      rangeValue5: 10,
      rangeValue6: 0,
      rangeValue7: 40,
      rangeValue8: 14,
      cells1: [],
      cells2: [],
      cells3: []
    }
  },
  mounted () {
    this.cells1 = [
      {
        title: '默认',
        value: this.rangeValue1
      },
      {
        title: '预设 value',
        value: this.rangeValue2
      },
      {
        title: '左右文字',
        value: this.rangeValue3,
        start: '0',
        end: '100'
      }
    ];
    this.cells2 = [
      {
        title: '定义步长',
        value: this.rangeValue4,
        step: 10
      },
      {
        title: '定义区间',
        value: this.rangeValue5,
        start: '10',
        end: '90',
        min: 10,
        max: 90
      },
      {
        title: '定义线宽',
        value: this.rangeValue6,
        barHeight: 5
      },
      {
        title: '置为无效',
        value: this.rangeValue7,
        disabled: true
      }
    ];
    this.cells3 = [
      {
        title: '字体大小',
        value: this.rangeValue8,
        start: '14',
        end: '22',
        min: 14,
        max: 22,
        step: 2
      }
    ];
  },
  methods: {

  }
}
</script>
<style scoped>
/* @component-namespace Range {
    @component index {
      .mt-range {
        width: 100%;
      }

      .mint-cell-value {
        flex: 2.5;
        position: relative;
      }

      @descendent header {
        margin-bottom: 8px;
        padding-left: 15px;

        &:not(:first-of-type) {
          margin-top: 28px;
        }
      }

      @descendent desc {
        padding: 5px 0 5px 5%;
      }
    }
  } */

</style>
