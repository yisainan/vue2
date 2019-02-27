const mysqlConfig = {
	'PRODUCTION': {
		host: process.env.PRODUCT_MYSQL_HOST,
		port: process.env.PRODUCT_MYSQL_PORT,
		username: process.env.PRODUCT_MYSQL_USER,
		password: process.env.PRODUCT_MYSQL_PASS
	},
	'LOCAL': {
		host: process.env.LOCAL_MYSQL_HOST,
		port: process.env.LOCAL_MYSQL_PORT,
		username: process.env.LOCAL_MYSQL_USER,
		password: process.env.LOCAL_MYSQL_PASS
	}
}
module.exports = mysqlConfig[process.env.NODE_ENV]
