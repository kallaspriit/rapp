import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import mkdirp from 'mkdirp';

// create the cache directory
mkdirp('build/cache/dev');

module.exports = {

	// the base directory (absolute path!) for resolving the entry option
	context: path.resolve('./'),

	// resolve root path
	resolve: {
		root: path.resolve('./'),
		extensions: ['', '.js']
	},

	// entry points for the bundle
	entry: {
		app: [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'app.js'
		]
	},

	// bundle output
	output: {
		path: path.resolve('build/dev'),
		publicPath: '',
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]',
		pathinfo: true
	},

	// modules setup
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel?stage=0&cacheDirectory=build/cache/dev']
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},

	// configure postcss
	postcss: function() {
		return [
			require('cssnext')(),
			require('cssnano')()
		];
	},

	// plugins setup
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			title: 'RAPP (dev)',
			debug: true,
			filename: 'index.html',
			template: 'index.template.html'
		})
	],

	// generate source maps
	devtool: 'source-map'
};