const redis = require('redis')
const { promisify } = require('util')
const redisConfig = require('../../config/redis')
const redisClient = redis.createClient(redisConfig)

redisClient.on('ready', () => {
	console.log('Redis连接成功'.cyan)
	global.redis = redisClient
	global.redis.getAsync = promisify(redisClient.get).bind(redisClient)
})
redisClient.on('error', (err) => {
	console.log('Redis连接失败'.red, err)
})
