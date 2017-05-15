const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

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
            			pretty: true
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

        new HtmlWebpackPlugin({
            title : 'Index',
            filename: 'index.html',
            template : 'index.pug',
            hash: true
        }),

        new HtmlWebpackPlugin({
            title : 'Map',
            filename: 'map.html',
            template : 'map.pug',
            hash: true
        }),

        new FaviconsWebpackPlugin('./img/logo.png'),

        new OfflinePlugin({
            publicPath: '/',
            caches: {
                main: [
                    'app.*.css',
                    'vendor.*.js',
                    'app.*.js'
                ],
                additional: [
                    ':externals:'
                ],
                optional: [
                    ':rest:'
                ]
            },
            externals: [
                '/',
                'index.html',
                'map.html',
                'manifest.json',
                'manifest.webapp',
                'img/back.png',
                'img/logo.png',
                'img/marker.png',
                'img/marker-red.png',
                'img/menu.png',
                'img/multiply-nodes-4.png',
                'img/pass_icon.png',
                'img/phone_icon.png',
                'img/offline.png',
                'img/offline_phone.png',
                'img/phone_icon2.png',
                'img/pointer.png',
            ],
            ServiceWorker: {
                navigateFallbackURL: '/'
            },
            AppCache: {
                FALLBACK: {
                    '/': '/'
                }
            }
        })

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
