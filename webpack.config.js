var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
    new ExtractTextPlugin('../css/styles.css', {
        allChunks: true
    })
];

if (process.argv.indexOf('--minimize') !== -1) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        bundle: APP_DIR + '/es6/Index.es6',
        styles: APP_DIR + '/sass/app.scss'
    },
    output: {
        path: BUILD_DIR + '/js',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: plugins
};