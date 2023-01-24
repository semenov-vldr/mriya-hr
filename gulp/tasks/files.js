module.exports = function() {
  $.gulp.task('files:dev', function() {
    return $.gulp.src($.path.src + '/files/*.pdf')
      .pipe($.gulp.dest($.path.assets + '/files/'))
  })
}
