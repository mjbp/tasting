var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pixrem = require('gulp-pixrem');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var ghPages = require('gulp-gh-pages');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 20',
  'chrome >= 4',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var srcFiles = {
	css : './src/scss/',
	js : './src/js/'
};

var dest = {
	css: './build/css/',
	js: './build/js/'
};

//SASS -> autoprefix -> rem to px -> CSS
gulp.task('sass', function () {
    gulp.src(srcFiles.css + '**/*.scss')
        .pipe(sass())
    	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    	.pipe(pixrem())
        .pipe(gulp.dest(dest.css));
});
gulp.task('css', ['sass']);

gulp.task('js', function () {
	 gulp.src(srcFiles.js + 'app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(gulp.dest(dest.js));
});

//minify
gulp.task('compress:js', function() {
	gulp.src(dest.js + 'app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest(dest.js));
});

gulp.task('compress:css', function() {
	gulp.src(dest.css + 'styles.css')
		.pipe(csso())
        .pipe(rename('styles.min.css'))
		.pipe(gulp.dest(dest.css));
});
gulp.task('compress', ['compress:css', 'compress:js']);

// Build Production Files, the Default Task
gulp.task('default', ['css', 'js', 'compress']);

gulp.task('watch', function () {
    gulp.watch(srcFiles.js + '**/*.js', ['js', 'compress:js']);
  	gulp.watch(srcFiles.css + '**/*.scss', ['css', 'compress:css']);
});

gulp.task('deploy', function () {
    return gulp.src('build/**/*')
        .pipe(ghPages(deployOptions));
});
