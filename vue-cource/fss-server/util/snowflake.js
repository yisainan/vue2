const { Snowflake } = require('node-snowflake')
module.exports = (num = 0) => {
	return Snowflake.nextId(1, 1, Math.floor((1000 + num) * Math.random()))
}
