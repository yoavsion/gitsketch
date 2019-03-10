"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        gitsketch: {
            deletePreviews:     true,
            export: {
                args: {
                    background: "#FFFFFF",
                    formats:    "svg",
                    trimmed:    "NO",
                },
                to:             "exports",
                tool:           "/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool",
            },
            fonts: {
                embedPrefixes:  ["Arial"],
                ignorePrefixes: [
                    "Arial ",
                    "ArialNarrow-Italic",
                ],
                path:           "./assets/fonts",
                extension:      "ttf",
            },
            generateReadme:     true,
            unpacked:           ".sketch",
        },
    });

    // Load our custom grunt tasks
    grunt.task.loadTasks("grunt/tasks");
};
