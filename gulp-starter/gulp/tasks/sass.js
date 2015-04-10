var gulp         = require('gulp');
var sass         = require('gulp-sass');
var neat         = require('node-neat').includePaths;
var handleErrors = require('../util/handleErrors');
var config       = require('../config').sass;
var minifyCSS    = require('gulp-minify-css');

gulp.task('sass', function () {
  gulp.src(config.src)
    .pipe(sass({
      includePaths: ['sass'].concat(neat)
    }))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('./build'))
    .on('error', handleErrors);
});
