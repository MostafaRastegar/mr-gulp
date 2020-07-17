const gulp = require("gulp"),
  sass = require("gulp-sass"),
  rename = require("gulp-rename"),
  cssmin = require("gulp-cssnano"),
  pug = require("gulp-pug"),
  sourcemaps = require("gulp-sourcemaps"),
  connect = require("gulp-connect");
concat = require("gulp-concat");

const pugSources = "./src/components/**/*.pug";
const sassSources = "./src/components/**/*.scss";
const jsSources = "./src/scripts/**/*.js";

const swallowError = (error) => {
  console.log(error.toString());
  this.emit("end");
};

gulp.task("stylesKit", () => {
  gulp
    .src("./src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compact" }))
    .on("error", swallowError)
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(cssmin())
    .pipe(sourcemaps.write("./maps"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(connect.reload());
});

gulp.task("stylesComponent", () => {
  gulp
    .src("./src/components/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compact" }))
    .on("error", swallowError)
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(cssmin())
    .pipe(sourcemaps.write("./maps"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./public/assets/css/"))
    .pipe(connect.reload());
});

gulp.task("pug", function buildHTML() {
  return gulp
    .src("./src/containers/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .on("error", swallowError)
    .pipe(gulp.dest("./public"))
    .pipe(connect.reload());
});

gulp.task("connect", () => {
  connect.server({
    root: "./public/",
    livereload: true,
    port: 8080,
  });
});

gulp.task("watch", () => {
  gulp.watch("./src/scss/**/*.scss", ["stylesKit"]);
  gulp.watch("./src/components/**/*.scss", ["stylesComponent"]);
  gulp.watch("./src/**/*.pug", ["pug"]);
});

gulp.task("start", ["stylesKit", "stylesComponent", "pug", "connect", "watch"]);

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
