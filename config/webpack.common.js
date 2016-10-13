var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        //填充库
        // 'polyfills': './src/polyfills.js',
        //框架库，例如vue，jquery
        // 'vendor': './src/vendor.js',
        'app': './src/main.js'
    },

    resolve: {
        extensions: ['', '.js', 'json'],
        // An array of directory names to be resolved to the current directory
        modules: [helpers.root('src'), 'node_modules'],
    },

    module: {
        loaders: [

            {
                loader: 'babel',
                tset: /\.js$/,
                exclude: [/node_modules|dist|\.history/]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpe?g)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }, {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            }, {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        //如果有扩展库需要对处理
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['app', 'vendor', 'polyfills']
        // }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};