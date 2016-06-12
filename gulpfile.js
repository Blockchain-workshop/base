const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const argv = require('yargs').argv;
const connect = require('gulp-connect');

const environment = argv.e || 'development';
const folder = './environments/' + environment;
const outFolder = folder + '/build';

gulp.task('serve', function() {
    connect.server({
        root: outFolder,
        host: "0.0.0.0",
        port: 8080
    });
});

gulp.task('css', function() {
    return gulp.src('./app/stylesheets/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(outFolder));
});

gulp.task('html', function() {
    return gulp.src('./app/**/*.html')
        .pipe(gulp.dest(outFolder));
});

gulp.task('bundle', function() {
    return browserify('./app/javascripts/app.js', { paths: [folder] })
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .on('error', function(error) {
            console.log(error.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(outFolder));
});

gulp.task('build', ['bundle', 'css', 'html']);
gulp.task('default', ['build']);
