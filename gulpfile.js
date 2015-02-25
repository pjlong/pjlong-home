var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  css: {
    src: './ngMain/static/css/src/',
    dist: './ngMain/static/css/dist/',
    libs:'./ngMain/static/css/libs/'
  },
  js: {
    src: 'ngMain/static/js/src/',
    dist: 'ngMain/static/js/dist/',
    libs: 'ngMain/static/js/libs/'
  }
};

gulp.task('sass', function () {
  return gulp.src(paths.css.src+'**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.css.dist));
});


gulp.task('js', function () {
  return gulp.src(paths.js.src+'**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('pjlong.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.js.dist));
});


gulp.task('watch', function () {
  gulp.watch(paths.css.src+'**/*.scss', ['sass']);
  gulp.watch(paths.js.src+'**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js']);