var gulp        = require('gulp'),
	sass 		= require('gulp-sass'),
	pug 		= require('gulp-pug'),
	sourcemaps  = require('gulp-sourcemaps'),
	connect		= require('gulp-connect'),
	minifyCSS	= require('gulp-minify-css'),
	uglify 		= require('gulp-uglify'),
	gutil 		= require('gulp-util');


var pugSources,sassSources,jsSources;

pugSources = './pug/**/*.pug';
sassSources = './scss/**/*.scss';
jsSources = './scripts/**/*.js';

gulp.task('sass', function() {
	gulp.src('./scss/kit.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', gutil.log)
		.pipe(minifyCSS())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./html/assets/css/'))
		.pipe(connect.reload())

});

gulp.task('js',function(){
	gulp.src([jsSources])
		.pipe(sourcemaps.init())
		.on('error', gutil.log)
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./html/assets/js/'))
		.pipe(connect.reload())
})


gulp.task('pug', function buildHTML() {
	return gulp.src(pugSources)
	// .pipe(pug({
	//   // Your options in here.
	// }))
	.on('error', gutil.log)
	.pipe(gulp.dest('././html'))
	.pipe(connect.reload())
});


gulp.task('connect',function(){
	connect.server({
		root:	'./html/',
		livereload:	true
	});
})

gulp.task('watch',function(){
	gulp.watch(sassSources, ['sass']);
	gulp.watch(pugSources, ['pug']);
	gulp.watch(jsSources, ['js']);
})

gulp.task('local', ['sass','pug','js','connect','watch']);
