const test = require('tape');
const Maybe = require('../dist/maybe.js');
const Specs = require('./specs.js');

Specs(test)(Maybe);
