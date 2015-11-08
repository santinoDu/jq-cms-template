//在你的项目根目录下创建gulpfile.js，代码如下：

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息



// 检查js
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(notify({ message: 'js task ok' }));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('js');


    // Watch .js files
    gulp.watch('src/js/*.js', ['lint', 'js']);

    // Watch image files
});

