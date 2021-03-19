global.window = {}; // simulate a browser

const test = require('tape');
const Maybe = require('../dist/maybe.js').default;
const Specs = require('./specs.js');

Specs(test)(Maybe);
