
const { src, dest, watch, parallel } = require('gulp'),
sass = require('gulp-sass')(require('sass'));
plumber = require('gulp-plumber'),
webp = require('gulp-webp'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache'),
avif = require('gulp-avif'),
autoprefixer = require('autoprefixer'),
postcss = require('gulp-postcss'),
cssnano = require('cssnano'),
sourcemaps = require('gulp-sourcemaps'),
terser = require('gulp-terser-js');

function css( done ) {

src('src/scss/**/*.scss') // Identificar el arvhico .scss a compilar
  .pipe( sourcemaps.init() )
  .pipe( plumber() )
  .pipe( sass() ) // Compilar
  .pipe( postcss([ autoprefixer() , cssnano() ]))
  .pipe( sourcemaps.write('.') )
  .pipe( dest('build/css') ) // Almacenar
done();
}

function imagenes( done ) {

const opciones = {
  optimizationLevel: 3
}

src('src/img/**/*.{png,jpg}')
  .pipe( cache( imagemin(opciones) ) )
  .pipe( dest('build/img') )
done();
}

function versionWebp( done ) {

const opciones = {
  quality: 50
}

src('src/img/**/*.{png,jpg}')
  .pipe( webp(opciones) )
  .pipe( dest('build/img') ) 
done();
}

function versionAvif( done ) {

const opciones = {
  quality: 50
}

src('src/img/**/*.{png,jpg}')
  .pipe( avif(opciones) )
  .pipe( dest('build/img') ) 
done();
}

function javascript( done ) {

src("src/js/**/*.js")
  .pipe( sourcemaps.init() )
  .pipe( terser() )
  .pipe( sourcemaps.write('.') )
  .pipe(dest('build/js'));
done();
}

function dev( done ) {

watch('src/scss/**/*.scss', css);
watch('src/js/**/*.js', javascript);
done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev );