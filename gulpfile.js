/**
 * Gulp dependencies
 */
var browser    = require('browser-sync');
var concat     = require('gulp-concat');
var ghPages    = require('gulp-gh-pages');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var jeet       = require('jeet');
var kouto      = require('kouto-swiss');
var plumber    = require('gulp-plumber');
var rename     = require('gulp-rename');
var rupture    = require('rupture');
var sourcemaps = require('gulp-sourcemaps');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');

/**
 * Deploy task
 *
 * Deploy the site to github pages
 */
gulp.task('deploy', function() {
  return gulp
    .src("./public/**/*")
    .pipe(ghPages());
});

/**
 * Imagemin task
 *
 * Minify and optimize images
 */
gulp.task('imagemin', function() {
  return gulp
    .src('front/img/**/*')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('public/assets/img'))
    .pipe(browser.reload({stream: true}));
});

/**
 * Reload task
 *
 * Reload the static server
 */
gulp.task('reload', function() {
  browser.reload();
});

/**
 * Scripts task
 *
 * Concat and minify all javascript code
 */
gulp.task('scripts', function() {
  var files = [
    'front/js/vendor/**/*.js',
    'front/js/lib/**/*.js',
    'front/js/home.js'
  ];

  return gulp
    .src(files)
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browser.reload({stream: true}));
});

/**
 * Server task
 *
 * Create a static server with livereload support
 */
gulp.task('server', function() {
  browser({
    server: {
      baseDir: './public/'
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
    .src('./front/styl/main.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true,
      use: [jeet(), kouto(), rupture()]
    }))
    .pipe(sourcemaps.write())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./public/assets/css'))
    .pipe(browser.reload({stream: true}));
});

/**
 * Watch task
 *
 * Watch for changes and reapply tasks
 */
gulp.task('watch', function() {
  gulp.watch('./front/styl/**/*.styl', ['stylus']);
  gulp.watch('./front/js/**/*.js', ['scripts']);
  gulp.watch('./front/img/**/*', ['imagemin']);
  gulp.watch('./public/**.html', ['reload']);
});

/**
 * Default task
 */
gulp.task('default', ['server', 'imagemin', 'scripts', 'stylus', 'watch']);
