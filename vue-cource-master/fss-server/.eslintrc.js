module.exports = {
	"env": {
		"es6": true,
		"node": true
	},
	"parser": 'babel-eslint',
	"extends": "eslint:recommended",
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		],
		"no-console": 0
	}
};
