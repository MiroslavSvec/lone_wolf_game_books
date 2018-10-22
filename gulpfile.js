const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

// Lone Wolf Setting

gulp.task('scripts', function () {
	gulp.src('src/lone-wolf/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify()) 
		.pipe(gulp.dest('static/js'));
});

gulp.task("copy-scripts", function() {
	gulp
		.src("src/js/*.js")
		.pipe(gulp.dest("Lone-Wolf/src/js"));
}); 

gulp.task('watch', function () {
	gulp.watch("src/lone-wolf/js/*.js", ["scripts"]);
	gulp.watch("src/lone-wolf/js/*.js", ["copy-scripts"]);
});


