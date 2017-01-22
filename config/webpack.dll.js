const webpack = require('webpack');
const path = require('path');
module.exports = function(env) {

	// 资源依赖包，提前编译
	const lib = [
		"vue",
		"vue-router",
		"vuex",
		"animate.css"
	];
	var mode = "development";
	if (env.production) {
		mode = "production"
	}
	process.env.BUILD_RELEASE = process.env.NODE_ENV = process.env.ENV = mode;

	const isDebug = !env.production;
	const outputPath = path.join(__dirname, isDebug ? '../common/debug' : '../common/dist');
	const fileName = '[name].js';
	const plugin = [
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
			name: '[name]',
			context: __dirname
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(mode)
			}
		})
	];
	if (!isDebug) {
		plugin.push(new webpack.optimize.UglifyJsPlugin({
			mangle: {
				keep_fnames: true
			}
		}));
	}
	return {

		devtool: 'source-map',
		entry: {
			lib: lib
		},
		output: {
			path: outputPath,
			filename: fileName,
			/**
			 * output.library
			 * 将会定义为 window.${output.library}
			 * 在这次的例子中，将会定义为`window.vendor_library`
			 */
			library: '[name]',
			// libraryTarget: 'umd',
			// umdNamedDefine: true
		},
		resolve: {
			alias: {
				//开启vue的standalone
				vue: 'vue/dist/vue.js'
			}
		},
		module: {
			rules: [{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									require('precss'),
									require('autoprefixer')
								];
							}
						}
					}
				]
			}]
		},
		plugins: plugin
	};
};