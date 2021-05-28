const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	imagemin = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	rigger = require('gulp-rigger');

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'dist',
		},
		notify: false,
	});
});

gulp.task('html', function () {
	return gulp
		.src('app/**/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('sass', function () {
	return (
		gulp
			.src(['app/sass/**/*.sass'])
			.pipe(rigger())
			.pipe(sass({ outputStyle: 'expand' }).on('error', notify.onError()))
			.pipe(rename({ suffix: '.min', prefix: '' }))
			.pipe(autoprefixer(['last 15 versions']))
			.pipe(cleanCSS())
			// .pipe(gulp.dest('app/css'))
			.pipe(gulp.dest('dist/css'))
			.pipe(browserSync.reload({ stream: true }))
	);
});

gulp.task('js', function () {
	return (
		gulp
			.src('app/js/common.js')
			.pipe(rigger())
			.pipe(concat('scripts.min.js'))
			// .pipe(uglify())
			// .pipe(gulp.dest('app/js/'))
			.pipe(gulp.dest('dist/js/'))
			.pipe(browserSync.reload({ stream: true }))
	);
});

gulp.task('imagemin', function () {
	return gulp
		.src('app/img/**/*')
		.pipe(cache(imagemin()))
		.pipe(changed('dist/img'))
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/**/*.html', gulp.parallel('html'));
});

gulp.task('removedist', function () {
	return del.sync('dist');
});

gulp.task('clearcache', function () {
	return cache.clearAll();
});

gulp.task('default', gulp.parallel('watch', 'html', 'sass', 'js', 'browser-sync'));
gulp.task('build', gulp.parallel('html', 'removedist', 'imagemin', 'sass', 'js'));
