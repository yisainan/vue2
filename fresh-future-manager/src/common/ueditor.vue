<template>
  <div class="UE">
    <script id="editor" name="content" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor',this.config,{
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        autoHeight: false,
      }); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });

      UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
      UE.Editor.prototype.getActionUrl = function(action) {
          if (action == 'uploadimage' || action == 'uploadscrawl' || action == 'uploadimage') {
              return serverUrl + '/activity/uploadimage.do?realPath=chance&change=0';
          } else {
              return this._bkGetActionUrl.call(this, action);
          }
      }

    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      setUEContent() {
        this.editor.setContent(this.defaultMsg);
      }
    },
    watch: {
      defaultMsg(newV,oldV) {
        this.defaultMsg = newV;
        this.setUEContent();
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
<style lang="scss">
  .UE {
    margin-left: 92px;
    width: 800px;
    height: auto;
  }
  .edui-toolbar {
    line-height: 20px;
  }
</style>