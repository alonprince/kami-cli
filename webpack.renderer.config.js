var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
    entry: {
        'logic': './assets/js/logic/app.jsx',
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        // path: __dirname,
        publicPath: "js",
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.scss', '.css', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: process.env.NODE_ENV === 'production' ? 'file-loader?name=[name].[ext]&publicPath=fonts/&outputPath=../fonts/' : 'file-loader',
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: process.env.NODE_ENV === 'production' ? 'file-loader?name=[name].[ext]?[hash]&publicPath=/images/&outputPath=../images/' : 'file-loader',
        }, {
            test: /\.jsx/,
            exclude: /node_modules/,
            include: [path.resolve(__dirname, 'assets/js')],
            use: [
                "babel-loader",
            ]
        // }, {
        //     test: /\.(js|vue)$/,
        //     enforce: 'pre',
        //     exclude: [
        //         /node_modules/,
        //         /icons/
        //     ],
        //     use: {
        //         loader: 'eslint-loader',
        //         options: {
        //             formatter: require('eslint-friendly-formatter')
        //         }
        //     }
        }],
    },
    devServer: {
        proxy: [{
            context: ['/api/**', '/images/**'],
            target: 'http://localhost:8000/',
            secure: false,
            changeOrigin: true,
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // console.log(module.context);
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1 && module.context.indexOf('chart') === -1 && module.context.indexOf('codemirror') === -1;
            }
        }),
    ],
}

var prodPlugins = [
    // new UglifyJSPlugin({
    //     compress: {
    //         warnings: false,
    //         drop_console: true
    //     },
    // })
]

if (process.env.NODE_ENV === 'production') {
    // 生产环境打包
    config.plugins = config.plugins.concat(prodPlugins);
}

module.exports = config;
