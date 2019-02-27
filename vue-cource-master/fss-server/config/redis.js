const redisConfig = {
	'PRODUCTION': {
		host: process.env.PRODUCT_REDIS_HOST,
		port: process.env.PRODUCT_REDIS_PORT,
		password: process.env.PRODUCT_REDIS_PASS
	},
	'LOCAL': {
		host: process.env.LOCAL_REDIS_HOST,
		port: process.env.LOCAL_REDIS_PORT,
		// password: process.env.LOCAL_REDIS_PASS
	}
}
module.exports = redisConfig[process.env.NODE_ENV]
