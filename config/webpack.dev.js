var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
const ENV = process.env.BUILD_DEV = process.env.NODE_ENV = process.env.ENV = 'dev';
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
        new ExtractTextPlugin('assests/[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});