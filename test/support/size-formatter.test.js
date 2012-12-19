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

var buster = require('buster');
var before = buster.spec.before;
var describe = buster.spec.describe;
var expect = buster.assertions.expect;
var it = buster.spec.it;

var SizeFormatter = require('../../tasks/support/size-formatter');

var gibi = Math.pow(2, 30);
var mebi = Math.pow(2, 20);
var kibi = Math.pow(2, 10);

describe('A SizeFormatter', function() {

	var sizeFormatter;

	before(function() {
		sizeFormatter = new SizeFormatter(true);
	});

	it('prints bytes if non-human', function() {
		var alternateSizeFormatter = new SizeFormatter(false);
		expect(alternateSizeFormatter.format(1.5 * gibi, false)).toEqual('1610612736 B');
	});

	it('prints B if less than 1 KiB', function() {
		expect(sizeFormatter.format(512, true)).toEqual('512 B');
	});

	it('prints KiB if less than 1 MiB and more than 1 KiB', function() {
		expect(sizeFormatter.format(1.5 * kibi, true)).toEqual('1.5 KiB');
	});

	it('prints MiB if less than 1 GiB and more than 1 MiB', function() {
		expect(sizeFormatter.format(1.5 * mebi, true)).toEqual('1.5 MiB');
	});

	it('prints GiB if more than 1 GiB', function() {
		expect(sizeFormatter.format(1.5 * gibi, true)).toEqual('1.5 GiB');
	});
});
