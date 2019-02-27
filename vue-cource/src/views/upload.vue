<template>
  <div>
    <Upload ref="upload" :action="`${baseURL}/upload_file`" multiple :before-upload="beforeUpload" :on-success="handleSuccess" :show-upload-list="false">
      <Button icon="ios-cloud-upload-outline">Upload Files</Button>
    </Upload>
    <Button @click="handleUpload">上传吧</Button>
    <Table :columns="columns" :data="fileList"></Table>
    <Modal v-model="showModal">
      <div style="height: 300px; overflow: auto">
        {{ content }}
      </div>
    </Modal>
  </div>
</template>

<script>
import { baseURL } from '@/config'
import { getFilesList, getFile, deleteFile } from '@/api/data'
import { downloadFile } from '@/lib/util'
export default {
  data () {
    return {
      baseURL,
      showModal: false,
      content: '',
      file: {},
      columns: [
        { title: '文件key', key: 'key' },
        { title: '文件名', key: 'file_name' },
        { title: '文件类型', key: 'file_type' },
        { title: '文件大小', key: 'file_size' },
        { title: '上传时间', key: 'createdAt' },
        {
          title: '存储有效期',
          key: 'storage_time',
          render: (h, { row }) => {
            return (
              <span>{ row.storage_time ? row.storage_time : '永久' }</span>
            )
          }
        },
        {
          title: '操作',
          key: 'handle',
          render: (h, { row }) => {
            return (
              <span>
                <i-button on-click={this.download.bind(this, row.key)}>下载</i-button>
                <i-button disabled={!row.file_type.includes('text')} on-click={this.showFileContent.bind(this, row.key)}>显示内容</i-button>
                <i-button on-click={this.deleteFile.bind(this, row.key)}>删除</i-button>
              </span>
            )
          }
        }
      ],
      fileList: []
    }
  },
  methods: {
    beforeUpload (file) {
      this.file = file
      return false
    },
    handleUpload () {
      this.$refs.upload.post(this.file)
    },
    handleSuccess () {
      this.$Message.success('文件上传成功')
      this.updateFileList()
      this.file = null
    },
    download (key) {
      downloadFile({
        url: `${baseURL}/get_file`,
        params: {
          key,
          type: 'download'
        }
      })
    },
    showFileContent (key) {
      getFile({
        key,
        type: 'text'
      }).then(res => {
        this.content = res
        this.showModal = true
      })
    },
    deleteFile (key) {
      deleteFile(key).then(res => {
        this.updateFileList()
      })
    },
    updateFileList () {
      getFilesList().then(res => {
        this.fileList = res
      })
    }
  },
  mounted () {
    this.updateFileList()
  }
}
</script>

<style>

</style>
