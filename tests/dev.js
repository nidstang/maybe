import test from 'tape';
import Maybe, * as M from '../src/maybe';
import Specs from './specs';

Specs(test)({ Maybe, ...M });
