import webpack = require('webpack');
import path = require('path');
import HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) || 'development';
const DEBUG = ENV !== 'production';
const metadata = {
	port: process.env.WEBPACK_PORT || 8080,
	host: process.env.WEBPACK_HOST || 'localhost',
	ENV: ENV,
	HMR: process.argv.join('').indexOf('hot') >= 0 || !!process.env.WEBPACK_HMR,
};

let config = {
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
		library: 'nojball-game-ui',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['awesome-typescript-loader'],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 20000,
							name: '[name].[ext]',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
};

if (DEBUG) {
	Object.assign(config, {
		entry: [
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			'react-hot-loader/patch',
			'./public/index.tsx',
		],
		plugins: [
			new HtmlWebpackPlugin({
				inject: 'head',
				template: 'public/index.html',
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
		],
		devtool: DEBUG ? 'inline-source-map' : false,
		devServer: {
			port: metadata.port,
			host: metadata.host,
			hot: true,
			contentBase: path.resolve('public'),
		},
	});
} else {
	Object.assign(config, {
		entry: ['./src/index.ts'],
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
			},
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
			},
			lodash: {
				commonjs: 'lodash',
				commonjs2: 'lodash',
				amd: 'lodash',
				root: '_',
			},
		},
	});
}

module.exports = config;
