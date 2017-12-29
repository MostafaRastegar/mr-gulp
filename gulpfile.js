var gulp        = require('gulp');
	browserSync = require('browser-sync').create();
	reload      = browserSync.reload;
	sass 		= require('gulp-sass');
	jade 		= require('gulp-jade');
	csso 		= require('gulp-csso');
	sourcemaps  = require('gulp-sourcemaps');
	uncss = require('gulp-uncss');
gulp.task('unuse', function () {
    return gulp.src('html/assets/css/kit.css')
        .pipe(uncss({
            html: ['index.html', 'posts/**/*.html', 'http://example.com']
        }))
        .pipe(gulp.dest('./out'));
});
gulp.task('sass', function() {
	gulp.src('./scss/kit.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./html/assets/css/'))
		.pipe(browserSync.stream());
});
gulp.task('jade', function() {
	var YOUR_LOCALS = {};
	gulp.src('./jade/**/*.jade')
	// gulp.src('./jade/includes/test/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS,
			pretty: true
		}))
		.pipe(gulp.dest('././html'))
		.pipe(browserSync.stream());
});
gulp.task('min', function () {
    return gulp.src('./html/assets/css/kit.css')
        .pipe(csso())
        .pipe(gulp.dest('./html/assets/css/'));
});
gulp.task('serve', ['sass','jade'], function() {
    browserSync.init({
        server: "./html"
    });
	gulp.watch('./scss/**/*.scss', ['sass'] , reload);
	gulp.watch('./jade/**/*.jade', ['jade'] , reload );
});

gulp.task('local', ['serve']);
