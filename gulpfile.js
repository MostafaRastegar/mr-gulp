const gulp = require("gulp"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");

const pugSources = "./src/components/**/*.pug";
const sassSources = "./src/components/**/*.scss";
const jsSources = "./src/scripts/**/*.js";

gulp.task("sass", () => {
  gulp
    .src("./src/scss/kit.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(connect.reload());
});

// gulp.task("js", () => {
//   gulp
//     .src([jsSources])
//     .pipe(sourcemaps.init())
//     .pipe(
//       babel({
//         presets: ["es2015"],
//       })
//     )
//     .on("error", gutil.log)
//     .pipe(uglify())
//     .pipe(sourcemaps.write("./maps"))
//     .pipe(gulp.dest("./html/assets/js/"))
//     .pipe(connect.reload());
// });

gulp.task("pug", function buildHTML() {
  return gulp
    .src(pugSources)
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(gulp.dest("./public/"))
    .pipe(connect.reload());
});

gulp.task("connect", () => {
  connect.server({
    root: "./public/",
    livereload: true,
  });
});

gulp.task("watch", () => {
  gulp.watch("./src/scss/**/*.scss", ["sass"]);
  gulp.watch(sassSources, ["sass"]);
  gulp.watch("./src/**/*.pug", ["pug"]);
  // gulp.watch(jsSources, ["js"]);
});

gulp.task("start", ["sass", "pug", "connect", "watch"]);
