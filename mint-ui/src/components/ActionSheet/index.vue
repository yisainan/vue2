<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <ul>
      <li><mt-button size="large" @click="actionSheet1">点击上拉action sheet</mt-button></li>
      <li><mt-button size="large" @click="actionSheet2">不带取消按钮的action sheet</mt-button></li>
    </ul>
    <mt-actionsheet  
        :actions= "actions1"  
        v-model="sheetVisible1"
        :closeOnClickModal="closeOnClickModal">  
    </mt-actionsheet> 
    <mt-actionsheet  
        :actions= "actions1"  
        v-model="sheetVisible2"
        cancel-text="">  
    </mt-actionsheet> 
    <gfooter v-show="!sheetVisible1 && !sheetVisible2"></gfooter>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  name: 'ActionSheet',
  data () {
    return {
      examplename: 'ActionSheet',
      closeOnClickModal: false,
      // action sheet 选项内容  
      actions1: [{  
        name: '拍照',  
        method : this.getCamera// 调用methods中的函数  
      }, {  
        name: '从相册中选择',   
        method : this.getLibrary// 调用methods中的函数  
      }],  
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏  
      sheetVisible1: false,
      sheetVisible2: false
    }
  },
  mounted () {

  },
  methods: {
    actionSheet1: function(){  
      this.sheetVisible1 = true;  
    },
    actionSheet2 () {
      this.sheetVisible2 = true;
    },  
    getCamera: function(){  
      Toast("打开照相机")  
    },  
    getLibrary: function(){  
      Toast("打开相册")  
    }  
  }
}
</script>
<style scoped>
ul {
  padding: 10px;
}
li {
  margin-top: 20px;
}
</style>
