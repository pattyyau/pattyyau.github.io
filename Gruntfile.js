module.exports = function (grunt) {

  const sass = require('node-sass');
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        implementation: sass,
        precision: 6,
        sourceMap: false
      },
      main: {
        files: {
          'assets/css/main.min.css': '_sass/main.scss'
        }
      },
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')(),
          require('css-mqpacker')({ sort: true }),
          require('cssnano')(),
        ],
      },
      main: {
        src: 'assets/css/*.min.css'
      },
    },

    uglify: {
      options: {
        mangle: true,
        preserveComments: false,
        //drop_console: true,
        //unused: false,
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      },
      app: {
        files: {
          'assets/js/app.min.js': [
            '_libs/*.js',
            '_js/app.js',
          ],
        },
      },
    },

    watch: {
      options: {
        livereload: true,
      },
      sass: {
        files: ['_sass/**/*.{scss,sass}'],
        tasks: ['sass:main', 'postcss:main']
      },
      js: {
        files: ['_js/**/*.{js}'],
        tasks: ['uglify:app']
      }
    },

    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'bundle exec jekyll serve'
      }
    },

    // run tasks in parallel
    concurrent: {
      serve: [
        ['sass', 'postcss', 'uglify'],'watch','shell:jekyllServe'
      ],
      options: {
        logConcurrentOutput: true
      }
    },

  });

  grunt.registerTask('default', ['sass:main', 'postcss:main']);
  grunt.registerTask('js', ['uglify:app']);
  grunt.registerTask('serve', ['concurrent:serve']);

};