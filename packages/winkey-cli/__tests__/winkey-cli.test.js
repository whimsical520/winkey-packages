'use strict'

const winkeyCli = require('..')
const assert = require('assert').strict

assert.strictEqual(winkeyCli(), 'Hello from winkeyCli')
console.info('winkeyCli tests passed')
