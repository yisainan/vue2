var express = require('express')
var router = express.Router()
const indexController = require('../controller/index')

router
	.post('/get_file', indexController.getFile)
	.post('/upload_file', indexController.uploadFile)
	.get('/get_file_list', indexController.getFileList)
	.delete('/delete_file', indexController.deleteFile)

module.exports = router
