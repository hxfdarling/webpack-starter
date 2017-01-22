var commonConfig = require('./webpack.common.js')('test');
commonConfig.module.rules.push({
	test: /\.spec\.js$/,
	include: /src/,
	enforce: "pre",
	exclude: /(bower_components|node_modules)/,
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
	}
}, {
	test: /\.js?$/,
	include: /src/,
	enforce: "pre",
	exclude: /(node_modules|bower_components|\.spec\.js)/,
	loader: 'babel-istanbul-loader',
	options: {
		cacheDirectory: true,
	}
});
module.exports = {
	module: commonConfig.module
}