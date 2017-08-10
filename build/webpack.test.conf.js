var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
const util = require('./util.js')
delete baseWebpackConfig.entry
delete baseWebpackConfig.output
const env = process.env.NODE_ENV = "test"

module.exports = merge(baseWebpackConfig, {
	devtool: 'inline-source-map',
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: [util.resolve('test')]
		}, {
			test: /\.css$/,
			use: ["css-loader"]
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(env)
			}
		})
	]
})
