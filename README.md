# gitsketch
A set of grunt tasks for versioning sketch file contents in git

[![npm version](https://img.shields.io/npm/v/grunt-git-sketch.svg)](https://www.npmjs.com/package/grunt-git-sketch)
[![dependencies](https://img.shields.io/david/yoavsion/gitsketch.svg)](https://david-dm.org/yoavsion/gitsketch)

---

## Overview

Sketch files, being binary, aren't ideal for versioning in git.

Using the grunt tasks details below, that's no longer a problem!

Consider the benefits of including versionable, _diffable_ sketch file contents in your repo:
* Have your designs live alongside your code; feature/release branches now always include their respective design files as a point of reference
* Treat design changes as pull requests; gather feedback from fellow designers/devs before committing changes to your repo
* Be able to diff sketch file contents; see [these example PRs](https://github.com/yoavsion/gitsketch/pulls?q=is%3Apr+is%3Aclosed+label%3Aexample) showcasing how changes made to an imported sketch file are clearly visualized in GitHub
* Using auto-generated README.md files next to your versioned sketch contents, you get a visual design wiki for free

The process around git-ifying your sketch files is simple:
1. Import your existing sketch file – a one time operation – using the `importSketch` command.
  Your versionable sketch file will be ready for you to commit into your repo. You basically don't need the sketch file you just imported any longer.
2. Whenever you need to work on a versioned sketch file, use `openSketch` and make your changes.
3. Save your changes in sketch and use `stageSketch` and commit your changes to your repo.

---
## Tasks

### grunt importSketch
Imports a sketch file into a git-ready sketch directory.
You only need to run this task once per sketch file you are importing into your repo.

#### Syntax
`grunt importSketch --src=<sketch-file> --target=<containing dir>`
#### Options
* `--src`<br/>
  The sketch file being imported into your repo.
* `--target`<br/>
  A folder in your repo where you want to keep your versioned sketch contents.<br/>
  Under the target folder, there will be a separate folder for each sketch file you import into your repo, with the imported sketch file's name.

For example:
`grunt importSketch --src=./original/sketch/shapes.sketch --target=./versioned`
Will import the contents of the sketch file from `./original/sketch/shapes.sketch` into `./versioned/shapes/`.

Your versionable sketch contents will be staged and ready to commit to your repo.

### grunt openSketch
Generates a sketch file from a versioned sketch contents folder, then opens it.

#### Syntax
`grunt openSketch --src=<versioned-sketch-folder>`
#### Options
* `--src`<br/>
  A folder in your repo that contains verioned sketch contents.

Following the example above under `importSketch`, here's how you would open the imported `shapes.sketch` sketch file in Sketch:
`grunt openSketch --src=./versioned/shapes`

**Note 1:** The generated file will have the same name as the versioned contents folder (`shapes`, in the example above) and will placed under that folder.

**Note 2:** If you only wanted to generate the sketch file, but not open it, use `grunt genSketch --src=<versioned-sketch-folder>`

### grunt stageSketch
Stages changes made to an imported sketch file, so that they are ready to be commited to your repo.

#### Syntax
`grunt stageSketch --src=<sketch-file>`

#### Options
* `--src`<br/>
  The generated sketch file to which you've made changes that you'd like to stage.

Following the example above under `openSketch`, here's how you would stage changes you've made to `shapes.sketch`:
`grunt stageSketch --src=./versioned/shapes/shapes.sketch`

---
## Configurations
See [this Gruntfile.js](https://github.com/yoavsion/gitsketch/blob/master/Gruntfile.js) for an example configuration object.

#### gitsketch.unpacked (string)
Sketch files are just zipped contents (for the most part, json contents). In order to keep them in a versionable format, gitsketch unzips the contents of a file when it's imported/staged.
This configuration defines the name of the unpacked folder. Since there's no need for the contents of this folder to be modified in its unpacked form, it is encouraged that you use a hidden folder name, for example `.sketch` or `.unpacked`.

Default: `.sketch`

#### gitsketch.deletePreviews (bool)
Sketch files contain a previews folder; these are _not_ your sketch file's contents.
Specify `true` in order to remove this folder when importing or staging sketch files.

Default: `false`

#### gitsketch.export.tool (string)
Points to the sketchtool binary. See sketchapp.com/tool for where to find it.
gitsketch uses the sketctool to export artboards from your sketch file.

Default: `"/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool"`

#### gitsketch.export.to (string)
gitsketch will export artboards from your sketch file into a folder next to your unpacked sketch foider (see above, `config.unpacked`). This configu value determines the name of that folder.

Default: `exports`

#### gitsketch.export.args.formats (string)
A comma delimited list of file formats. For each exported artboard, sketchtool will generate an export in each format specified. See sketchapp.com/tool for a list of supported formats.

Default: `svg`, due to it being a text file format

#### gitsketch.export.args.* (string:string ma)
Aside from the required formats argument, use this map to specify any other arguments you'd like to pass on to sketchtool.
See sketchapp.com/tool for a list of supported arguments.

**Note:** The `output` argument is ignored; gitsketch will figure out where to send the exports based on the name specified in `gitsketch.export.to`.

#### gitsketch.generateReadme (bool, optional)
Indicates whether gitsketch should generate a README.md for the imported/staged sketch file.
The generated readme file contains links pointing to each of the exports created for each of the artboards in the sketch file.
It generally provides an easy way of reviewing the contents of a sketch file without having to dig into each one of the exports.

Default: `false`

#### gitsketch.fonts.*
By default, when exporting artboards as SVG (recommended), any fonts used in that SVG can only be rendered correctly if those are available on the machine displaying it.

In the case of diffing SVG files in GitHub, they actually render an image in a sandbox on their backend.
That sandbox definitely won't have access to any custom/internal fonts you might be using in your sketch file, and the diffs GitHub renders end up being misleading.

Use this configuration section and the values below in order to direct gitsketch to _embed_ your custom fonts (if any) in the exported SVGs it generates. This makes your SVGs self-contained and consistent, regardless of where they're used. :raised_hands:

#### gitsketch.fonts.extension (string)
The extension of your custom font that needs to be embedded.

Default: `undefined`

#### gitsketch.fonts.path (string)
A path to your custom fonts folder. This is relative to your `Gruntfile.js`.

Default: `undefined`

#### gitsketch.fonts.embedPrefixes ([strings])
A list of prefixes to search for in the SVG; any font whose name begins with any of the provided prefixes will be a candidate for being embedded within the SVG.

Default: `[]`

#### gitsketch.fonts.ignorePrefixes ([strings])
A list of prefixes you wish to exclude from consideration from fonts matching the prefixes mentioned above.
This is useful in cases where your font has a fallback family/font names that don't actually map to a font file under `gitsketch.fonts.path`.

Default: `[]`
