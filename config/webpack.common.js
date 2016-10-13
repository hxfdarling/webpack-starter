var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var AssetsPlugin = require('assets-webpack-plugin');
module.exports = {
    entry: {
        //polyfill es5,es6......
        'polyfills': './src/polyfills.js',
        //example:vuejs,jquery
        'vendor': './src/vendor.js',
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
                loaders: [
                    'file?name=assets/[name].[hash][ext]'
                    // 'url-loader?limit=8192'
                    //  'image-webpack'
                ]
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
    imageWebpackLoader: {
        pngquant: {
            quality: "65-90",
            speed: 4
        },
        svgo: {
            plugins: [{
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
            ]
        }
    },
    plugins: [
        new AssetsPlugin({
            path: helpers.root('dist'),
            filename: 'webpack-assets.json',
            prettyPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};