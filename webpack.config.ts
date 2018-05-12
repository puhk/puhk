import path = require('path');
import webpack = require('webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';

const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';

const metadata = {
  port: process.env.WEBPACK_PORT || 8080,
  host: process.env.WEBPACK_HOST || 'localhost'
};

let config: webpack.Configuration = {
  entry: ['./src/index.ts'],
  output: {
    path: path.resolve('build/dist'),
    filename: 'bundle.js',
    library: 'nojball-game',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /.ts$/,
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
      use: ['awesome-typescript-loader']
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['src', 'node_modules']
  },
  plugins: []
};

if (ENV === 'development') {
  Object.assign(config, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: 'public/index.html'
      })
    ],
    devtool: 'inline-source-map',
    devServer: {
      host: metadata.host,
      port: metadata.port,
      contentBase: path.resolve('public')
    }
  });
} else {
  Object.assign(config, {
    plugins: [
      /*new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      })*/
    ],
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      },
      victor: 'victor'
    }
  });
}

// config.plugins.push(new TsConfigPathsPlugin);

export default config;
