let gulp = require('gulp'),
	gutil = require('gulp-util'),
	KarmaServer = require('karma').Server,
	WebpackDevServer = require('webpack-dev-server'),
	eslint = require('gulp-eslint'),
	webserver = require('gulp-webserver'),
	webpack = require('webpack'),
	webpackConfig = {
		dev: require('./config/webpack.dev'),
		production: require('./config/webpack.production'),
		specs: require('./config/webpack.specs')
	};

// TODO generate build/gen/reducers.js

// list of source file patterns to watch
const sources = [
	'gulpfile.js',
	'app.js',
	'karma.conf.js',
	'config/**/*.js',
	'services/**/*.js',
	'specs/**/*.js',
	'reducers/**/*.js',
	'views/**/*.js',
	'gfx/**/*.*',
	'build/gen/**/*.js'
];

// runs webpack with given configuration
function runWebpack(config, done) {
	webpack(config, function(err, stats) {
		if (err) {
			throw new gutil.PluginError('webpack', err);
		}

		if (stats.hasErrors()) {
			throw new gutil.PluginError('webpack', stats.toString());
		} else if (stats.hasWarnings()) {
			gutil.log('[webpack]', 'completed with warnings', stats.toString());
		} else {
			gutil.log('[webpack]', stats.toString({
				assets: true,
				colors: true,
				version: true,
				modules: false,
				hash: false,
				timings: false,
				chunks: true,
				chunkModules: false,
				reasons: true,
				cached: true,
				chunkOrigins: true
			}));
		}

		done();
	});
}

// lints the application sources
gulp.task('lint', function() {

	return gulp.src([
		'actions/**/*.js',
		// 'config/**/*.js', // not ES6
		'constants/**/*.js',
		'reducers/**/*.js',
		'services/**/*.js',
		'specs/**/*.js',
		'views/**/*.js',
		'gulpfile.babel.js'
	])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});

gulp.task('lint-watch', ['lint'], function() {
	gulp.watch(sources, ['lint']);
});

// builds the production version bundle
gulp.task('build', function(done) {
	// copy gfx files
	gulp.src(['gfx/**/*']).pipe(gulp.dest('build/production/gfx'));

	runWebpack(webpackConfig.production, done);
});

// builds the development version bundle
// see http://webpack.github.io/docs/configuration.html for options
gulp.task('build-dev', function(done) {
	// copy gfx files
	gulp.src(['gfx/**/*']).pipe(gulp.dest('build/dev/gfx'));

	runWebpack(webpackConfig.dev, done);
});

// builds the specs bundle
gulp.task('build-specs', function(done) {
	runWebpack(webpackConfig.specs, done);
});

// run tests using Karma
gulp.task('test', ['build-specs'], function(done) {
	let server = new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);

	server.start();
});

// start development server with hot-reloading
gulp.task('dev', ['production'], function() {
	new WebpackDevServer(webpack(webpackConfig.dev), {
		publicPath: webpackConfig.dev.output.publicPath,
		hot: true,
		historyApiFallback: true,
		quiet: false,
		noInfo: false,
		stats: {
			assets: false,
			colors: true,
			version: false,
			hash: false,
			timings: false,
			chunks: false,
			chunkModules: false
		}
	}).listen(3000, 'localhost', function(err) {
			if (err) {
				throw err;
			}

			console.log('dev server started on localhost:3000'); // eslint-disable-line no-console

			gulp.watch(sources, ['lint']);
		});
});

// start the production server with file changes watcher
gulp.task('production', ['build'], function() {
	gulp.src('build/production')
		.pipe(webserver({
			host: 'localhost',
			port: 3001,
			fallback: 'index.html'
		}));

	gulp.watch(sources, ['build']);
});

// default task when executing just "> gulp", lints the application and runs tests
gulp.task('default', ['lint', 'test']);