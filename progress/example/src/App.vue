<template>
  <div id="app" class="progress">
    <demonstration
        tag="h2"
        title="Progress 进度条"
        anchor="progress-jin-du-tiao"
        description="用于展示操作进度，告知用户当前状态和预期。"
        :show-content="false">
    </demonstration>
    <demonstration
        title="线形进度条 — 百分比外显"
        anchor="xian-xing-jin-du-tiao-bai-fen-bi-wai-xian"
        :highlight="sourcecodeA"
        :multiple="true">
      <template slot="source">
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
      <template slot="explanation">
        <code>Progress</code> 组件设置 <code>percentage</code> 属性即可，表示进度条对应的百分比，必填，必须在 <code>0-100</code>。
      </template>
    </demonstration>
    <demonstration
        title="线形进度条 — 百分比内显"
        anchor="xian-xing-jin-du-tiao-bai-fen-bi-nei-xian"
        description="百分比不占用额外控件，适用于文件上传等场景。"
        :highlight="sourcecodeB"
        :multiple="true">
      <template slot="source">
        <div class="vd-demo__block vd-demo__block-2">
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
        </div>
      </template>
      <template slot="explanation">
        <code>Progress</code> 组件可通过 <code>stroke-width</code> 属性更改进度条的高度，并可通过 <code>text-inside</code> 属性来将进度条描述置于进度条内部。
      </template>
    </demonstration>
    <demonstration
        title="线形进度条 — 渐变条纹"
        anchor="xian-xing-jin-du-tiao-bai-fen-bi-wai-xian"
        :highlight="sourcecodeD">
      <template slot="source">
        <vm-button class="btn-striped" type="info" @click="striped=!striped">切换条纹</vm-button>
        <vm-progress :percentage="0" :text-inside="true" :stroke-width="18" :striped="striped"></vm-progress>
        <vm-progress :percentage="70" :text-inside="true" :stroke-width="18" :striped="striped"></vm-progress>
        <vm-progress :percentage="30" :text-inside="true" :stroke-width="18" strokeColor="purple" :striped="striped"></vm-progress>
        <vm-progress :percentage="30" :text-inside="true" :stroke-width="18" status="exception" :striped="striped"></vm-progress>
        <vm-progress :percentage="50" :text-inside="true" :stroke-width="18" status="info" :striped="striped"></vm-progress>
        <vm-progress :percentage="80" :text-inside="true" :stroke-width="18" status="warning" :striped="striped"></vm-progress>
        <vm-progress :percentage="100" :text-inside="true" :stroke-width="18" status="success" :striped="striped"></vm-progress>
      </template>
      <template slot="explanation">
        <code>Progress</code> 组件设置 <code>striped</code> 属性即可，表示进度条是否添加条纹渐变动画，还可以通过 `linear-class-name` 定义自己的进度动画。
      </template>
    </demonstration>
    <demonstration
        title="环形进度条"
        anchor="huan-xing-jin-du-tiao"
        :multiple="true"
        :highlight="sourcecodeC">
      <template slot="source">
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
          <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;">占比{{percentage}}%
          </vm-progress>
          <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;"></vm-progress>
          <vm-progress type="circle" :percentage="percentage" reverse style="vertical-align: middle;"></vm-progress>
          <vm-button-group>
            <vm-button type="default" @click="increase">增加</vm-button>
            <vm-button type="default" @click="decrease">减少</vm-button>
          </vm-button-group>
        </div>
      </template>
      <template slot="explanation">
        <code>Progress</code> 组件可通过 <code>type</code> 属性来指定使用环形进度条，在环形进度条中，还可以通过 <code>width</code> 属性来设置其大小。通过 <code>reverse</code>
        设置进度方向（逆时针，顺时针），还可以定义显示内容。
      </template>
    </demonstration>
    <demonstration
        title="Attributes"
        anchor="attributes"
        :show-content="false">
      <template slot="table">
        <table class="vd-demo__table">
          <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>类型</th>
            <th>可选值</th>
            <th>默认值</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>striped <i class="vd-demo__new">（新增）</i></td>
            <td>是否为进度添加条纹渐变动画</td>
            <td>boolean</td>
            <td>—</td>
            <td>false</td>
          </tr>
          <tr>
            <td>linear-class-name <i class="vd-demo__new">（新增）</i></td>
            <td>进度渐变类名</td>
            <td>string</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td><strong>percentage</strong></td>
            <td><strong>百分比（必填）</strong></td>
            <td>number</td>
            <td>0-100</td>
            <td>0</td>
          </tr>
          <tr>
            <td>type</td>
            <td>进度条类型</td>
            <td>string</td>
            <td>line/circle</td>
            <td>line</td>
          </tr>
          <tr>
            <td>stroke-width</td>
            <td>进度条的宽度，单位 px</td>
            <td>number</td>
            <td>—</td>
            <td>6</td>
          </tr>
          <tr>
            <td>stroke-color <i class="vd-demo__new">（新增）</i></td>
            <td>进度条的颜色</td>
            <td>string</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>track-color <i class="vd-demo__new">（新增）</i></td>
            <td>进度条的背景颜色</td>
            <td>string</td>
            <td>—</td>
            <td>—</td>
          </tr>
          <tr>
            <td>stroke-linecap <i class="vd-demo__new">（新增）</i></td>
            <td>进度条顶端的形状（只在 type=circle 时可用）</td>
            <td>string</td>
            <td>square(方)/round(圆)</td>
            <td>round</td>
          </tr>
          <tr>
            <td>text-inside</td>
            <td>进度条显示文字内置在进度条内（只在 type=line 时可用）</td>
            <td>Boolean</td>
            <td>—</td>
            <td>false</td>
          </tr>
          <tr>
            <td>status</td>
            <td>进度条当前状态</td>
            <td>string</td>
            <td>success/exception/warning/info</td>
            <td>—</td>
          </tr>
          <tr>
            <td>width</td>
            <td>环形进度条画布宽度（只在 type=circle 时可用）</td>
            <td>number</td>
            <td></td>
            <td>126</td>
          </tr>
          <tr>
            <td>show-text</td>
            <td>是否显示进度条文字内容</td>
            <td>boolean</td>
            <td>—</td>
            <td>true</td>
          </tr>
          <tr>
            <td>reverse <i class="vd-demo__new">（新增）</i></td>
            <td>是否是逆时针旋转，（只在type="circle"时可用）</td>
            <td>boolean</td>
            <td>—</td>
            <td>false</td>
          </tr>
          </tbody>
        </table>
      </template>
    </demonstration>
    <demonstration
        title="Slots"
        anchor="slots"
        :show-content="false">
      <template slot="table">
        <table class="vd-demo__table">
          <thead>
          <tr>
            <th>参数</th>
            <th>说明</th>
            <th>默认</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>default</td>
            <td>自定义描述文字</td>
            <td>percentage%</td>
          </tr>
          </tbody>
        </table>
      </template>
    </demonstration>
  </div>
</template>

<script>
  import { sourcecodeA, sourcecodeB, sourcecodeC, sourcecodeD } from './template'

  export default {
    data () {
      return {
        sourcecodeA,
        sourcecodeB,
        sourcecodeC,
        sourcecodeD,
        percentage: '70',
        striped: true
      }
    },
    methods: {
      increase () {
        if (this.percentage === 100) return
        this.percentage = parseInt(this.percentage, 10) + 10
      },
      decrease () {
        if (this.percentage === 0) return
        this.percentage = parseInt(this.percentage, 10) - 10
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #app {
    margin: 60px auto;
  }
  .progress {
    .vm-progress--line {
      width: 350px;
      margin-bottom: 15px;
    }
    .vd-custom-text .vm-progress-bar {
      padding-right: 100px;
      margin-right: -105px;
    }
  }
  .btn-striped {
    margin-bottom: 20px;
  }
</style>
