"use strict";

var sketch = require("./common/sketch");

module.exports = function (grunt) {
    grunt.registerTask("stageSketch",
        "Stages changes made to a sketch file inside a git-ready sketch directory", function () {
        var done = this.async();

        var src = grunt.option("src");
        if (!src) {
            grunt.fail.fatal("Usage: grunt stageSketch --src=<sketch-file>");
        }

        sketch.stage(src).then(function () {
            grunt.log.writeln("Sketch file staged successfully");
            done(true);
        }).catch(function (error) {
            grunt.log.error("Failed staging sketch file failed:");
            grunt.fail.fatal(error);
        });
    });
};
