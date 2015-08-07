var path = require('path'),
	webpack = require('webpack'),
	glob = require('glob');

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
		specs: glob.sync('specs/**/*.js')
	},

	// bundle output
	output: {
		path: 'build/specs',
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
				loaders: ['babel?stage=0'],
			}
		]
	},

	// plugins setup
	plugins: [
	],

	// generate source maps
	devtool: 'source-map'
}