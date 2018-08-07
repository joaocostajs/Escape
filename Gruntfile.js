/*!
 * FireShell Gruntfile
 * http://getfireshell.com
 * @author Todd Motto
 */

'use strict';

/**
 * Livereload and connect variables
 */


var LIVERELOAD_PORT = 35727;
var _ = require('lodash');
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};


/**
 * Grunt module
 */
module.exports = function (grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var prodComponents = Object.keys(grunt.file.readJSON('./package.json').dependencies);
  grunt.log.write(prodComponents);

  /**
   * FireShell Grunt config
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    /**
     * Set project info
     */
    project: {
      src: 'src',
      app: 'app',
      assets: '<%= project.app %>/assets',
      css: [
        '<%= project.src %>/scss/style.scss'
      ],
      cssmm: [
        '<%= project.src %>/css/*.css'
      ],
      js: [
        '<%= project.src %>/js/plugins/*.js',
        '<%= project.src %>/js/*.js'
      ],
      php: [
        '<%= project.src %>/php/*.php'
      ]
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },

    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     * Starts a local webserver and injects
     * livereload snippet
     */
    connect: {
      options: {
        port: 9003,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'app')];
          }
        }
      }
    },

    /**
     * Clean files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     * Remove generated files for clean deploy
     */
    clean: {
      dist: [
        '<%= project.assets %>/css/style.unprefixed.css',
        '<%= project.assets %>/css/style.prefixed.css'
      ]
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Concatenate JavaScript files
     * https://github.com/gruntjs/grunt-contrib-concat
     * Imports all .js files and appends project banner
     */
    concat: {
      dev: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'

        }
      },
      options: {
        stripBanners: true,
        nonull: true,
        banner: '<%= tag.banner %>'
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: '<%= tag.banner %>'
      },
      dist: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
        }
      }
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    sass: {
      dev: {
        options: {
          'default-encoding':'utf-8',
          style: 'expanded',

          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.assets %>/css/style.unprefixed.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          'default-encoding':'utf-8',
          style: 'expanded'
        },
        files: {
          '<%= project.assets %>/css/style.unprefixed.css': '<%= project.css %>'
        }
      }
    },

    /**
     * Autoprefixer
     * Adds vendor prefixes if need automatcily
     * https://github.com/nDmitry/grunt-autoprefixer
     */
    autoprefixer: {
      options: {
        browsers: [
          'last 2 version',
          'safari 6',
          'ie 9',
          'opera 12.1',
          'ios 6',
          'android 4'
        ]
      },
      dev: {
        files: {
          '<%= project.assets %>/css/style.min.css': ['<%= project.assets %>/css/style.unprefixed.css']
        }
      },
      dist: {
        files: {
          '<%= project.assets %>/css/style.prefixed.css': ['<%= project.assets %>/css/style.unprefixed.css']
        }
      }
    },

    /**
     * CSSMin
     * CSS minification
     * https://github.com/gruntjs/grunt-contrib-cssmin
     */
    cssmin: {
      dev: {
        options: {
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.assets %>/css/style.min.css': [
            '<%= project.assets %>/css/jquery.dropdown.css',
            '<%= project.assets %>/css/slabtext.css',
            '<%= project.assets %>/css/style.unprefixed.css',
          ]
        }
      },
      dist: {
        options: {
          banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.assets %>/css/style.min.css': [
            '<%= project.assets %>/css/jquery.dropdown.css',
            '<%= project.assets %>/css/style.prefixed.css',
          ]
        }
      }
    },

    /**
     * FIND
     * Find them files!!!
     * https://github.com/hurrymaplelad/grunt-find
     */

    // find: {
    //   frontendependencies: {
    //     cwd: ['node_modules'],
    //     name: '*.min.js',
    //     expand: true,
    //     dest: 'app/modules/',
    //
    //   }
    // },

    copy: {
      frontendependencies: {
        files: [
          // flattens results to a single level
          {expand: true, flatten: true, cwd: 'node_modules/', src: ['**/*.min.js'], dest: 'app/assets/modules', filter: function(dest){
            grunt.log.writeln(['coisa | ']);
            grunt.log.writeln([prodComponents]);
            grunt.log.writeln([dest]);
            var reduced1 = dest.split('/');
            var reduced2 = reduced1[reduced1.length - 1].split('.min.js');
            var reduced3 = reduced2[0].split('-');
            if(reduced3.length > 1){
              return (_.includes(prodComponents, reduced3[0]));
            }else{
              return (_.includes(prodComponents, reduced2[0]));
            }

          }},
        ],
      },
    },

    /**
     * PROCESSHTML
     * Render HTML Components
     * https://github.com/dciccale/grunt-processhtml
     */

    processhtml: {
      dev: {
        options: {
          data: {
            message: 'This is development environment'
          }
        },
        files: {
          '<%= project.app %>/index.html': ['<%= project.src %>/html/index.html'],
          '<%= project.app %>/rum-north-natural.html': ['<%= project.src %>/html/rum-north-natural.html'],
          '<%= project.app %>/rum-north-velho.html': ['<%= project.src %>/html/rum-north-velho.html'],
          '<%= project.app %>/rum-north-barrica.html': ['<%= project.src %>/html/rum-north-barrica.html'],
          '<%= project.app %>/rum-north-natural-60.html': ['<%= project.src %>/html/rum-north-natural-60.html'],
        }
      },
      dist: {
        options: {
          process: true,
          data: {
            title: 'My app',
            message: 'This is production distribution'
          }
        },
        files: {
          'dest/index.html': ['index.html']
        }
      }
    },

    /**
     * Build bower components
     * https://github.com/yatskevich/grunt-bower-task
     */
    // bower: {
    //   dev: {
    //     dest: '<%= project.assets %>/components/'
    //   },
    //   dist: {
    //     dest: '<%= project.assets %>/components/'
    //   }
    // },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    'ftp-deploy': {
        build: {
          auth: {
            host: 'ftp.limsomnium.com',
            port: 21,
            authKey: 'key1'
          },
          src: '<%= project.src %>/php/',
          dest: '/lim9/php/',

        }
      },


    /**
     * Runs tasks against what changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     * Livereload the browser once complete
     */
      watch: {
        concat: {
          files: '<%= project.src %>/js/{,*/}*.js',
          tasks: ['concat:dev', 'jshint']
        },

        sass: {
          files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
          tasks: ['sass:dev', 'autoprefixer:dev', 'cssmin:dev']
        },

        processhtml: {
          files: ['<%= project.src %>/html/{,*/}*/{,*/}*.html', '<%= project.src %>/html/{,*/}*.html'],
          tasks: ['processhtml:dev']
        },

        img: {
          files: '<%= project.src %>/img/{,*/}*.{jpg,png}',
          tasks: ['responsive_images','imagemin']
        },


        livereload: {
          options: {
            livereload: LIVERELOAD_PORT
          },
          files: [
            '<%= project.app %>/{,*/}*.html',
            '<%= project.app %>/login/{,*/}*.html',
            '<%= project.app %>/register/{,*/}*.html',
            '<%= project.app %>/checkout/{,*/}*.html',
            '<%= project.app %>/checkout/pages/{,*/}*.html',
            '<%= project.app %>/cart/{,*/}*.html',
            '<%= project.app %>/catalog/{,*/}*.html',
            '<%= project.app %>/catalog/item/{,*/}*.html',
            '<%= project.app %>/news-blog/{,*/}*.html',
            '<%= project.app %>/news-blog/post/{,*/}*.html',
            '<%= project.app %>/about-us/{,*/}*.html',
            '<%= project.app %>/services/{,*/}*.html',
            '<%= project.assets %>/css/*.css',
            '<%= project.assets %>/js/{,*/}*.js',
            '<%= project.src %>/php/{,*/}*.php',
            '<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= project.src %>/img/{,*/}*.{jpg,png}',
          ]
        }
      },

      imagemin: {
          png: {
            options: {
              optimizationLevel: 2
            },
            files: [
              {
                expand: true,
                cwd: '<%= project.src %>/img/', // cwd is 'current working directory'
                src: ['**/*.png'],
                dest: '<%= project.assets %>/img/', // Could also match cwd.
                ext: '.png'
              }
            ]
          },
          jpg: {
            options: {
              progressive: true
            },
            files: [
              {
                expand: true, // Tell Grunt where to find our images and where to export them to.
                cwd: '<%= project.src %>/img/', // cwd is 'current working directory'
                src: ['**/*.jpg'],
                dest: '<%= project.assets %>/img/', // Could also match cwd.
                ext: '.jpg'
              }
            ]
          },
          gif: {
            options:{
              progressive: true
            },
            files: [
              {
                expand: true, // Tell Grunt where to find our images and where to export them to.
                cwd: '<%= project.src %>/img/', // cwd is 'current working directory'
                src: ['**/*.gif'],
                dest: '<%= project.assets %>/img/', // Could also match cwd.
                ext: '.gif'
              }
            ]
          }
        },

        responsive_images: {
          dev:{
            options: {
              sizes: [{
                name: 'smallest',
                width: 400
              },{
                name: 'small',
                width: 650
              },{
                name: 'medium',
                width: 900
              },{
                name: 'big',
                width: 1200
              },{
                name: 'HD',
                width: 1750
              }]
            },
            files: [
              {
                expand: true,
                src: ['*.jpg'],
                cwd: '<%= project.src %>/img/bg/',
                dest: '<%= project.src %>/img/'
              }
            ]

          }
        },




      });





  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'copy:frontendependencies',
    'autoprefixer:dev',
    'cssmin:dev',
    'jshint',
    'concat:dev',
    'processhtml:dev',
    // 'responsive_images:dev',
    'imagemin',
    'connect:livereload',
    'open',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:dist',
    'autoprefixer:dist',
    'cssmin:dist',
    'jshint',
    'uglify:dist',
    'processhtml:dev',
    'responsive_images:dev',
    'imagemin',
  ]);

  grunt.registerTask('ftp', [ 'ftp-deploy' ] );

  grunt.registerTask('actualizar', [ 'check-modules' ] );

};
