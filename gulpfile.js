const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', ['sass'], function() {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
})


// JavaScript
gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});

gulp.task('js:watch', ['js'], function() {
  gulp.watch('src/js/**/*.js', ['js']);
});


// BrowserSync
gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      // TODO: make this a dynamic environment variable
      proxy: 'localhost:3000'
    }
  });
});

// Watch
gulp.task('watch', ['sass:watch', 'js:watch']);

// Build
gulp.task('build', ['sass', 'js']);

//////////////////////////////
// Default
//////////////////////////////
gulp.task('default', ['serve', 'watch']);