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

var SizeBuilder = require('../../tasks/support/size-builder');

describe('A SizeBuilder', function() {
	var sizeFormatter = {
	};

	var lengthCalculator = {
	};

	var sizeBuilder;

	before(function() {
		sizeBuilder = new SizeBuilder(sizeFormatter, lengthCalculator);
	});

	it('builds a string with the names and sizes of files', function () {
		sizeFormatter.format = this.stub().returns('length');
		lengthCalculator.max = this.stub().returns(25);

		expect(sizeBuilder.build(['test/support/alpha.txt', 'test/support/bravo.txt', 'test/support/charlie.txt'])).toEqual('test/support/alpha.txt                        length\ntest/support/bravo.txt                        length\ntest/support/charlie.txt                      length\n');
	});
});
