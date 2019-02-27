const formidable = require('formidable')
const filesysConfig = require('../config/filesys')
const { path } = filesysConfig
module.exports = (req) => {
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm()
		form.encoding = 'utf-8'
		form.uploadDir = path
		form.keepExtensions = true
		form.parse(req, (err, fields, files) => {
			if (err) {
				reject(err)
			}
			const info = JSON.parse(JSON.stringify(files.file || files.icon))
			// fs.renameSync(info.path, `${path}/${key}`)
			resolve(info)
		})
	})
}
