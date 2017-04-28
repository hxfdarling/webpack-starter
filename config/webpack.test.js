var config = require('./webpack.common.js')('test');
config.module.rules.push({
	test: /\.spec\.js$/,
	include: /test/,
	enforce: "pre",
	exclude: /(bower_components|node_modules)/,
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
	}
});
// add babel-plugin-istanbul for code intrumentation
config.module.rules[1].options = {
	plugins: [
		['istanbul', {
			exclude: [
				'test/',
				'config/'
			]
		}]
	]
}
module.exports = {
	devtool: 'inline-source-map',
	module: config.module
}