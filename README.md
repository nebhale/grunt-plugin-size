# grunt-plugin-buster [![Build Status](https://secure.travis-ci.org/nebhale/grunt-plugin-buster.png?branch=master)](http://travis-ci.org/nebhale/grunt-plugin-buster)

> Display the size of files

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-plugin-size --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-plugin-size');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## Buster task
_Run this task with the `grunt size` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks

This task displays the sizes of files.

### Options

#### `human`
Type: `boolean`
Default: `true`

This option sets whether the file size should be displayed in human-readable sizes (GiB, MiB, KiB) or in raw bytes.

### Usage Examples

#### Typical

Typical configuration is simply to identify a collection of files to be listed:

```js
size: {
	app: ['build/*.*']
}
```

This configuration would result in:

```bash
build/index.html     5.8 KiB
build/app.min.css   24.0 KiB
build/app.min.js   104.8 KiB
```

#### Non-human Readable

If the log needed to be parsed by a script, the size plugin might be configured to output in a non-human-readable format:

```js
size: {
	app: ['build/*.*'],
	options: {
		human: false
	}
}
```

This configuration would result in:

```bash
build/index.html     5936 B
build/app.min.css   24537 B
build/app.min.js   107302 B
```
