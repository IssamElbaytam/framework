var _ = require('underscore');
var fs = require('fs');
var path = require ('path');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('squashdemos', 'Squash Demos', function() {
    var mainObject = {};
    var out = "window.rfDemos = {\n";
    grunt.log.writeln("Squashing demos...");

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var configPath = grunt.file.expand(options.demosConfig);
    var config = JSON.parse(grunt.file.read(configPath));
    var demosObject = config.demos;
    var jsDemoFiles = grunt.file.expand(options.demoPaths.js);
    var phpDemoFiles = grunt.file.expand(options.demoPaths.php);
    var demoCode = 'rfDemoCode = {';
    for(var i=-1; ++i<demosObject.length;) {
      var section = demosObject[i];
      var demos = section.demos;
      
      
      for(var j=-1; ++j<demos.length;) {
        var demo = demos[j];
        var jsFileName = _.filter(jsDemoFiles, function(fn) { return fn.match(demo.js); })[0];
        var phpFileName = _.filter(phpDemoFiles, function(fn) { return fn.match(demo.php); })[0];

        var jsContent = jsFileName ? grunt.file.read(jsFileName) : '';
        var phpContent = phpFileName ? grunt.file.read(phpFileName) : '';

        jsContent = jsContent.replace(/'/g, '"');

        demoCode += '\n"' + demo.id + '": function() {' + jsContent +'},';
        demosObject[i].demos[j].jsContent = jsContent;
        demosObject[i].demos[j].phpContent = phpContent;
      }
    }

    var demosJson = JSON.stringify(demosObject, null, '\n');


    // var files = grunt.file.expand(options.demos);
    // var phpFiles = grunt.file.expand(options.phpDemos);
    // // console.log(phpFiles);
    // for(var i = 0; i < files.length; i++) {
    //   var item = files[i];
    //   var id = path.basename (item, ".js");
    //   var content = grunt.file.read(item);
    //   var phpContent = '';
    //   var phpFilename = _.filter(phpFiles, function(fn) { return fn.match(id); })[0];
    //   if(phpFilename) {
    //     phpContent = grunt.file.read(phpFilename);
    //   }
    //   var meta = JSON.parse(content.match(/\/\*&([^\*\/]*)/)[1]);

    //   meta.content = content;
    //   meta.phpContent = phpContent;
    //   meta.method = "**content**"
    //   if(mainObject[meta.section.id]) {
    //     mainObject[meta.section.id].items[meta.id] = meta;
    //   } else {
    //     mainObject[meta.section.id] = {
    //       title: meta.section.title,
    //       items: {}
    //     }
    //     mainObject[meta.section.id].items[meta.id] = meta;
    //   }
    // }

    // for(var key in mainObject) {
    //   out += '"' + key + '" : { \n';
    //   out += '"title": "' + mainObject[key].title + '",\n';
    //   out += '"items": {\n';
    //   var items = mainObject[key].items;
    //   for(var item in items) {
    //     var content = items[item].content;
    //     var json = JSON.stringify(items[item]);
    //     content = content.replace(/'/g, '"');
    //     json = json.replace('"**content**"', "function() {" + content + "},");
    //     out += '"' + item + '": ' + json + ",";
    //   }
    //   out += '}},';

    // } 

    // // console.log(out);

    // out += "}";
    demoCode += '};';
    grunt.file.write(options.out, 'window.rfDemos = ' + demosJson + ';');
    grunt.file.write(options.outCode, demoCode);

    grunt.log.ok("Finished squashing.");
  });

};
