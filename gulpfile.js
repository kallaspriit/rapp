var gulp = require('gulp'),
	gutil = require('gulp-util'),
	glob = require('glob'),
	KarmaServer = require('karma').Server,
	webpack = require('webpack'),
	fs = require('fs'),
	path = require('path');

// webpack compilation, see http://webpack.github.io/docs/configuration.html for options
gulp.task('webpack', function(done) {
	// create the build and cache directories
	if (!fs.existsSync('build')){ fs.mkdirSync('build'); }
	if (!fs.existsSync('build/cache')){ fs.mkdirSync('build/cache'); }

	// find the spec files
	var specFiles = glob.sync('specs/**/*.js');

	// run webpack to build the application and tests bundles
    webpack({

		// the base directory (absolute path!) for resolving the entry option
		context: path.resolve('./'),

		// resolve root path
		resolve: {
			root: path.resolve('./')
		},

		// entry points for the bundle
		entry: {
			app: 'app.js',
			test: specFiles
		},

		// bundle output
		output: {
			path: 'build/dist',
			filename: '[name].js',
			devtoolModuleFilenameTemplate: 'app:///[resource-path]',
			pathinfo: true
		},

		// modules setup
		module: {
			loaders: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader?cacheDirectory=build/cache'
				}
			]
		},

		// generate source maps
		devtool: 'source-map'
    }, function(err, stats) {
        if(err) {
			throw new gutil.PluginError('webpack', err);
		}

        /*gutil.log("[webpack]", stats.toString({
            // output options
        }));*/

        done();
    });
});

// rebuilds the project once, does not start watchers or server
gulp.task('build', ['webpack']);

// run tests using Karma
gulp.task('test', ['build'], function (done) {
	var server = new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);

	server.start();
});

// watches for file changes and rebuilds as needed
/*gulp.task('dev', ['build'], function() {
	gulp.watch([config.files.src, config.files.views, config.files.test], ['build']);
});*/


// default task when executing just "> gulp"
gulp.task('default', ['build']);