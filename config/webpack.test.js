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
		]
	},
	babel: {
		plugins: ['add-module-exports']
	}
});