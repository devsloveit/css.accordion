module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                outputStyle: 'expanded',
                sourceMap: false,
                includePaths: [
                    'src/styles'
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: 'dist/styles',
                    ext: '.css'
                }]
            }
        },
        watch: {
            options: {
                spawn: false
            },
            scss: {
                files: 'src/**/*.scss',
                tasks: ['sass', 'postcss']
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 10', 'and_chr >= 2.3', 'and_uc >= 6']
                    })
                ]
            },
            dist: {
                src: 'dist/styles/accordion.css'
            }
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist/styles',
                    src: ['accordion.css'],
                    dest: 'dist/styles',
                    ext: '.min.css'
                }]
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'postcss', 'cssmin']);
};