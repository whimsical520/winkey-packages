"use strict";

const winkeyInitConfigVite = require("..");
const assert = require("assert").strict;

assert.strictEqual(winkeyInitConfigVite(), "Hello from winkeyInitConfigVite");
console.info("winkeyInitConfigVite tests passed");
