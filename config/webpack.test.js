var commonConfig = require('./webpack.common.js')('test');
commonConfig.module.rules.push({
	test: /\.spec\.js$/,
	include: /test/,
	enforce: "pre",
	exclude: /(bower_components|node_modules)/,
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
	}
});
module.exports = {
	module: commonConfig.module
}