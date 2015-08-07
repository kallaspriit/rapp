var gulp = require('gulp'),
	gutil = require('gulp-util'),
	KarmaServer = require('karma').Server,
	WebpackDevServer = require('webpack-dev-server'),
	fs = require('fs'),
	postcss = require('gulp-postcss'),
	webpack = require('webpack'),
	webpackConfig = {
		dev: require('./config/webpack.dev'),
		specs: require('./config/webpack.specs')
	};

// TODO generate build/gen/reducers.js

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

gulp.task('css-dev', function() {
	return gulp.src('gfx/**/*.css')
        .pipe(postcss([
			require('cssnext')(),
			require('cssnano')()
		]))
        .pipe(gulp.dest('build/dev'));
});

// rebuilds the dev project
gulp.task('build-dev', ['webpack-dev', 'css-dev']);

// rebuilds the production project
// TODO implement production config
gulp.task('build-production', ['webpack-production', 'css-production']);

// run tests using Karma
gulp.task('test', ['webpack-specs'], function (done) {
	var server = new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);

	server.start();
});

// watches for file changes and rebuilds as needed without server
gulp.task('watch', ['build'], function() {
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


// default task when executing just "> gulp"
gulp.task('default', ['build']);