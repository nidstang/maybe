const test = require('tape');
const Maybe = require('../dist/maybe.node.js').default;
const Specs = require('./specs.js');

Specs(test)(Maybe);
