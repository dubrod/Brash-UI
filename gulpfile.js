var gulp = require('gulp');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  scripts: ['./js/*.js'],
  styles: ['./scss/*.scss']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('brash-ui.min.js'))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('sass', function () {
  return gulp.src(paths.styles)
    .pipe(sassdoc())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['sass']);
});

gulp.task('default', ['watch']);
