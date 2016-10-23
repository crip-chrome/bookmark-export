var gulp = require('gulp');
var cripweb = require('cripweb');
var cripwebWebpack = require('cripweb-webpack');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./src/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
});

var webpack_config = {
    entry: './src/typings/index.ts',
    output: {
        filename: 'app.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};

cripweb(gulp, 'settings.json')(function (crip) {
    crip.addDefault('sass');

    // define external crip plugin for webpack
    crip.define('webpack', cripwebWebpack);

    // now you have available webpack configuration
    crip.config.set('webpack', {
        output: '',
        config: webpack_config
    });

    // now we can define our webpack configuration
    crip.webpack('typescripts', 'src/typings/*.ts');
    crip.watch('sass', 'src/sass/*.scss', 'sass');
});