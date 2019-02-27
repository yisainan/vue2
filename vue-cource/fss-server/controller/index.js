const saveFile = require('../util/save-file')
const readFile = require('../util/read-file')
const snowflake = require('../util/snowflake')
module.exports = {
	// 获取文件
	async getFile (req, res) {
		const { key, type } = req.body
		if (!key) throw '缺少key'
		let fileInfo = await global.mysql.file_manage.findOne({
			where: {
				key
			}
		})
		const { path, file_name } = fileInfo.dataValues
		if (!path) throw '无此文件'
		console.log({ key, type, path })
		switch (type) {
		case 'download': {
			res.status(200).set({
				'Content-Type': 'text/html',
				'Content-Disposition': `attachment; filename=${encodeURI(file_name)}`
			}).download(path, file_name)
			break
		}
		case 'text': {
			let content = ''
			const redisContent = await global.redis.getAsync(`file_content_${key}`)
			if (redisContent) content = redisContent
			else content = await readFile(path, 'utf-8')
			global.redis.set(`file_content_${key}`, content)
			res.status(200).send(content)
			break
		}
		}
	},
	// 上传文件
	async uploadFile (req, res) {
		let fileSaveRes = {}
		try {
			fileSaveRes = await saveFile(req)
		} catch (err) {
			//
		}
		const { size, path, name, type } = fileSaveRes
		const nameSplit = path.split('/')
		const save_name = nameSplit[nameSplit.length - 1]
		let insertRes = await global.mysql.file_manage.create({
			path,
			file_size: size,
			file_type: type,
			file_name: name,
			save_name,
			user: '1',
			key: snowflake()
		})
		res.json(insertRes)
	},
	// 获取文件列表
	async getFileList (req, res) {
		const { userId } = req.query
		if (!userId) throw '缺少必要参数'
		let fileList = await global.mysql.file_manage.findAll({
			where: {
				user: userId
			},
			attributes: {
				exclude: ['user', 'path', 'save_name']
			}
		})
		res.send(fileList)
	},
	// 删除文件
	async deleteFile (req, res) {
		const { key } = req.body
		if (!key) throw '缺少参数'
		let _res = global.mysql.file_manage.destroy({
			where: {
				key
			}
		})
		res.send(_res)
	}
}
