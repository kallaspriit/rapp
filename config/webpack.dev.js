var path = require('path'),
	webpack = require('webpack');

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
		app: ['app.js']
	},

	// bundle output
	output: {
		path: 'build/dev',
		publicPath: '/xxx/', // TODO resolve this
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

				// https://github.com/babel/babel-loader
				loaders: ['react-hot', 'babel?stage=0'],
			}
		]
	},

	// plugins setup
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],

	// generate source maps
	devtool: 'source-map'
}