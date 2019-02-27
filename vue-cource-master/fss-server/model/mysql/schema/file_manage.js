const baseSchema = require('../base')
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('file_manage', Object.assign(baseSchema(DataTypes), {
		key: {
			type: DataTypes.STRING,
			allowNull: false,
			column: '用于提取文件的key'
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			column: '文件保存路径'
		},
		file_name: {
			type: DataTypes.STRING,
			allowNull: false,
			column: '文件原始文件名'
		},
		file_type: {
			type: DataTypes.STRING,
			allowNull: true,
			column: '文件类型，一般为后缀名'
		},
		file_size: {
			type: DataTypes.INTEGER,
			allowNull: true,
			column: '文件大小'
		},
		save_name: {
			type: DataTypes.STRING,
			allowNull: false,
			column: '当前存储文件名'
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
			column: '存储该文件的用户ID'
		},
		storage_time: {
			type: DataTypes.INTEGER,
			allowNull: true,
			column: '文件存放时长，不填则为永久'
		}
	}), {
		tableName: 'file_manage',
		timestamps: true
	})
}
