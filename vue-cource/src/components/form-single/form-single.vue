<template>
  <Form ref="form" v-if="config" :label-width="100" :model="valueData" :rules="ruleData">
    <FormItem
      :label="config.label"
      label-position="left"
      :prop="config.name"
      :error="errorStore[config.name]"
      :key="`${_uid}`"
      @click.native="handleFocus(config.name)"
    >
      <component :is="config.type" :range="config.range" v-model="valueData[config.name]">
        <template v-if="config.children">
          <component
            v-for="(child, i) in config.children.list"
            :is="config.children.type"
            :key="`${_uid}_${i}`"
            :label="child.label"
            :value="child.value">{{ child.title }}</component>
        </template>
      </component>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'FormSingle',
  props: {
    valueData: {
      type: Object,
      default: () => ({})
    },
    ruleData: {
      type: Object,
      default: () => ({})
    },
    errorStore: {
      type: Object,
      default: () => ({})
    },
    config: Object
  },
  methods: {
    handleFocus (name) {
      this.errorStore[name] = ''
    },
    validate (callback) {
      this.$refs.form.validate(valid => {
        callback(valid)
      })
    }
  }
}
</script>

<style>

</style>
