<template>
  <div class="form-wrapper">
    <!-- <form-group :list="formList" :url="url"></form-group> -->
    <Button @click="handleSubmit" type="primary">提交</Button>
    <Button @click="handleReset">重置</Button>
    <form-single
      ref="formSingle"
      v-for="(item, index) in formList"
      :key="`form_${index}`"
      :config="item"
      :value-data="valueData"
      :rule-data="ruleData"
      :error-store="errorStore"
    ></form-single>
  </div>
</template>

<script>
import FormGroup from '_c/form-group'
import FormSingle from '_c/form-single'
import formData from '@/mock/response/form-data'
import clonedeep from 'clonedeep'
import { sentFormData } from '@/api/data'
export default {
  components: {
    FormGroup,
    FormSingle
  },
  data () {
    return {
      url: '/data/formData',
      formList: formData,
      valueData: {},
      ruleData: {},
      errorStore: {},
      initValueData: {}
    }
  },
  methods: {
    handleSubmit () {
      let isValid = true
      this.$refs.formSingle.forEach(item => {
        item.validate(valid => {
          if (!valid) isValid = false
        })
      })
      if (isValid) {
        sentFormData({
          url: this.url,
          data: this.valueData
        }).then(res => {
          this.$emit('on-submit-success', res)
        }).catch(err => {
          this.$emit('on-submit-error', err)
          for (let key in err) {
            this.errorStore[key] = err[key]
          }
        })
      }
    },
    handleReset () {
      this.valueData = clonedeep(this.initValueData)
    }
  },
  mounted () {
    let valueData = {}
    let ruleData = {}
    let errorStore = {}
    let initValueData = {}
    formData.forEach(item => {
      valueData[item.name] = item.value
      ruleData[item.name] = item.rule
      errorStore[item.name] = ''
      initValueData[item.name] = item.value
    })
    this.valueData = valueData
    this.ruleData = ruleData
    this.errorStore = errorStore
    this.initValueData = initValueData
  }
}
</script>

<style lang="less">
.form-wrapper{
  padding: 20px;
}
</style>
