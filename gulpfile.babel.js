import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import eslint from 'gulp-eslint';
import webserver from 'gulp-webserver';
import webpack from 'webpack';
import notifier from 'node-notifier';
import WebpackDevServer from 'webpack-dev-server';
import { Server as KarmaServer } from 'karma';

// load the webpack configurations for different environments and targets
let webpackConfig = {
	dev: require('./config/webpack.dev'),
	production: require('./config/webpack.production'),
	specs: require('./config/webpack.specs')
};

// list of source file patterns to watch
const sources = [
	'gulpfile.js',
	'app.js',
	'karma.conf.js',
	'config/**/*.js',
	'src/**/*.js',
	'services/**/*.js',
	'specs/**/*.js',
	'reducers/**/*.js',
	'views/**/*.js',
	'gfx/**/*.*',
	'build/gen/**/*.js'
];

// display desktop notifications
let notify = {

	// notify of user bug detected
	bug: function(title, description) {
		notifier.notify({
			title: title,
			message: description,
			sound: true,
			icon: path.join(__dirname, 'assets', 'icons', 'notification-bug.png')
		});
	},

	error: function(title, description) {
		notifier.notify({
			title: title,
			message: description,
			sound: true,
			icon: path.join(__dirname, 'assets', 'icons', 'notification-error.png')
		});
	}
};

function handleWebpackResult(err, stats, done) {
	if (err) {
		notify.error(
			'Webpack error occured',
			'See the console for details'
		);
	} else if (stats.hasErrors()) {
		notify.error(
			'Webpack failed to build the application',
			'See the console for details'
		);

		throw new gutil.PluginError('webpack', stats.toString());
	} else if (stats.hasWarnings()) {
		notify.bug(
			'Webpack completed with warnings',
			'See the console for details'
		);

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

	if (typeof done === 'function') {
		done();
	}
}

// runs webpack with given configuration
function runWebpack(config, done) {
	webpack(config, function(err, stats) {
		handleWebpackResult(err, stats, done);
	});
}

// lints the application sources
gulp.task('lint', function() {

	return gulp.src([
		'app.js',
		'actions/**/*.js',
		'config/**/*.js',
		'constants/**/*.js',
		'reducers/**/*.js',
		'services/**/*.js',
		'specs/**/*.js',
		'views/**/*.js',
		'gulpfile.babel.js'
	])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError())
		.on('error', function(e) {
			let basePath = path.resolve(__dirname),
				filename = e.fileName.substr(basePath.length + 1);

			notify.bug(
				'Lint error: ' + e.message,
				filename + ': ' + e.lineNumber
			);
		});
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
// TODO run production server once dev server is running
gulp.task('dev', function() {
	new WebpackDevServer(webpack(webpackConfig.dev, handleWebpackResult), {
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

			// gulp.run('production');
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