/*
 * Copyright 2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jshint node:true*/
'use strict';

var fs = require('fs');
var sprint = require('sprint');
var _ = require('lodash');

module.exports = function(grunt) {

	var gibi = Math.pow(2, 30);
	var mebi = Math.pow(2, 20);
	var kibi = Math.pow(2, 10);

	function formatSize(size, human) {
		if(human) {
			var candidate = size / gibi;

			if(candidate > 1) {
				return sprint('%.1f GiB', candidate);
			}
			candidate = size / mebi;
			if (candidate > 1) {
				return sprint('%.1f MiB', candidate);
			}

			candidate = size / kibi;
			if (candidate > 1) {
				return sprint('%.1f KiB', candidate);
			}
		}

		return sprint('%d B', size);
	}

	function maxWidth(items) {
		var max = 0;

		_.each(items, function(item) {
			max = Math.max(max, item.length);
		});

		return max;
	}

	grunt.registerMultiTask('size', 'Display the size of files', function() {
		var options = this.options({
			human: true
		});

		var sizes = {};
		_.each(this.file.src, function(file) {
			sizes[file] = formatSize(fs.statSync(file).size, options.human);
		});

		var maxFileWidth = maxWidth(_.keys(sizes));
		var maxSizeWidth = maxWidth(_.values(sizes));
		var format = '%-' + (maxFileWidth + 2) + 's%' + maxSizeWidth + 's';

		_.each(sizes, function(size, file) {
			grunt.log.writeln(sprint(format, file, size));
		});
	});
};
