const fs = require('fs')

module.exports = (path, readType) => {
	return fs.readFileSync(path, readType)
}
