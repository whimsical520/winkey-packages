"use strict";

const winkeyInitProjectSeedNpm = require("..");
const assert = require("assert").strict;

assert.strictEqual(
  winkeyInitProjectSeedNpm(),
  "Hello from winkeyInitProjectSeedNpm"
);
console.info("winkeyInitProjectSeedNpm tests passed");
