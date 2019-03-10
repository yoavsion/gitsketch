"use strict";

var sketch = require("./common/sketch");

module.exports = function (grunt) {
    grunt.registerTask("importSketch",
        "Imports a sketch file into a git-ready sketch directory", function () {
        var done = this.async();

        var src = grunt.option("src");
        var target = grunt.option("target");
        if (!src || !target) {
            grunt.fail.fatal("Usage: grunt importSketch --src=<sketch-file> --target=<containing dir>");
        }

        sketch.import(src, target).then(function () {
            grunt.log.writeln("Sketch file imported successfully");
            done(true);
        }).catch(function (error) {
            grunt.log.error("Failed importing sketch file:");
            grunt.fail.fatal(error);
        });
    });
};
