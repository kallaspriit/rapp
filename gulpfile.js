var gulp = require('gulp'),
	gutil = require('gulp-util'),
	KarmaServer = require('karma').Server,
	WebpackDevServer = require('webpack-dev-server'),
	fs = require('fs'),
	webpack = require('webpack'),
	webpackConfig = {
		dev: require('./config/webpack.dev'),
		specs: require('./config/webpack.specs')
	};

// webpack compilation, see http://webpack.github.io/docs/configuration.html for options
gulp.task('webpack-dev', function(done) {
	// run webpack to build the application and tests bundles
    webpack(webpackConfig.dev, function(err, stats) {
        if(err) {
			throw new gutil.PluginError('webpack', err);
		}

        gutil.log("[webpack]", stats.toString({
            // output options
        }));

        done();
    });
});

gulp.task('webpack-specs', function(done) {
	// run webpack to build the application and tests bundles
    webpack(webpackConfig.specs, function(err, stats) {
        if(err) {
			throw new gutil.PluginError('webpack', err);
		}

        gutil.log("[webpack]", stats.toString({
            // output options
        }));

        done();
    });
});

// rebuilds the project once, does not start watchers or server
gulp.task('build', ['webpack-dev', 'webpack-specs']);

// run tests using Karma
gulp.task('test', ['build'], function (done) {
	var server = new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);

	server.start();
});

// watches for file changes and rebuilds as needed
gulp.task('dev', ['build'], function() {
	gulp.watch([
		'gulpfile.js',
		'app.js',
		'karma.conf.js',
		'config/**/*.js',
		'services/**/*.js',
		'specs/**/*.js',
		'reducers/**/*.js',
		'views/**/*.js',
		'build/gen/**/*.js'
	], ['build']);
});

gulp.task('server', ['build'], function() {

});


// default task when executing just "> gulp"
gulp.task('default', ['build']);