'use-strict';

const gulp = require('gulp'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlbeautify = require('gulp-html-beautify'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    browsersync = require('browser-sync');

gulp.task('dev', ['sass', 'image', 'concat', 'html'], function() {
    browsersync.init({
        server: {
            baseDir: 'dist'
        }
    })
    gulp.watch('./src/sass/**/*.scss', ['sass'])
    gulp.watch('./src/images/**/*', ['imagemin'])
    gulp.watch('./src/**/*.html', ['html'])
    gulp.watch('./src/js/**/*.js', ['concat'])
    gulp.watch(['dist/css/*.css', 'dist/*.html', 'dist/js/*.js', 'dist/images/**/*']).on('change', browsersync.reload)
})

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(fileinclude('@@'))
        .pipe(htmlbeautify())
        .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function() {
    return gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('concat', function() {
    return gulp.src('./src/js/**/*')
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('image', function() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('clean', function() {
    return del('./dist/**/*')
})
