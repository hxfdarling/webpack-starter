var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var AssetsPlugin = require('assets-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
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
        alias: {
            //开启vue的standalone
            vue: 'vue/dist/vue.js'
        }
    },

    module: {
        loaders: [

            { loader: 'babel', tset: /\.js$/, exclude: [/node_modules|dist|\.history/] },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html' },

            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            {
                test: /\.(png|jpe?g)$/,
                loaders: [
                    // 'file?name=assets/[name].[hash][ext]'
                    'url-loader?limit=8192'
                    //  'image-webpack'
                ]
            },
            {
                test: /\.(gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                //用于分离css与js代码，默认使用moules后会将css代码打包到js中
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            }
            // {
            //     test: /\.css$/,
            //     exclude: helpers.root('src', 'app'),
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            // }, {
            //     test: /\.css$/,
            //     include: helpers.root('src', 'app'),
            //     loader: 'raw'
            // }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    postcss: [
        //配置css样式自动更具can i use添加前缀
        require('autoprefixer')
    ],
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
        //根据该配置自动引入web_modules下面的第三方库，省去了手动写require('xxx')
        new webpack.ProvidePlugin({
            'Vue': 'vue',
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery"
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('src') + '/assests/icon/favicon.ico',
            to:helpers.root('dist')
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
            name: ['polyfills', 'vendor'].reverse()
        }),
        //替换html文件里面的变量
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: 'src/index.html'
        })
    ]
};