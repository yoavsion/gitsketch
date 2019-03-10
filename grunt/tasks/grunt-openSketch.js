"use strict";

var sketch = require("./common/sketch");
var execa  = require("execa");

module.exports = function (grunt) {
    grunt.registerTask("openSketch",
        "Generates a sketch file from a git-ready sketch directory, then opens it", function () {
        var done = this.async();

        var parentDirPath = grunt.option("src");
        if (!parentDirPath) {
            grunt.fail.fatal("Usage: grunt genSketch --src=<git-sketch-folder>");
        }

        sketch.generate(parentDirPath).then(function (sketchFilePath) {
            grunt.log.writeln("Sketch file generated successfully. Opening " + sketchFilePath);
            return execa.shell("open " + sketchFilePath);
        }).then(function () {
            done(true);
        }).catch(function (error) {
            grunt.log.error("Failed generating sketch file:");
            grunt.fail.fatal(error);
        });
    });
};
