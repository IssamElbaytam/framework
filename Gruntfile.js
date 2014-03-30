var gruntRequireConfig = require('./src/dev/requireConfig').gruntConfig;
var gruntWrapperRequireConfig = require('./src/dev/requireConfig').gruntWrapperConfig;

module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            core: {
                options: gruntRequireConfig
            },
            wrapper: {
                options: gruntWrapperRequireConfig
            }
        },
        concat: {

        },
        jst: {
            compile: {
                options: {
                    prettify: true,
                    processName: function (filePath) {
                        var parts = filePath.split('/');
                        var fileName = parts[parts.length - 1];
                        return fileName.split('.')[0];
                    },
                    amd: true
                },
                files: {
                    "src/js/generated/templates.js": ["src/templates/*.html"]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    "build/tmp/razorflow.css": "src/less/razorflow.less"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: 'src/js/.jshintrc'
            },
            files: [
                "src/js/**/*.js"
            ]
        },
        karma: {
            dev: {
                configFile: './karma.conf.js',
                singleRun: true
            }
        },
        lodash: {
            build: {
                dest: 'src/vendor/js/lodash.rf.js',
                options: {
                    include: ['extend', 'pluck', 'map', 'each', 'isNumber', 'isString', 'isNaN', 'isArray', 'isObject', 'find', 'defer', 'delay', 'max', 'min', 'sortBy', 'flatten', 'clone', 'cloneDeep', 'values', 'pick', 'reduce', 'filter', 'indexOf', 'keys', 'debounce'],
                }
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/tmp/',
                src: ['razorflow.css'],
                dest: 'build/assets/css',
                ext: '.min.css'
            }
        },
        // Need to copy products.json
        copy: {
            localToWebRF: {
                files: [
                    {src: ["build/js/razorflow.min.js"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/css/razorflow.min.css"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/js/templates.js"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/js/rfDemos.js"], dest: '../webrf/backend/static/transfer/', flatten:true},
                    {src: ["build/img/exampleImgs/*.png"], dest: '../webrf/backend/static/transfer/',flatten: true },
                ]
            }
        },
        copyto: {
            srcToBuild: {
                files: [
                    {cwd: 'src/vendor/js/', src: ['jquery.min.js'], dest: 'build/assets/js/'},
                ]
            },
            packageToBuild: {
                files: [
                    {cwd: 'src/package/', src: ['**/*'], dest: 'build/package/'},
                ],
            },
            assetsToPackage: {
                files: [
                    {cwd: 'build/assets/', src: ["js/**", "css/**"], dest: 'build/package/files/'},
                    {cwd: 'build/assets/', src: ["js/**", "css/**"], dest: 'build/package/dashboard_quickstart/'},
                ],
            },
            packageToRelease: {
                files: [
                    {cwd: 'src/package/', src: ['**'], dest: '../package/rf/javascript/'}
                ]
            }
        },
        replace: {
            removeAMD: {
                src: "build/assets/js/razorflow.min.js",
                overwrite: true,
                replacements: [
                    {from: /\bdefine\b/g, to: "_dfn"},
                    {from: /\brequire\b/g, to: "_rqr"}
                ]
            }
        },
        clean: {
            build: ["build"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-lodash');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks("./tools/src/grunt-tasks");


    
    grunt.registerTask('compile', ['less', 'jst:compile']);
    grunt.registerTask('test', ['compile', 'karma:dev', 'shell:coverageReport']);

    grunt.registerTask('build', ["clean:build", "less", "jst:compile", 'requirejs:core', 'requirejs:wrapper', "replace:removeAMD", 'cssmin:minify', "copyto:srcToBuild"])
    grunt.registerTask('package', ['build', 'copyto:packageToBuild', 'copyto:assetsToPackage'])
    // grunt.registerTask('websiteRelease', ['build', 'cssmin:minify', 'squashdemos', "screenshotGen:examples", 'copy:localToWebRF'])
}