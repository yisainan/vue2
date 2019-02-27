const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const path = require('path')
const mysqlConfig = require('../../config/mysql')
const { host, port, username, password } = mysqlConfig

const sequelize = new Sequelize('fss', username, password, {
	host,
	port,
	dialect: 'mysql',
	logging: false,
	operatorsAliases: {
		$and: Op.and,
		$or: Op.or,
		$eq: Op.eq,
		$gt: Op.gt,
		$lt: Op.lt,
		$lte: Op.lte,
		$like: Op.like
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
})

const db = {}

fs.readdirSync(path.join(__dirname, './schema')).filter(filename => {
	return filename.indexOf('.') !== 0
}).forEach(filename => {
	const model = sequelize['import'](path.join(__dirname, './schema/', filename))
	db[model.name] = model
})

sequelize.authenticate().then(err => {
	if (err) console.log(err)
	console.log('mysql连接成功'.cyan)
}).catch(err => {
	console.log('mysql连接失败: '.red, err)
})

sequelize.sync({
	hooks : true
}).then(() => {
	console.log('数据库同步结构成功'.cyan)
}).catch(() => {
	console.log('数据库同步结构失败'.red)
})

db.sequelize = sequelize

module.exports = db
