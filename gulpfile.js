const { dest, src, series, watch } = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function scripts() {
  const tsResult = tsProject.src().pipe(tsProject());

  return tsResult.js.pipe(dest('dist'));
}

function static() {
  return src(['src/**/*.js']).pipe(dest('dist'));
}

function cleanFiles() {
  return src('dist').pipe(clean());
}

exports.scripts = series(static, scripts);
exports.static = series(cleanFiles, static);
exports.clean = cleanFiles;
exports.build = scripts;
exports.default = () => {
  watch(['src/**/*.ts', 'src/**/*.js'], scripts);
};
