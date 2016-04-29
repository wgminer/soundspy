var gulp = require('gulp');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');
require('require-dir')('./gulp');

gulp.task('dev', function (cb) {
    runSequence(['build-site', 'build-extension'], 'serve-site', ['watch-site', 'watch-extension'], cb);
});

gulp.task('deploy', function (cb) {
    runSequence(['build-site', 'build-extension'], 'serve-site', 'watch', cb);
});