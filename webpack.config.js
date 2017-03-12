const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const DEBUG = ENV !== 'production';
const metadata = {
  port: process.env.WEBPACK_PORT || 8080,
  host: process.env.WEBPACK_HOST || 'localhost',
  ENV: ENV,
  HMR: process.argv.join('').indexOf('hot') >= 0 || !!process.env.WEBPACK_HMR
};

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index.jsx'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.resolve('src'),
      use: ['babel-loader']
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.png$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: '[name].[ext]'
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devtool: DEBUG ? 'inline-source-map' : false,
  devServer: {
    port: metadata.port,
    host: metadata.host,
    hot: true
  }
};
