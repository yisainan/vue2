<template>
  <div class="vm-progress"
       :class="[
         'vm-progress--' + type,
          status ? 'is-' + status : '',
          {
            'vm-progress--without-text': !showText,
            'vm-progress--text-inside': textInside
          }
        ]">
    <div class="vm-progress-bar" v-if="type === 'line'">
      <div class="vm-progress-bar__outer" :style="{ height: strokeWidth + 'px', backgroundColor: trackColor }">
        <div class="vm-progress-bar__inner" :class="[{'vm-progress-bar__striped': striped}, linearClassName]" :style="barStyle">
          <div class="vm-progress-bar__innerText" v-if="showText && textInside"><slot>{{percentage}}%</slot></div>
        </div>
      </div>
    </div>
    <div class="vm-progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-else>
      <svg viewBox="0 0 100 100">
        <path class="vm-progress-circle__track" :d="trackPath" :stroke="trackColor" :stroke-width="relativeStrokeWidth"
              fill="none"></path>
        <path class="vm-progress-circle__path" :d="trackPath" :stroke-linecap="strokeLinecap" :stroke="stroke"
              :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
    </div>
    <div class="vm-progress__text"
         v-if="showText && !textInside"
         ref="progressText"
         :style="{ fontSize: progressTextSize + 'px' }">
      <template v-if="!st || strokeColor || $slots.default">
        <slot>{{percentage}}%</slot>
      </template>
      <i v-else :class="iconClass"></i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'VmProgress',

    componentName: 'VmProgress',

    props: {
      type: {
        type: String,
        default: 'line',
        validator: val => {
          return ['line', 'circle'].indexOf(val) > -1
        }
      },
      percentage: {
        type: [Number, String],
        default: 0,
        required: true,
        validator: val => {
          return val >= 0 && val <= 100
        }
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      strokeLinecap: {
        type: String,
        default: 'round',
        validator: val => {
          return ['butt', 'square', 'round'].indexOf(val) > -1
        }
      },
      strokeColor: {
        type: String
      },
      trackColor: {
        type: String,
        default () {
          return this.type === 'line' ? '#e4e8f1' : '#e5e9f2'
        }
      },
      textInside: {
        type: Boolean,
        default: false
      },
      showText: {
        type: Boolean,
        default: true
      },
      status: {
        type: String,
        validator: val => {
          return ['success', 'exception', 'warning', 'info'].indexOf(val) > -1
        }
      },
      width: {
        type: Number,
        default: 126
      },
      reverse: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      linearClassName: String
    },

    data () {
      return {
        st: this.status
      }
    },

    watch: {
      percentage (newVal) {
        if (this.$slots.default) return
        this.st = newVal === 100 ? 'success' : this.status
      }
    },

    computed: {
      barStyle () {
        let style = {}
        style.width = this.percentage + '%'
        if (this.strokeColor) {
          style.backgroundColor = this.strokeColor
        }
        return style
      },
      relativeStrokeWidth () {
        return (this.strokeWidth / this.width * 100).toFixed(1)
      },
      trackPath () {
        let radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
        let reverse = this.reverse ? 0 : 1
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 ${reverse} 0 ${radius * 2} a ${radius} ${radius} 0 1 ${reverse} 0 -${radius * 2}`
      },
      perimeter () {
        let radius = 50 - parseFloat(this.relativeStrokeWidth) / 2
        return 2 * Math.PI * radius
      },
      circlePathStyle () {
        let perimeter = this.perimeter;
        return {
          strokeDasharray: `${perimeter}px,${perimeter}px`,
          strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        }
      },
      stroke () {
        let ret
        switch (this.st) {
          case 'success':
            ret = '#13ce66'
            break
          case 'warning':
            ret = '#f7ba2a'
            break
          case 'info':
            ret = '#50bfff'
            break
          case 'exception':
            ret = '#ff4949'
            break
          default:
            ret = this.strokeColor ? this.strokeColor : '#20a0ff'
        }
        return ret
      },
      iconClass () {
        let prefix = `vm-progress-icon${this.type === 'line' ? '-circle' : ''}--`
        return prefix + (this.st === 'exception' ? 'error' : this.st)
      },
      progressTextSize () {
        return this.type === 'line'
          ? 12 + this.strokeWidth * .4
          : this.width * 0.111111 + 2
      }
    }
  }
</script>
