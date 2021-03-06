/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
          
    concat: {
      dist: {
        src: ['src/gfx/graph.js', 'src/util/utility.js', 'src/util/config.js', 'src/util/constants.js', 'src/util/register.js', 'src/util/effects.js', 'src/util/palette.js', 'src/util/test.js', 'src/gfx/area.js', 'src/gfx/bar.js',
              'src/gfx/donut.js', 'src/gfx/line.js', 'src/gfx/percent_area.js', 'src/gfx/percent_bar.js', 'src/gfx/pie.js', 'src/gfx/stacked_area.js', 'src/gfx/stacked_bar.js', 'src/gfx/stepup_bar.js', 
              'src/gfx/table.js', 'src/gfx/tablegraph.js'],
        dest: 'dist/uv.js'
      },
      
      gfx : {
        src: ['src/gfx/graph.js', 'src/util/utility.js', 'src/util/config.js', 'src/util/constants.js', 'src/util/register.js', 'src/util/effects.js', 'src/util/palette.js', 'src/util/test.js', 'src/gfx/area.js', 'src/gfx/bar.js',
              'src/gfx/donut.js', 'src/gfx/line.js', 'src/gfx/percent_area.js', 'src/gfx/percent_bar.js', 'src/gfx/pie.js', 'src/gfx/stacked_area.js', 'src/gfx/stacked_bar.js', 'src/gfx/stepup_bar.js', 
              'src/gfx/table.js', 'src/gfx/tablegraph.js'],
        dest: 'dist/uvcharts.js'
      },

      style : {
        src : ['src/css/uv.css'],
        dest : 'dist/uv.css'
      }
    },
   
    watch: {
      scripts: {
        files: ['src/gfx/*.js','src/util/*.js','src/css/*.css'],
        tasks: ['build_gfx'],
        options: {
        interrupt: true,
        },
      },
    },
    
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('build_gfx', ['concat']);
};