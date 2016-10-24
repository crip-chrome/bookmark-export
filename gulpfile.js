var gulp = require('gulp');
var cripweb = require('cripweb');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./src/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

cripweb(gulp, 'settings.json')(function (crip) {
    crip.addDefault('sass');
    crip.watch('sass', 'src/sass/*.scss', 'sass');
    crip.scripts('app', [
        'Status.js',
        'Storage.js',
        'Bookmarks.js',
        'SettingsForm.js',
        '_root.js'], true);
});