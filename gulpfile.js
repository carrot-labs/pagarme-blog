/**
 * Gulp dependencies
 */
var browser    = require('browser-sync');
var gulp       = require('gulp');
var jeet       = require('jeet');
var kouto      = require('kouto-swiss');
var livereload = require('gulp-livereload');
var plumber    = require('gulp-plumber');
var rename     = require('gulp-rename');
var rupture    = require('rupture');
var sourcemaps = require('gulp-sourcemaps');
var stylus     = require('gulp-stylus');

/**
 * Reload task
 *
 * Reload the static server
 */
gulp.task('reload', function() {
  browser.reload();
});

/**
 * Server task
 *
 * Create a static server with livereload support
 */
gulp.task('server', function() {
  browser({
    server: {
      baseDir: './www/'
    },
    port: 4000
  });
});

/**
 * Stylus task
 *
 * Convert stylus files into css with sourcemaps support
 */
gulp.task('stylus', function() {
  return gulp
    .src('./www/styl/main.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      use: [jeet(), kouto(), rupture()]
    }))
    .pipe(sourcemaps.write())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./www/css'))
    .pipe(browser.reload({stream: true}));
});

/**
 * Watch task
 *
 * Watch for changes and reapply tasks
 */
gulp.task('watch', function() {
  gulp.watch('./www/styl/**/*.styl', ['stylus']);
  gulp.watch('./www/**.html', ['reload']);
});

/**
 * Default task
 */
gulp.task('default', ['server', 'stylus', 'watch']);
