const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

// now i need to create the task of minifying css
gulp.task('css',function(done){
    console.log("minifying css....");

    // gulp source is sass file
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())                        // module to convert sass to css
    .pipe(cssnano())                     // module to compress css file
    .pipe(gulp.dest('./assets.css'));   

    // but for production mode, we need a public folder which contains all the assets
     gulp.src('./assets/**/*.css')       // now taking css file to rename
    .pipe(rev())                         // module to rename the file
    .pipe(gulp.dest('./public/assets'))  // putting at final place
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// task to minify javascript
gulp.task('js',function(done){
    console.log("minifying javascript....");
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// task to minify images 
gulp.task('images',function(done){
    console.log("compressing images...");
    gulp.src('./assets/**/*.+(jpg|png|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

//  task  to empty /public/assets directory
gulp.task('clean:assets',function(done){
    console.log("cleaning the directory ...");
    del.sync('./public/assets');
    done();
});

// task to build the assets
gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
    console.log("building the assets ...");
    done();
});