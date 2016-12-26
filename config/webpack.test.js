var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js')('test');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
	cache: true,
	devtool: 'inline-source-map',
	module: {
		preLoaders: [{
				test: /\.vue$/,
				loader: 'vue',
				options: {
					loaders: {
						// Since sass (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this nessessary.
						'scss': 'vue-style!css!sass',
						'sass': 'vue-style!css!sass?indentedSyntax'
					}
					// other vue options go here
				}
			}, {
				test: /\.spec\.js$/,
				include: /src/,
				exclude: /(bower_components|node_modules)/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
				}
			},
			{
				test: /\.js?$/,
				include: /src/,
				exclude: /(node_modules|bower_components|\.spec\.js)/,
				loader: 'babel-istanbul',
				query: {
					cacheDirectory: true,
				}
			}
		],
		loaders: [{
				test: /\.vue$/,
				loader: 'vue',
				options: {
					loaders: {
						// Since sass (weirdly) has SCSS as its default parse mode, we map
						// the "scss" and "sass" values for the lang attribute to the right configs here.
						// other preprocessors should work out of the box, no loader config like this nessessary.
						'scss': 'vue-style!css!sass',
						'sass': 'vue-style!css!sass?indentedSyntax'
					}
					// other vue options go here
				}
			}, {
				loader: 'babel',
				tset: /\.js$/,
				exclude: [
					/node_modules/,
					path.resolve(helpers.root('src'), './patch')
				]
			},
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.html$/, loader: 'html' },

			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
			{
				test: /\.(png|jpe?g)$/,
				loaders: [
					'file?name=assets/[name].[hash].[ext]',
					// 'url-loader?limit=8192',
					'image-webpack'
				]
			},
			{
				test: /\.(gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.css$/,
				loader: 'style!css!postcss'
			}
		]
	},
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime', 'add-module-exports']
	},
	postcss: [
		//配置css样式自动更具can i use添加前缀
		require('autoprefixer')
	],
	plugins: [
		new webpack.ProvidePlugin({
			"Vue": "vue",
			"Vuex": "vuex",
			"VueRouter": "vue-router",
			"$": "jquery",
			"jQuery": "jquery"
		})
	]
});