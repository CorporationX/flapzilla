'use strict';

var gulp = require('gulp');

var gulpPlugins = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var locations = {
    src: {
        scripts: ['app/**/*.js', 'app/*.js'],
        styles: 'app/styles/index.less',
        css: ['app/styles/*.less']
    },
    dest: {
        scripts: 'build/scripts',
        styles: 'build/styles'
    }
};

gulp.task('scripts', function () {

    return gulp.src(locations.src.scripts)
        .pipe(gulpPlugins.jshint())
        .pipe(gulpPlugins.jshint.reporter(stylish))
        .pipe(gulpPlugins.concat('index.js'))
        .pipe(gulp.dest(locations.dest.scripts));

});

gulp.task('styles', function () {

    return gulp.src(locations.src.styles)
        .pipe(gulpPlugins.less())
        .pipe(gulp.dest(locations.dest.styles));

});

gulp.task('clean', function () {

    return gulp.src('build/**/*.{js, css}', {
            read: false
        })
        .pipe(gulpPlugins.rimraf());

});

gulp.task('watch', function () {
    gulp.watch([locations.src.scripts, locations.src.css], {
        maxListeners: 99
    }, ['clean-build']);
});

gulp.task('build', ['scripts', 'styles'], function () {

});

gulp.task('clean-build', ['clean'], function () {
    gulp.start('build');
});

gulp.task('default', ['clean-build', 'watch']);