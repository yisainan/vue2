<template>
  <div>
    <input v-model="userName" />
    <input type="password" v-model="password"/>
    <button @click="handleSubmit">登录</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login_page',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    handleSubmit () {
      this.login({
        userName: this.userName,
        password: this.password
      }).then(() => {
        console.log('success!!')
        this.$router.push({
          name: 'home'
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
