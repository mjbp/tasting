var gulp        = require('gulp');
var shell       = require('gulp-shell');

gulp.task('deploy', shell.task([
  // 'git subtree push --prefix build origin gh-pages'
  'git push origin `git subtree split --prefix build master`:gh-pages --force'
]));

// Note: Line 6 is commented out because that line of code is needed if for some reason you need to force push. In optimal circumstances, you'd want to use the code on line 5.