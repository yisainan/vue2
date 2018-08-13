export const sourcecodeA = `<template>
  <div class="vd-demo__block vd-demo__block-2">
    <span class="vd-demo__demonstartion">默认文字</span>
    <vm-progress :percentage="0"></vm-progress>
    <vm-progress :percentage="70"></vm-progress>
    <vm-progress :percentage="30" strokeColor="purple"></vm-progress>
    <vm-progress :percentage="30" status="exception"></vm-progress>
    <vm-progress :percentage="50" status="info"></vm-progress>
    <vm-progress :percentage="80" status="warning"></vm-progress>
    <vm-progress :percentage="100" status="success"></vm-progress>
  </div>
  <div class="vd-demo__block vd-demo__block-2 vd-custom-text">
    <span class="vd-demo__demonstartion">自定义文字，需要附加样式</span>
    <vm-progress :percentage="0">占比 0%</vm-progress>
    <vm-progress :percentage="70">占比 70%</vm-progress>
    <vm-progress :percentage="30" strokeColor="purple">占比 30%</vm-progress>
    <vm-progress :percentage="30" status="exception">占比 30%</vm-progress>
    <vm-progress :percentage="50" status="info">占比 50%</vm-progress>
    <vm-progress :percentage="80" status="warning">占比 80%</vm-progress>
    <vm-progress :percentage="100" status="success">占比 100%</vm-progress>
  </div>
</template>
<style>
  .vd-custom-text .vm-progress-bar {
    padding-right: 100px;
    margin-right: -105px;
  }
</style>`

export const sourcecodeB = `<div class="vd-demo__block vd-demo__block-2">
  <span class="vd-demo__demonstartion">默认文字</span>
  <vm-progress :percentage="0" :text-inside="true" :stroke-width="18"></vm-progress>
  <vm-progress :percentage="70" :text-inside="true" :stroke-width="18"></vm-progress>
  <vm-progress :percentage="30" :text-inside="true" :stroke-width="18" strokeColor="purple"></vm-progress>
  <vm-progress :percentage="30" :text-inside="true" :stroke-width="18" status="exception"></vm-progress>
  <vm-progress :percentage="50" :text-inside="true" :stroke-width="18" status="info"></vm-progress>
  <vm-progress :percentage="80" :text-inside="true" :stroke-width="18" status="warning"></vm-progress>
  <vm-progress :percentage="100" :text-inside="true" :stroke-width="18" status="success"></vm-progress>
</div>
<div class="vd-demo__block vd-demo__block-2">
  <span class="vd-demo__demonstartion">自定义文字</span>
  <vm-progress :percentage="0" :text-inside="true" :stroke-width="18">占比 0%</vm-progress>
  <vm-progress :percentage="70" :text-inside="true" :stroke-width="18">占比 70%</vm-progress>
  <vm-progress :percentage="30" :text-inside="true" :stroke-width="18" strokeColor="purple">占比 30%</vm-progress>
  <vm-progress :percentage="30" :text-inside="true" :stroke-width="18" status="exception">占比 30%</vm-progress>
  <vm-progress :percentage="50" :text-inside="true" :stroke-width="18" status="info">占比 50%</vm-progress>
  <vm-progress :percentage="80" :text-inside="true" :stroke-width="18" status="warning">占比 80%</vm-progress>
  <vm-progress :percentage="100" :text-inside="true" :stroke-width="18" status="success">占比 100%</vm-progress>
</div>`

export const sourcecodeC = `<template>
  <div class="vd-demo__block vd-demo__block-2">
    <vm-progress type="circle" :percentage="0"></vm-progress>
    <vm-progress type="circle" :percentage="25"></vm-progress>
    <vm-progress type="circle" :percentage="30" strokeColor="purple"></vm-progress>
    <vm-progress type="circle" :percentage="30" status="exception"></vm-progress>
    <vm-progress type="circle" :percentage="50" status="info"></vm-progress>
    <vm-progress type="circle" :percentage="80" status="warning"></vm-progress>
    <vm-progress type="circle" :percentage="100" status="success"></vm-progress>
  </div>
  <div class="vd-demo__block vd-demo__block-2">
    <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;">占比{{percentage}}%</vm-progress>
    <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;"></vm-progress>
    <vm-progress type="circle" :percentage="percentage" reverse style="vertical-align: middle;"></vm-progress>
    <vm-button-group>
      <vm-button type="default" @click="increase">增加</vm-button>
      <vm-button type="default" @click="decrease">减少</vm-button>
    </vm-button-group>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        percentage: 70
      }
    },
    methods: {
      increase () {
        if (this.percentage === 100) return
        this.percentage += 10
      },
      decrease () {
        if (this.percentage === 0) return
        this.percentage -= 10
      }
    }
  }
</script>`

export const sourcecodeD = `<vm-button class="btn-striped" type="info" @click="striped=!striped">切换条纹</vm-button>
<vm-progress :percentage="0" :text-inside="true" :stroke-width="18" :striped="striped"></vm-progress>
<vm-progress :percentage="70" :text-inside="true" :stroke-width="18" :striped="striped"></vm-progress>
<vm-progress :percentage="30" :text-inside="true" :stroke-width="18" strokeColor="purple" :striped="striped"></vm-progress>
<vm-progress :percentage="30" :text-inside="true" :stroke-width="18" status="exception" :striped="striped"></vm-progress>
<vm-progress :percentage="50" :text-inside="true" :stroke-width="18" status="info" :striped="striped"></vm-progress>
<vm-progress :percentage="80" :text-inside="true" :stroke-width="18" status="warning" :striped="striped"></vm-progress>
<vm-progress :percentage="100" :text-inside="true" :stroke-width="18" status="success" :striped="striped"></vm-progress>

<script>
  export default {
    data () {
      return {
        striped: true
      }
    }
  }
</script>`
