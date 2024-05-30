'use strict';

const winkeyFs = require('..');
const assert = require('assert').strict;

assert.strictEqual(winkeyFs(), 'Hello from winkeyFs');
console.info("winkeyFs tests passed");
