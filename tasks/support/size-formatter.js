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

var sprint = require('sprint');

var gibi = Math.pow(2, 30);
var mebi = Math.pow(2, 20);
var kibi = Math.pow(2, 10);

function SizeFormatter(human) {
	this._human = human;
}

SizeFormatter.prototype.format = function(size) {
	if(this._human) {
		var candidate = size / gibi;

		if(candidate > 1) {
			return sprint('%.1f GiB', candidate);
		}
		candidate = size / mebi;
		if(candidate > 1) {
			return sprint('%.1f MiB', candidate);
		}

		candidate = size / kibi;
		if(candidate > 1) {
			return sprint('%.1f KiB', candidate);
		}
	}

	return sprint('%d B', size);
};

module.exports = SizeFormatter;
