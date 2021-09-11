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
const del = require("del");

const sync = require("browser-sync").create();


/*************************** DEFAULT **************************/

// Task Styles
const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

// Run Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.server = server;

// Watchers
const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

// Commands
exports.default = gulp.series(
  styles, server, watcher
);




/****************************** MY_CODE ******************************/


// Минификация CSS
const min_styles = () => {
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
exports.min_styles = min_styles;


// Минификация HTML
const min_html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
}
exports.min_html = min_html;


// Минификация JS
const min_js = () => {
  return gulp.src("source/js/app.js")
    .pipe(terser())
    // .pipe(rename("app.min.js"))
    .pipe(gulp.dest("build/js"))
}
exports.min_js = min_js;


// Оптимизация Images (папка img)
const opt_img = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}", { base: "source" })
    .pipe(squoosh())
    .pipe(gulp.dest("build"))
}
exports.opt_img = opt_img;


// Копирование Images (папка img)
const copy_img = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}", { base: "source" })
    .pipe(gulp.dest("build"))
}
exports.copy_img = copy_img;

//  Копирование fonts и favicons
const copy_fonts_and_favicons = () => {
  return gulp.src(["source/fonts/*.{woff,woff2}", "source/*.svg"], { base: "source" })
    .pipe(gulp.dest("build"))
}
exports.copy_fonts_and_favicons = copy_fonts_and_favicons;

//  Create WebP
const create_webp = () => {
  return gulp.src("source/img/**/*.{jpg,png}", { base: "source" })
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build"))
}
exports.create_webp = create_webp;

//  Create Sprite
const create_sprite = () => {
  return gulp.src("source/img/logos/**/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_logos.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.create_sprite = create_sprite;

//  Очистка build перед копированием
const clean = () => {
  return del("build")
}
exports.clean = clean;



// Run My Server
const run_my_server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}
exports.run_my_server = run_my_server;


// Set Watchers


/* Create Build */

// с оптимизацией изображений
exports.create_build_for_mentor = gulp.series(
  clean,
  copy_fonts_and_favicons,
  opt_img,
  gulp.parallel(
    min_styles,
    min_html,
    min_js,
    create_webp,
    create_sprite,
  ),

);

exports.create_build_for_mentor_and_run_server = gulp.series(
  clean,
  copy_fonts_and_favicons,
  opt_img,
  gulp.parallel(
    min_styles,
    min_html,
    min_js,
    create_webp,
    create_sprite,
  ),
  run_my_server,

);

// без оптимизации изображений + запуск сервера
exports.create_build_for_me = gulp.series(
  clean,
  copy_fonts_and_favicons,
  copy_img,
  gulp.parallel(
    min_styles,
    min_html,
    min_js,
    create_webp,
    create_sprite,
  ),
  run_my_server,
);



