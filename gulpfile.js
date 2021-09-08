const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
// const del = require("del");

const sync = require("browser-sync").create();

/********     Минификация CSS    *********/

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    // .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;


/*********      Минификация HTML      *********/

const min_html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
}

exports.min_html = min_html;


/*********       Минификация JS        *********/

const min_js = () => {
  return gulp.src("source/js/app.js")
    .pipe(terser())
    // .pipe(rename("app.min.js"))
    .pipe(gulp.dest("build/js"))
}

exports.min_js = min_js;


/*********     Оптимизация Images     *********/

const opt_img = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}", { base: "source" })
    .pipe(squoosh())
    .pipe(gulp.dest("build"))
}

exports.opt_img = opt_img;

/*********  Копирование fonts и favicons  *********/

const copy_fonts_and_favicons = () => {
  return gulp.src(["source/fonts/*.{woff,woff2}", "source/*.svg"], { base: "source" })
    .pipe(gulp.dest("build"))
}

exports.copy_fonts_and_favicons = copy_fonts_and_favicons;








// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build' // source
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles,
  min_html,
  min_js,
  opt_img,
  copy_fonts_and_favicons,

  server,
  watcher
);
