const webpack = require('webpack');
const path = require('path');
const util = require('./util.js')
const resolve = util.resolve
const depsLoader = path.resolve(__dirname, './loaders/deps-loader/index.js')
const outputPath = resolve('dll')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

delete baseWebpackConfig.entry
delete baseWebpackConfig.output

module.exports = merge(baseWebpackConfig, {
	devtool: '#source-map',
	entry: {
		common: ['./src/vendor.js', './src/base.js']
	},
	output: {
		path: outputPath,
		filename: '[name].dll.js',
		/**
		 * output.library
		 * 将会定义为 window.${output.library}
		 * 在这次的例子中，将会定义为`window.vendor_library`
		 */
		library: '[name]_liberay',
		// libraryTarget: 'umd',
		// umdNamedDefine: true
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						// sourceMap: true
					}
				},
				"postcss-loader"
			]
		}]
	},
	plugins: [
		new webpack.DllPlugin({
			/**
			 * path
			 * 定义 manifest 文件生成的位置
			 * [name]的部分由entry的名字替换
			 */
			path: path.join(outputPath, 'manifest.json'),
			/**
			 * name
			 * dll bundle 输出到那个全局变量上
			 * 和 output.library 一样即可。
			 */
			name: '[name]_liberay',
			context: __dirname
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify("development")
			}
		})
	]
})
