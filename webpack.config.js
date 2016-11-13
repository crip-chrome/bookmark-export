var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
    new ExtractTextPlugin('../css/styles.css', {
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
];

if (process.argv.indexOf('--minimize') !== -1) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
}

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        bundle: APP_DIR + '/entry.es6',
        styles: APP_DIR + '/sass/app.scss',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync']
    },
    output: {
        path: BUILD_DIR + '/js',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
                options: {
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 3 versions']
                        })
                    ]
                }
            },
            {
                test: /\.es6$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
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
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: plugins,
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};