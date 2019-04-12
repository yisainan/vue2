<template>
  <div>
    <gheader :examplename="examplename"></gheader>
    <ul>
      <li>
        <mt-button size="large" @click="alertbox">alert提示框</mt-button>
      </li>
      <li>
        <mt-button size="large" @click="confirmbox">confirm提示框</mt-button>
      </li>
      <li>
        <mt-button size="large" @click="promptmbox">prompt提示框</mt-button>
      </li>
    </ul>
    <gfooter></gfooter>
  </div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui';
export default {
  name: 'MessageBox',
  data () {
    return {
      examplename: 'MessageBox'
    }
  },
  mounted () {

  },
  methods:{
    alertbox () {
      MessageBox.alert('提示', '操作成功');
    },
    confirmbox () {
      MessageBox.confirm('', {
        message: '您还未登录，无法获得分享奖励',
        title: '用户未登录',
        showConfirmButton:true,
        showCancelButton:true,
        closeOnClickModal: false,
        cancelButtonClass:'cancelButton',
        confirmButtonClass:'confirmButton',
        confirmButtonText:'立即登录',
        cancelButtonText:'明天再说'
      }).then(action => {
        //用户选择去登陆
        if (action == 'confirm') {
          Toast('用户选择立即登录')
        }
      }).catch(err => {
        //用户放弃登录则24小时之后再提示
        if (err == 'cancel') {
          Toast('用户选择明天再说')
        }
      });
    },
    promptmbox () {
      MessageBox.prompt('请输入姓名')
      .then(({ value, action }) => {
        if(action == 'confirm'){
          if(!value || value.trim() == ""){
            Toast("用户没有输入")
          }else {
            Toast(value)
          }
        }
      },
      ()=>{
        Toast("取消")
      })
    }
  }
}
</script>
<style scoped>
ul {
  padding: 10px;
}
li {
  margin: 20px 0;
}
</style>
