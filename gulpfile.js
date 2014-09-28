var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');

var paths = {
  home: './',
  less: './static/less/*.less',
  css: './static/css/'
};

gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(autoprefixer({
      browers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.css));
});


gulp.task('watch', function () {
  gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['less', 'prefix']);