import test from 'tape';
import Maybe from '../src/maybe';

test('Maybe factory', (t) => {
    {
        const m = Maybe();
        t.same(m.isNothing(), true, 'Given a nullable to Maybe, m.isNothing() must return true');
    }

    {
        const m = Maybe(1);
        t.same(m.isNothing(), false, 'Given a number to Maybe, m.isNothing() must return false');
    }

    t.end();
});

test('Maybe.Just', (t) => {
    const m = Maybe.Just(1);
    t.same(m.isNothing(), false, 'Given a number to Maybe.Just, m.isNothing() must return false');

    t.end();
});

test('Maybe.Nothing', (t) => {
    const m = Maybe.Nothing();
    t.same(m.isNothing(), true, 'Given a number to Maybe.Nothing, m.isNothing() must return true');

    t.end();
});

test('Maybe.from', (t) => {
    {
        const m = Maybe.from(undefined);
        t.same(m.isNothing(), true, 'Given an undefined to Maybe.from, m.isNothing() must return true');
    }

    {
        const m = Maybe.from(false);
        t.same(m.isNothing(), false);
        const value = m.withDefault('hello');
        t.same(value, false, 'Given a boolean False, the unwrapped value must be False');
    }

    {
        const m = Maybe.from(0);
        t.same(m.isNothing(), false, 'Given a falsy value 0, isNothing must be False');
    }
    t.end();
});

test('map', (t) => {
    {
        const result = Maybe.Just(2)
            .map((val) => val * val)
            .withDefault(0);

        t.same(result, 4, 'Given a Just(2) and a function, map should apply the function to maybe');
    }
    {
        const a1 = Maybe(1);
        const a2 = 1;

        const result = a1.map((x) => x + a2);

        t.same(result.withDefault(0), 2, 'Given a Maybe(1) and a function, map should apply the function to maybe');
    }

    {
        const a1 = Maybe.from(1);
        const test = x => null;

        const res = a1.map(test);

        t.same(res.isNothing(), true, 'Given a Just(1) and a function that produces a null value, map should return a Nothing');
    }

    t.end();
});

test('mapOr', (t) => {
    const double = x => x * 2;

    {
        const m = Maybe.Nothing();
        const res = m.mapOr(0, double);

        t.same(res, 0, 'Given a Nothing, a defaultValue and a function, mapOr must return defaultValue');
    }

    {
        const m = Maybe.Just(1);
        const res = m.mapOr(0, double);

        res.map(value => (
            t.same(value, 2, 'Given a Just, a defaultValue and a function, mapOr must return Just(f(value))')
        ));
    }

    t.end();
});

test('mapOr', (t) => {
    const double = x => x * 2;
    const defaultVal = () => 0;

    {
        const m = Maybe.Nothing();
        const res = m.mapOrElse(defaultVal, double);

        t.same(res, 0, 'Given a Nothing, a default function and a function, mapOrElse must return default()');
    }

    {
        const m = Maybe.Just(1);
        const res = m.mapOrElse(defaultVal, double);

        res.map(value => (
            t.same(value, 2, 'Given a Just, a default function  and a function, mapOrElse must return Just(f(value))')
        ));
    }

    t.end();
});

test('safe', (t) => {
    const m = Maybe('Hello');
    const result = m.safe((value) => `${value} world`);

    t.same(result, 'Hello world', 'Given a Maybe and a function, safe must apply the maybe to that function');

    t.end();
});

test('caseof', (t) => {
    {
        const m = Maybe(10);
        let result = '';
        m.caseof({
            Just: () => {
                result = 'Just value';
            },
            Nothing: () => {
                result = 'Nothing';
            },
        });

        t.same(result, 'Just value', 'Given a Maybe and a just-nothing pattern, caseof must call the correct function');
    }

    {
        const m = Maybe(2);
        const re = m.caseof({
            Just: (value) => value * 4,
            Nothing: () => 10,
        });

        t.same(re, 8, 'Given a Maybe and a just-nothing pattern, caseof must call the correct function and give the value back');
    }

    {
        const m = Maybe(2);
        try {
            m.caseof({
                Just: () => 10,
            });
            t.fail();
        } catch (ex) {
            t.pass('Given a Maybe and a invalid just-nothing pattern, caseof must throw an malformed exception');
        }
    }

    t.end();
});
test('andThen', (t) => {
    {
        const res = Maybe.Just(1)
            .andThen((value) => Maybe.Just(value * 2))
            .andThen(() => Maybe.Just('Hello world'));

        t.same(res.isNothing(), false);
        t.same(res.withDefault(0), 'Hello world', 'Given a Just and a function that returns a Maybe, andThen must apply that function to Just');
    }

    {
        const res = Maybe.Just(1)
            .andThen(() => Maybe.Nothing())
            .andThen(() => Maybe.Just('Hello world'));

        t.same(res.isNothing(), true);
        t.same(res.withDefault(0), 0, 'Given a Nothing and a function that returns a Maybe, andThe must not apply the function');
    }

    t.end();
});

