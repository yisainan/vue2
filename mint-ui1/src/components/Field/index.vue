<template>
  <div class="page-field">
    <gheader :examplename="examplename"></gheader>
    <div class="page-field-wrapper">
      <div class="page-part">
        <mt-field label="用户名" placeholder="请输入用户名" :attr="{maxlength: 10}" v-model="username"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="emaill" v-model="useremail"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userpwd"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="userphone"></mt-field>
        <mt-field label="网站" placeholder="请输入网址" type="url" v-model="userurl"></mt-field>
        <mt-field label="数字" placeholder="请输入数字" type="number" v-model="usernum"></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date" v-model="userdate"></mt-field>
        <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="userinfo"></mt-field>
      </div>
      <div class="page-part">
        <mt-field placeholder="登录邮箱" type="email"></mt-field>
        <mt-field placeholder="密码" type="password"></mt-field>
      </div>
      <div class="page-part">
        <mt-field label="邮箱" placeholder="成功状态" state="success"></mt-field>
        <mt-field label="邮箱" placeholder="失败状态" state="error"></mt-field>
        <mt-field label="邮箱" placeholder="警告状态" state="warning"></mt-field>
      </div>
      <div class="page-part">
        <mt-field label="验证码" placeholder="输入验证码">
          <img src="../../assets/img/tabbardefault.png" alt="" height="48px" width="100px">
        </mt-field>
      </div>
    </div>
    <gfooter></gfooter>
  </div>
</template>
<script>
export default {
  name: 'Field',
  data() {
    return {
      examplename: 'Field',
      username: '',
      useremail: '',
      userpwd: '',
      userphone: '',
      userurl: '',
      usernum: '',
      userdate: '',
      userinfo: ''
    }
  }
}
</script>
