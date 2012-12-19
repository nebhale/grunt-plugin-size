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

function SizeBuilder(sizeFormatter, lengthCalculator) {
	this._sizeFormatter = sizeFormatter;
	this._lengthCalculator = lengthCalculator;
}

SizeBuilder.prototype.build = function(files) {
	var sizes = {};
	_.each(files, function(file) {
		sizes[file] = this._sizeFormatter.format(fs.statSync(file).size);
	}.bind(this));

	var maxFileWidth = this._lengthCalculator.max(_.keys(sizes));
	var maxSizeWidth = this._lengthCalculator.max(_.values(sizes));
	var format = '%-' + (maxFileWidth + 2) + 's%' + maxSizeWidth + 's\n';

	var content = '';
	_.each(sizes, function(size, file) {
		content+= sprint(format, file, size);
	});

	return content;
};

module.exports = SizeBuilder;
