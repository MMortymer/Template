const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass');

const config = {
    src: 'project',
    css: {
        watch: '/sass/**/*.sass',
        src: '/sass/style.sass',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    }
};
 
 gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
			.pipe(sass().on('error', sass.logError))
            .pipe(gcmq())
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.src + config.css.dest))
			.pipe(browserSync.reload({
                stream: true
            }));
});
 
gulp.task('watch', ['browserSync'], function () {
	gulp.watch(config.src + config.css.watch, ['build']);
	gulp.watch(config.src + config.html.src, browserSync.reload);
});

gulp.task('minify-css', () => {
  return gulp.src('project/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('project/css/minimize'));
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});