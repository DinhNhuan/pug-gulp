const gulp = require('gulp');

//PUG - HTML
const pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
    return gulp.src('./src/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./src'))
});




// SCSS -> CSS

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

gulp.task('sass', () => {
    return gulp.src('./src/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/assets/css'));
})


// Browser Sync
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('serve', () => {
    var files = [
        './src/**/*.html',
        './src/**/*.pug',
        './src/assets/css/**/*.scss',
        './src/assets/css/**/*.less',
        './src/assets/js/**/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: './src'
        }
    });

    // gulp.watch(['./src/**/*.html'], reload);
    gulp.watch(['./src/**/*.pug'], gulp.series('pug'), reload);
    gulp.watch(['./src/assets/css/**/*.scss'], gulp.series('sass'), reload);
    // gulp.watch(['./src/assets/css/**/*.less'], gulp.series('less'), reload);
    gulp.watch(['./src/assets/js/**/*.js'], reload);
});


// GULP METHOD
gulp.task('dev', gulp.series('serve'));
// gulp.task('build', gulp.series('html'));