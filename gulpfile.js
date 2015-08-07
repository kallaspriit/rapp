var gulp = require('gulp'),
	gutil = require('gulp-util'),
	KarmaServer = require('karma').Server,
	WebpackDevServer = require('webpack-dev-server'),
	fs = require('fs'),
	postcss = require('gulp-postcss'),
	webpack = require('webpack'),
	webpackConfig = {
		dev: require('./config/webpack.dev'),
		production: require('./config/webpack.production'),
		specs: require('./config/webpack.specs')
	};

// TODO generate build/gen/reducers.js

// runs webpack with given configuration
function runWebpack(config, done) {
	webpack(config, function(err, stats) {
        if(err) {
			throw new gutil.PluginError('webpack', err);
		}

		if (stats.hasErrors()) {
			throw new gutil.PluginError('webpack', stats.toString());
		} else if (stats.hasWarnings()) {
			gutil.log("[webpack]", 'completed with warnings', stats.toString());
		}

        done();
    });
}

// builds the development version bundle
// see http://webpack.github.io/docs/configuration.html for options
gulp.task('build-dev', function(done) {
    runWebpack(webpackConfig.dev, done);
});

// builds the production version bundle
gulp.task('build-production', function(done) {
    runWebpack(webpackConfig.production, done);
});

// builds the specs bundle
gulp.task('build-specs', function(done) {
    runWebpack(webpackConfig.specs, done);
});

// builds the specs bundle
gulp.task('build', ['build-dev', 'build-production', 'build-specs']);

// run tests using Karma
gulp.task('test', ['build-specs'], function (done) {
	var server = new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);

	server.start();
});

// start development server with hot-reloading
gulp.task('dev', function() {
	new WebpackDevServer(webpack(webpackConfig.dev), {
		publicPath: webpackConfig.dev.output.publicPath,
		hot: true,
		historyApiFallback: true,
		stats: {
			colors: true
		}
	}).listen(3000, 'localhost', function (err) {
			if (err) {
				console.log(err);
			}

			console.log('Listening at localhost:3000');
		});
});


// default task when executing just "> gulp", builds the application and runs tests
gulp.task('default', ['build', 'test']);