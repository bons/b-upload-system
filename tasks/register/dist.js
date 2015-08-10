module.exports = function(grunt)
{
  grunt.registerTask('dist', ['jshint', 'karma:dist', 'browserify', 'uglify']);
}
