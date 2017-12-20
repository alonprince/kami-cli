var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var fs = require('fs');

var renderConfig = require('./webpack.renderer.config');

var compiler = webpack(renderConfig);

var server = new webpackDevServer(compiler, {
    contentBase: "public/views",
    hot: true,
    stats: {
        colors: true,
    },
    publicPath: '/',
    historyApiFallback: true
});

server.listen(8080, "localhost", function() {
    console.log('dev server started');
});
