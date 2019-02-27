<template>
  <div>
    <a-input v-model="stateValue"/>
    <p>{{ stateValue }} -> lastLetter is {{ inputValueLastLetter }}</p>
    <!-- <a-show :content="inputValue"/> -->
    <p>appName: {{ appName }}, appNameWithVersion : {{ appNameWithVersion }}</p>
    <p>userName : {{ userName }}, firstLetter is : {{ firstLetter }}</p>
    <button @click="handleChangeAppName">修改appName</button>
    <p>{{ appVersion }}</p>
    <button @click="changeUserName">修改用户名</button>
    <button @click="registerModule">动态注册模块</button>
    <p v-for="(li, index) in todoList" :key="index">{{ li }}</p>
  </div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'store',
  data () {
    return {
      inputValue: ''
    }
  },
  components: {
    AInput,
    AShow
  },
  computed: {
    // ...mapState({
    //   appName: state => state.appName,
    //   userName: state => state.user.userName
    // })
    ...mapState({
      userName: state => state.user.userName,
      appVersion: state => state.appVersion,
      todoList: state => state.user.todo ? state.user.todo.todoList : [],
    }),
    stateValue: {
      get () {
        return this.$store.state.stateValue
      },
      set (val) {
        this.SET_STATE_VALUE(val)
      }
    },
    ...mapGetters([
      'appNameWithVersion',
      'firstLetter'
    ]),
    appName () {
      return this.$store.state.appName
    },
    // appNameWithVersion () {
    //   return this.$store.getters.appNameWithVersion
    // },
    // userName () {
    //   return this.$store.state.user.userName
    // },
    inputValueLastLetter () {
      return this.inputValue.substr(-1, 1)
    }
  },
  methods: {
    ...mapMutations([
      'SET_USER_NAME',
      'SET_APP_NAME',
      'SET_STATE_VALUE'
    ]),
    ...mapActions([
      'updateAppName'
    ]),
    handleInput (val) {
      this.inputValue = val
    },
    handleChangeAppName () {
      // this.$store.commit({
      //   type: 'SET_APP_NAME',
      //   appName: 'newAppName'
      // })
      // this.SET_APP_NAME({
      //   appName: 'newAppName'
      // })
      this.updateAppName()
      // this.$store.commit('SET_APP_VERSION')
    },
    changeUserName () {
      // this.$store.state.user.userName = 'haha' 错误的方法
      this.SET_USER_NAME('vue-cource')
      // this.$store.dispatch('updateAppName', '123')
    },
    registerModule () {
      this.$store.registerModule(['user', 'todo'], {
        state: {
          todoList: [
            '学习mutations',
            '学习actions'
          ]
        }
      })
    },
    handleStateValueChange (val) {
      this.SET_STATE_VALUE(val)
    }
  }
}
</script>
