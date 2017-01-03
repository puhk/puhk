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
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
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
            use: [{
                loader: 'react-hot-loader'
            }, {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-1', 'react']
                }
            }]
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
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        hot: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
};
