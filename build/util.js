var path = require('path')
exports.assetsPath = function(_path) {
	return path.posix.join("assets", _path)
}
exports.resolve = function(dir) {
	return path.join(__dirname, '..', dir || '')
}
