var helpers = require('./helpers');
var webpack = require('webpack');
var commonConfig = require('./webpack.common.js');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonsChunkPluginIndex = commonConfig.plugins.findIndex(plugin => plugin.chunkNames);
if (~commonsChunkPluginIndex) {
	commonConfig.plugins.splice(commonsChunkPluginIndex, 1);
}
module.exports = webpackMerge(commonConfig, {
	devtool: 'inline-source-map',
	cache: true,
	plugins: [
		new ExtractTextPlugin('[name].css')
	]
})