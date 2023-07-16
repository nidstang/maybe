const test = require('tape');
const M = require('../dist/maybe.js');
const Specs = require('./specs.js');

const Maybe = M.default;

Specs(test)({ Maybe, ...M });