test('filter', (t) => {
    {
        const res = Maybe.from(1)
            .map((x) => x * 2)
            .filter((x) => x > 2)
            .withDefault(0);

        t.same(res, 0, 'Given a Maybe and a predicate function, filter must return Nothing if the predicate is not fulfilled');
    }

    {
        const res = Maybe.from(2)
            .map((x) => x * 2)
            .filter((x) => x > 2)
            .withDefault(0);

        t.same(res, 4, 'Given a Maybe and a predicate function, filter must return Just if the predicate is fulfilled');
    }

    {
        const res = Maybe.from([])
            .filter((arr) => arr.length !== 0)
            .filter((arr) => arr.slice(1, 2))
            .withDefault(0);

        t.same(res, 0, 'Given a Maybe with an Array and a predicate function, filter must return Nothing if the predicate is not fulfilled');
    }

    t.end();
});

test('zip', (t) => {
    {
        const m = Maybe.Nothing();
        const m2 = Maybe.Nothing();

        t.same(m.zip(m2).isNothing(), true, 'Given two Nothing, zip must return Nothing');
    }
    {
        const m = Maybe.Nothing();
        const m2 = Maybe.Just(1);

        t.same(m.zip(m2).isNothing(), true, 'Given a Nothing and a (Just 1), zip must return Nothing');
    }

    {
        const m = Maybe.Just(1);
        const m2 = Maybe.Nothing();

        t.same(m.zip(m2).isNothing(), true, 'Given a (Just 1) and a Nothing, zip must return Nothing');
    }

    {
        const m = Maybe.Just(1);
        const m2 = Maybe.Just(true);

        const res = m.zip(m2);

        const check = (tuple) => {
            t.same(tuple, [1, true], 'Given two Just, zip must return a tuple with both values inside of a new Maybe');
        };

        res.map(check);
    }

    t.end();
});

test('zipWith', (t) => {
    const combine = (([a, b]) => a + b);

    {
        const m = Maybe.Nothing();
        const m2 = Maybe.Nothing();

        t.same(m.zipWith(m2, combine).isNothing(), true, 'Given two Nothing, zipWith must return Nothing');
    }
    {
        const m = Maybe.Nothing();
        const m2 = Maybe.Just(1);

        t.same(m.zipWith(m2, combine).isNothing(), true, 'Given a Nothing and a (Just 1), zipWith must return Nothing');
    }

    {
        const m = Maybe.Just(1);
        const m2 = Maybe.Nothing();

        t.same(m.zipWith(m2, combine).isNothing(), true, 'Given a (Just 1) and a Nothing, zipWith must return Nothing');
    }

    {
        const m = Maybe.Just(2);
        const m2 = Maybe.Just(2);

        const res = m.zipWith(m2, combine);

        const check = (value) => {
            t.same(value, 4, 'Given two Just(2), zipWith must return the result of applying f(this.zip) inside of a new Maybe');
        };

        res.map(check);
    }

    t.end();
});

test('and', t => {
    {
        const m = Maybe.Nothing();
        t.same(m.and(Maybe.Nothing()).isNothing(), true, 'Given a Nothing self and an Nothing other, `and` must return Nothing');
    }

    {
        const m = Maybe.Nothing();
        t.same(m.and(Maybe.Just(1)).isNothing(), true, 'Given a Nothing self and a Just other, `and` must return Nothing');
    }

    {
        const m = Maybe.Just(1);
        t.same(m.and(Maybe.Nothing()).isNothing(), true, 'Given a Just self and a Nothing other, `and` must return Nothing');
    }

    {
        const m = Maybe.Just(1);
        t.same(m.and(Maybe.Just(2)).isNothing(), false, 'Given a Just self and a Just other, `and` must return Just');
    }

    {
        const m = Maybe.Just(1);
        t.same(m.and(Maybe.Just(2)).withDefault(0), 2, 'Given a Just self and a Just 2 other, `and` must return other Just');
    }

    t.end();
});

test('or', t => {
    {
        const m = Maybe.Nothing();
        t.same(m.or(Maybe.Nothing()).isNothing(), true, 'Given a Nothing self and an Nothing other, `or` must return Nothing');
    }

    {
        const m = Maybe.Nothing();
        t.same(m.or(Maybe.Just(1)).withDefault(0), 1, 'Given a Nothing self and an Just(1), `or` must return Just(1)');
    }

    {
        const m = Maybe.Just(2);
        t.same(m.or(Maybe.Nothing()).withDefault(0), 2, 'Given a Just(2) and a Nothing, `or` must return Just(2)');
    }

    {
        const m = Maybe.Just(2);
        t.same(m.or(Maybe.Just(3)).withDefault(0), 2, 'Given a Just(2) and a Just(3) `or` must return Just(2)');
    }

    t.end();
});

test('contains', t => {
    {
        const m = Maybe.Nothing();
        t.same(m.contains(1), false, 'Given a Nothing and a 1, `contains` must return `false` since 1 is not in the maybe');
    }

    {
        const m = Maybe.Just(1);
        t.same(m.contains(1), true, 'Given a Just(1) and a 1, `contains` must return `true` since 1 is inside of');
    }

    {
        const m = Maybe.Just(1);
        t.same(m.contains(2), false, 'Given a Just(1) and a 2, `contains` must return `false` since 1 is not inside of');
    }

    t.end();
});
