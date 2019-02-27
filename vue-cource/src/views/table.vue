<template>
  <div>
    <!-- <edit-table :columns="columns" v-model="tableData" @on-edit="handleEdit"></edit-table> -->
    <edit-table-mul :columns="columns" v-model="tableData"></edit-table-mul>
    <Button @click="turnTo">打开参数页</Button>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
import EditTable from '_c/edit-table'
import EditTableMul from '_c/edit-table-mul'
export default {
  components: {
    EditTable,
    EditTableMul
  },
  data () {
    return {
      tableData: [],
      columns: [
        { key: 'name', title: '姓名' },
        { key: 'age', title: '年龄', editable: true },
        { key: 'email', title: '邮箱', editable: true }
      ]
    }
  },
  methods: {
    handleEdit ({ row, index, column, newValue }) {
      console.log(row, index, column, newValue)
    },
    turnTo () {
      let id = 'params' + (Math.random() * 100).toFixed(0)
      this.$router.push({
        name: 'params',
        params: {
          id
        }
      })
    }
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res
    })
  }
}
</script>

<style>

</style>
