"use strict";

var sketch = require("./common/sketch");

module.exports = function (grunt) {
    grunt.registerTask("genSketch",
        "Generates a sketch file from a git-ready sketch directory", function () {
        var done = this.async();

        var parentDirPath = grunt.option("src");
        if (!parentDirPath) {
            grunt.fail.fatal("Usage: grunt genSketch --src=<git-sketch-folder>");
        }

        sketch.generate(parentDirPath).then(function (sketchFilePath) {
            grunt.log.writeln("Sketch file generated successfully: " + sketchFilePath);
            done(true);
        }).catch(function (error) {
            grunt.log.error("Failed generating sketch file:");
            grunt.fail.fatal(error);
        });
    });
};
