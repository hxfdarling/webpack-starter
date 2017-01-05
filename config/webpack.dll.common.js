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
	const isDebug = (process.env.NODE_ENV = env) === 'dev';
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
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(env)
			}
		})
	];
	if (!isDebug) {
		plugin.push(new webpack.optimize.UglifyJsPlugin({
			mangle: {
				keep_fnames: true
			},
			sourceMap: false
		}));
	}
	const output = {
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
	}
	return {
		devtool: '#source-map',
		entry: {
			lib: lib
		},
		resolve: {
			alias: {
				//开启vue的standalone
				vue: 'vue/dist/vue.js'
			}
		},
		module: {
			loaders: [{
				test: /\.css$/,
				loader: 'style!css!postcss' //support hot module replacement
			}]
		},
		postcss: [
			//配置css样式自动更具can i use添加前缀
			require('autoprefixer')
		],
		output: output,
		plugins: plugin
	};
};