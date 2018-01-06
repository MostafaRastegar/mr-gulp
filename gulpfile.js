const	gulp        = require('gulp'),
		babel 		= require('gulp-babel'),
		sass 		= require('gulp-sass'),
		pug 		= require('gulp-pug'),
		sourcemaps  = require('gulp-sourcemaps'),
		connect		= require('gulp-connect'),
		minifyCSS	= require('gulp-minify-css'),
		uglify 		= require('gulp-uglify'),
		gutil 		= require('gulp-util');


let 	pugSources,sassSources,jsSources;

pugSources = './pug/*.pug';
sassSources = './scss/*.scss';
jsSources = './scripts/**/*.js';

gulp.task('sass', () => {
	gulp.src('./scss/kit.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', gutil.log)
		.pipe(minifyCSS())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./html/assets/css/'))
		.pipe(connect.reload())

});

gulp.task('js',() => {
	gulp.src([jsSources])
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.on('error', gutil.log)
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./html/assets/js/'))
		.pipe(connect.reload())
})


gulp.task('pug', function buildHTML() {
	return gulp.src(pugSources)
	.pipe(pug({
	  // Your options in here.
	}))
	.on('error', gutil.log)
	.pipe(gulp.dest('././html'))
	.pipe(connect.reload())
});


gulp.task('connect',() =>{
	connect.server({
		root:	'./html/',
		livereload:	true
	});
})

gulp.task('watch',() =>{
	gulp.watch('./scss/**/*.scss', ['sass']);
	gulp.watch('./pug/**/*.pug', ['pug']);
	gulp.watch(jsSources, ['js']);
})

gulp.task('local', ['sass','pug','js','watch','connect']);
