var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');
	HtmlWebpackPlugin = require('html-webpack-plugin');

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
			'app.js'
		]
	},

	// bundle output
	output: {
		path: path.resolve('build/production'),
		filename: '[name].js',
		devtoolModuleFilenameTemplate: 'app:///[resource-path]'
	},

	// modules setup
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel?stage=0'],
			},
			{
                test:   /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            }
		]
	},

	// configure postcss
	postcss: function () {
        return [
			require('cssnext')(),
			require('cssnano')()
		];
    },

	// plugins setup
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('gfx/app.css', { allChunks: true }),
		new HtmlWebpackPlugin({
			title: 'Redux React Router Async Example',
			filename: 'index.html',
			template: 'index.template.html'
		})
	]
}