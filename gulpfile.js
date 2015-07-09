var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('libraries', function() {
	return gulp.src('bower_components/*/dist/**/*')
	.pipe(gulp.dest('resources/'));
});

gulp.task('uglify_js', function() {
	return gulp.src('resources_src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('resources/js/'));
});

gulp.task('sass', function () {
  return gulp.src('resources_src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('resources/css.'))
	.pipe(browserSync.stream());
});

gulp.task('minify_images', function() {
	return gulp.src('resourcecs_src/image/*')
	.pipe(imagemin())
	.pipe(gulp.dest('resourcces/image/'));
})

gulp.task('watch', function() {
	browserSync.init({
        proxy: "shiqingqi.com"
    });

	gulp.watch('resources_src/css/**/*.scss', ['sass']);
	gulp.watch('resources_src/js/**/*.js', ['uglify_js'])
	.on('change', browserSync.reload);
	gulp.watch('resources_src/image/**/*', ['minify_images'])
	.on('change', browserSync.reload);
	gulp.watch('**/*.html')
	.on('change', browserSync.reload);
});

gulp.task('default', 
	['libraries', 
	'uglify_js', 
	'sass', 
	'minify_images'], 
	function() {
		// place code for your default task here
	}
);