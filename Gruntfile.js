var requireConfig = require("./jsrf/src/js/requireConfig");
var _ = require("underscore");

module.exports = function(grunt) {
    // Options for builds, usually specified by 
    var opts = {
        channel: "beta",
        version: "unknown_version"
    };

    var JSRF_Tasks = {
        requirejs: {
            core: {options:requireConfig.core},
            devtools: {options:requireConfig.devtools},
            wrapper: {options:requireConfig.wrapper}
        },
        jst: {
            jsrf: {
                options: {
                    prettify: true,
                    processName: function (filePath) {
                        var parts = filePath.split('/');
                        var fileName = parts[parts.length - 1];
                        return fileName.split('.')[0];
                    },
                    amd: true,
                    global: false,
                    requires: {
                        'vendor/lodash' : '_'
                    }
                },
                files: {
                    "jsrf/src/js/generated/templates.js": ["jsrf/src/templates/*.html"]
                }
            }
        },
        themegen: {
            jsrf: {
                options: {
                    themeLess: "jsrf/src/less/theme.less",
                    mixins: "jsrf/src/less/mixins.less",
                    defaultVariables: "jsrf/src/less/theme/variables.less"
                },
                themeJSON: "jsrf/src/js/themebuilder/config/defaulttheme.json",
                out: "build/tmp/less/rftheme.default.less",
            }
        },
        less: {
            jsrf: {
                options: {
                    paths: ['jsrf/src/less']
                },
                files: {
                    "build/tmp/css/razorflow.css": "jsrf/src/less/razorflow.less",
                }
            }
        },
        cssmin: {
            jsrf: {
                expand: true,
                cwd: 'build/tmp/css/',
                src: ['razorflow.css'],
                dest: 'build/assets/css',
                ext: '.min.css'
            }
        },
        copyto: {
            jsrf_img: {
                files:[
                    {cwd:"jsrf/src/", src:["img/*"], dest:"build/assets/"}
                ]
            }
        },
        packman: {

        } 
    };
    grunt.registerTask("jsrf:compile", []);
    grunt.registerTask("build:jsrf", ["requirejs", "jst:jsrf", "themegen:jsrf", "less:jsrf", "cssmin:jsrf"]);

    function addPackageWithLicense (opts) {


    }

    JSRF_Tasks.packman.js_dev = {
        file_name: "razorflow_framework_js",
        container_name: "razorflow_framework_js",
        files: [
            {file: "readme.html", src:"tools/licenses/dev/suite.html"},
            {dir:"files", files: [
                {dir: "js", files: [
                    "build/assets/js/razorflow.min.js",
                    "build/assets/js/razorflow.devtools.min.js"
                ]},
                {dir: "img", src:"build/assets/img/"},
                {dir: "css", src:"build/assets/css/"}
            ]},
            {dir:"dashboard_quickstart", src:"jsrf/quickstart/", files:[
                {dir: "js", files:[
                    "build/assets/js/razorflow.min.js"
                ]},
                {dir: "img", src:"build/assets/img/"},
                {dir: "css", src:"build/assets/css/"}
            ]}
        ]
    };

    JSRF_Tasks.packman.php_dev = {
        file_name: "razorflow_framework_php",
        container_name: "razorflow_framework_php",
        files: [
            {file: "readme.html", src:"tools/licenses/dev/suite.html"},
            {dir:"razorflow_php", src:"wrappers/phprf/src/", files: [
                {dir:"static", files: [
                    {dir:"rf", files:[
                        {dir:"js", files: [
                            "build/assets/js/razorflow.wrapper.min.js",
                            "build/assets/js/razorflow.devtools.min.js"
                        ]},
                        {dir:"img", src:"build/assets/img/"},
                        {dir:"css", src:"build/assets/css/"}
                    ]}
                ]}
            ]},
            {dir: "dashboard_quickstart", src:"wrappers/phprf/dashboard_quickstart/", files:[
                {dir:"razorflow_php", copyFromPackage: "../razorflow_php/"}
            ]}
        ]
    }


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadTasks ('./tools/grunt-tasks/');
    grunt.initConfig (JSRF_Tasks);
};