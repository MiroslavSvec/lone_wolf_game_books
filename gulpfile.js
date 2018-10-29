const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Lone Wolf Setting

gulp.task('scripts', function () {
	gulp.src('src/0.1/*.js')
		.pipe(concat('main.js'))
		//.pipe(uglify()) 
		.pipe(gulp.dest('static/js'));
});

gulp.task('watch', function () {
	gulp.watch("src/0.1/*.js", ["scripts"]);
});


