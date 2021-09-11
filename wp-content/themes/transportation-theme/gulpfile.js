const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const fs = require('fs');
const chmod = require('gulp-chmod');
const cache = require('gulp-cached');

const pathPrefix = '';

//Tasks

gulp.task('default', function () {
	console.log('Hello, Gulp!');
});

gulp.task('less', function() {
	return gulp.src(pathPrefix + 'assets/less/*.less')
			.pipe(plumber())
			.pipe(cache('less', {
				optimizeMemory: true
			}))
			.pipe(concat('styles.css'))
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(cleanCSS())
			.pipe(gulp.dest(pathPrefix + 'assets/css'));
});

gulp.task('js', function() {
	return gulp.src(pathPrefix + 'assets/js-raw/*.js')
			.pipe(plumber())
			.pipe(cache('scripts', {
				optimizeMemory: true
			}))
			.pipe(concat('scripts.js'))
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(uglify())
			.pipe(chmod(0664))
			.pipe(gulp.dest(pathPrefix + 'assets/js'));
});

gulp.task('separately-js', function() {
	return gulp.src(pathPrefix + 'assets/js-raw/separately/*.js')
			.pipe(plumber())
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(uglify())
			.pipe(chmod(0664))
			.pipe(gulp.dest(pathPrefix + 'assets/js'));
});

gulp.task('separately-less', function() {
	return gulp.src(pathPrefix + 'assets/less/separately/*.less')
			.pipe(plumber())
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(cleanCSS())
			.pipe(gulp.dest(pathPrefix + 'assets/css'));
});

gulp.task('blocks-js', function() {
	let blocks = getJsBlocks(pathPrefix + 'assets/js-raw'),
			blocksLength = blocks.length;
	
	for (let i = 0; i < blocksLength; i++) {
		const block = blocks[i],
					blockName = block.match(/^block-(.+)$/)[1];
		
		gulp.src(pathPrefix + 'assets/js-raw/' + block + '/*.js')
				.pipe(plumber())
				.pipe(concat(blockName + '.js'))
				.pipe(babel({
					presets: ['@babel/env']
				}))
				.pipe(uglify())
				// .pipe(chmod(0664))
				.pipe(gulp.dest(pathPrefix + 'assets/js'));
	}
});

gulp.task('blocks-less', function() {
	let blocks = getLessBlocks(pathPrefix + 'assets/less'),
			blocksLength = blocks.length;
	
	for (let i = 0; i < blocksLength; i++) {
		const block = blocks[i],
					blockName = block.match(/^block-(.+)$/)[1];
					
		gulp.src(pathPrefix + 'assets/less/' + block + '/*.less')
				.pipe(plumber())
				.pipe(concat(blockName + '.css'))
				.pipe(less())
				.pipe(autoprefixer())
				.pipe(cleanCSS())
				.pipe(gulp.dest(pathPrefix + 'assets/css'));
	}
});

function getJsBlocks(path) {
	let filesAndDirs = fs.readdirSync(path),
			dirs = filesAndDirs.filter(value => {
				return value.search(/\.js$/) == -1;
			}),
			blocks = dirs.filter(value => {
				return value.search(/^block-/) != -1;
			});
	return blocks;
}

function getLessBlocks(path) {
	let filesAndDirs = fs.readdirSync(path),
			dirs = filesAndDirs.filter(value => {
				return value.search(/\.less$/) == -1;
			}),
			blocks = dirs.filter(value => {
				return value.search(/^block-/) != -1;
			});
	return blocks;
}

// Watch

gulp.task('watch', function() {
	gulp.parallel(
		'js',
		'less'
	)();

	gulp.watch(pathPrefix + 'assets/js-raw/*.js').on('change', gulp.series('js'));
	gulp.watch(pathPrefix + 'assets/less/*.less').on('change', gulp.series('less'));

	gulp.watch(pathPrefix + 'assets/js-raw/separately/*.js').on('change', gulp.series('separately-js'));

	let jsBlocks = getJsBlocks(pathPrefix + 'assets/js-raw'),
			lessBlocks = getLessBlocks(pathPrefix + 'assets/less');

	jsBlocks.forEach(block => {
		gulp.watch(pathPrefix + 'assets/js-raw/' + block + '/*.js').on('change', gulp.series('blocks-js'));
	});
	lessBlocks.forEach(block => {
		gulp.watch(pathPrefix + 'assets/less/' + block + '/*.less').on('change', gulp.series('blocks-less'));
	});

	gulp.watch(pathPrefix + 'assets/less/separately/*.less').on('change', gulp.series('separately-less'));
});