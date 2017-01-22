var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var AssetsPlugin = require('assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var MoveToParentMergingPlugin = require('move-to-parent-merging-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var path = require('path');
var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var config = {
	target: "web",
	entry: {
		//polyfill es5,es6......
		'polyfills': './src/polyfills.js',
		//example:vuejs,jquery
		'vendor': './src/vendor.js',
		'app': './src/main.js'
	},

	externals: {

	},
	resolve: {
		extensions: ['.js', '.json', '.html', '.vue', '.css'],
		// An array of directory names to be resolved to the current directory
		modules: [helpers.root('src'), 'node_modules'],
		alias: {
			//目录别名
			components: helpers.root('src/app/components'),
			//开启vue的standalone
			vue: 'vue/dist/vue.js'
		}
	},

	module: {
		/*
		正规表达式或正则表达式的数组。不解析文件匹配。
		它针对全解析的请求相匹配。
		无视大库时，这可以提高性能。
		*/
		// noParse: [],
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				loader: 'babel-loader', //'happypack/loader'
				test: /\.js$/,
				exclude: [
					/node_modules/,
					path.resolve(helpers.root('src'), './patch')
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},

			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
			{
				test: /\.(png|jpe?g)$/,
				loaders: [
					'file-loader?name=assets/[name].[hash].[ext]',
					// 'url-loader?limit=8192',
					// 'image-webpack'
				]
			},
			{
				test: /\.(gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[hash].[ext]'
			}
		]
	},
	plugins: [
		//根据该配置自动引入web_modules下面的第三方库，省去了手动写require('xxx')		
		new webpack.ProvidePlugin({
			"Vue": "vue",
			"Vuex": "vuex",
			"VueRouter": "vue-router"
		}),
		// 自动抽离异步加载的脚本引用到的资源到公共模块，第一次加载出来,可以设置参数，几个相同模块才会处理
		// new MoveToParentMergingPlugin(),

		new CopyWebpackPlugin([{
			from: helpers.root('src') + '/public',
			to: helpers.root('dist')
		}]),
		//在文件头上添加版权信息
		new webpack.BannerPlugin("Copyright by zman inc."),
		//写一个文件目录表
		new AssetsPlugin({
			path: helpers.root('dist'),
			filename: 'webpack-assets.json',
			prettyPrint: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendor', 'polyfills', 'load']
		}),
		//替换html文件里面的变量
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: 'src/index.html',
			inject: true,
			chunksSortMode: "dependency"
		})
	]
};
module.exports = function(mode) {
	switch (mode) {
		case "development":
			config.module.rules.push({
				test: /\.css$/,
				use: [ //support hot module replacement
						"style-loader",
						"css-loader",
						"postcss-loader"
					]
					//用于分离css与js代码，默认使用moules后会将css代码打包到js中
					//[hash:base64:5]_[path][name]_[local]
					// exclude: helpers.root('src', 'assests'),
					//	loader: 'style!css!postcss' //support hot module replacement
					//loader: ExtractTextPlugin.extract('style', 'css!postcss') //no support hot module replacement
					// loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[hash:base64:5]_[path][name]_[local]!postcss')
			});
			break;
		case "production":
			config.module.rules.push({
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
						fallbackLoader: "style-loader",
						loader: [
							"css-loader",
							"postcss-loader"
						]
					}) //no support hot module replacement
			});
			break;
		case "test":
			config.module.rules.push({
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			});
			break;
	}

	var dll = {
		manifest: require(mode === 'development' ? '../common/debug/manifest.json' : '../common/dist/manifest.json'),
		filepath: path.resolve(__dirname, mode === 'development' ? "../common/debug/lib.js" : "../common/dist/lib.js")
	}
	config.plugins.push(
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: dll.manifest
		}),
		new AddAssetHtmlPlugin([{
			filepath: dll.filepath,
			includeSourcemap: mode === 'development'
		}])
	);
	return config;
}