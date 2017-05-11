const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let webpackConfig = {
	context: path.resolve(__dirname, './src'),

	entry: {
		app: './index.js',
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
	},

	devServer: {
		contentBase: path.resolve(__dirname, './src'),
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] },
				}],
			},

			{
				test: /\.css$/,
				loader:	ExtractTextPlugin.extract({
					loader: 'css-loader?importLoaders=1&modules=true',
				}),

			},

			{
				test: /\.(sass|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(pug|jade)$/,
				use: [{
					loader: 'pug-loader',
					options: {
						pretty: false
					}
				}],
			},
			{
				test : /\.(png|jpe?g|svg)$/,
				loader : 'file-loader',
				options: {
					name: '[path][name].[ext]',
				}
			},
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
		],
	},

	plugins: [
		new webpack.ProvidePlugin({
				utils: path.resolve(__dirname, './src/globals/commons')
		}),

		new ExtractTextPlugin({
			filename: '[name].bundle.css',
			allChunks: true,
		}),

        new FaviconsWebpackPlugin('./img/logo.png')

	],

	resolve: {
		modules: [path.resolve(__dirname, './src'), 'node_modules']
	},
};


const pages = ['index', 'map'];

for (item of pages) {
	webpackConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: `${item}.html`,
			template: `${item}.pug`,
		})
	)
}

module.exports = webpackConfig;
