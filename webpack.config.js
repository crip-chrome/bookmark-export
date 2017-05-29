const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  devtool: '#source-map',
  entry: {
    bundle: APP_DIR + '/entry.js',
    background: APP_DIR + '/background.js',
    styles: APP_DIR + '/sass/app.scss',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync']
  },
  output: {
    path: BUILD_DIR + '/js',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {enforce: 'pre', test: /\.js$|\.vue$/, loader: 'eslint-loader', exclude: /node_modules/, query: {fix: true}},
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: {
            js: 'babel-loader',
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'},
      {
        test: /\.scss$|\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/styles.css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'})
  ]
};

if (process.env.NODE_ENV === '') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  );
}
