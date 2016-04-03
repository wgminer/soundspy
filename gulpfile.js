var gulp = require('gulp');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();


gulp.task('img', function() {
    return gulp.src(['./src/img/**/*'])
        .pipe(gulp.dest('./build/img'));
});

gulp.task('json', function() {
    return gulp.src(['./src/**/*.json'])
        .pipe(gulp.dest('./build'));
});

gulp.task('scss', function () {

    var plugins = [
        require('autoprefixer'),
        require('cssnano')
    ];

    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err));
            gutil.beep();
            this.emit('end');
        })
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('jade', function() {
    return gulp.src('./src/**/*.jade')
        .pipe(jade())
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err));
            gutil.beep();
            this.emit('end');
        })
        .pipe(gulp.dest('./build'));
});

gulp.task('js', function () {

    var scripts = [ 
        './libs/jquery/dist/jquery.js',
        './libs/lodash/lodash.js',
        './libs/firebase/firebase.js',
        './libs/angular/angular.js',
        './libs/angularfire/dist/angularfire.js',
        './libs/moment/moment.js',
        './libs/angular-moment/dist/angular-moment.js',
        './libs/angular-ui-router/release/angular-ui-router.js',
        './src/js/*.js'
    ];

    return gulp.src(scripts)
        // .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('js.min', function () {

    var scripts = [ 
        './libs/jquery/dist/jquery.js',
        './libs/lodash/lodash.js',
        './libs/firebase/firebase.js',
        './libs/angular/angular.js',
        './libs/angularfire/dist/angularfire.js',
        './src/js/*.js'
    ];

    return gulp.src(scripts)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(['./build/css/**/*.css', './build/js/**/*.js', './build/**/*.html'], {
        server: {
            baseDir: './build',
            routes: {
                '/libs': 'libs'
            }
        }
    });
});

gulp.task('serve', ['img', 'scss', 'jade', 'json', 'js', 'browser-sync'], function () {
    gulp.watch('scss/**/*.scss', {cwd: './src'}, ['scss']);
    gulp.watch('**/*.jade', {cwd: './src'}, ['jade']);
    gulp.watch('img/**/*', {cwd: './src'}, ['img']);
    gulp.watch(['js/**/*.js', '**/*.json'], {cwd: './src'}, ['json', 'js']);
});

