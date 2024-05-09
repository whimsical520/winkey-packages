'use strict';

const winkeyLog = require('..');
const assert = require('assert').strict;

assert.strictEqual(winkeyLog(), 'Hello from winkeyLog');
console.info("winkeyLog tests passed");
