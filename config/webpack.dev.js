var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js')('development');
var helpers = require('./helpers');
const ENV = process.env.BUILD_DEV = process.env.NODE_ENV = process.env.ENV = 'development';
module.exports = webpackMerge(commonConfig, {
	//  devtool: "eval-source-map", //'cheap-module-eval-source-map',
	devtool: "source-map",
	output: {
		path: helpers.root('dist'),
		publicPath: '',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},

	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(ENV)
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],

	devServer: {
		hot: true,
		host: '0.0.0.0',
		port: 80,
		compress: true,
		contentBase: './src/public',
		historyApiFallback: true,
		stats: 'minimal',
		proxy: {
			"/server/**": {
				target: "http://localhost:8080",
				secret: false
			}
		}
	}
});