const { src, dest, watch, series, parallel } = require('gulp'),
  browserSync = require('browser-sync').create(),
  del = require('gulp-clean'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  rigger = require('gulp-rigger'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  purge = require('gulp-css-purge'),
  minifyCss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify-es').default,
  babel = require('gulp-babel'),
  jsValidate = require('gulp-jsvalidate');

sass.compiler = require('node-sass');


function clean() {
  return src('app/build/**/*', { read: false })
  .pipe(del());
}

function html() {
  return src('app/src/*.html')
    .pipe(rigger())
    .pipe(dest('app/build'))
    .pipe(browserSync.stream());
}

function css() {
  return src('app/src/scss/style.scss')
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(purge())
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(dest('app/build/css'))
    .pipe(browserSync.stream());
}

function javascript() {
  return src('app/src/js/**/*.js')
    .pipe(jsValidate())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('app/build/js'))
    .pipe(browserSync.stream());
}

// function images() {
//   return src('app/assets/img/**/*')
//     .pipe(cache(imagemin({
//       interlaced: true,
//       progressive: true,
//       svgoPlugins: [{ removeViewBox: false }]
//     })))
//     .pipe(dest('app/assets/comp/img'));
// }

exports.default = function () {
  browserSync.init({
    server: { baseDir: "app/src" }
  });
  watch(['app/src/html/*.html', 'app/src/scss/**/*.scss', 'app/src/js/**/*.js'], series(
    clean,
    // images, 
    parallel(html, css, javascript)))
    .on('change', browserSync.reload);
};