module.exports = test => Maybe => {
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

    test('Maybe.of', (t) => {
        {
            const m = Maybe.of(undefined);
            t.same(m.isNothing(), true, 'Given an undefined to Maybe.of, m.isNothing() must return true');
        }

        {
            const m = Maybe.of(false);
            t.same(m.isNothing(), false);
            const value = m.withDefault('hello');
            t.same(value, false, 'Given a boolean False, the unwrapped value must be False');
        }

        {
            const m = Maybe.of(0);
            t.same(m.isNothing(), false, 'Given a falsy value 0, isNothing must be False');
        }
        t.end();
    });

    test('Maybe.toPromise', (t) => {
        {
            const m = Maybe.of(1);
            const p = Maybe.toPromise(m);

            p.then((value) => {
                t.same(value, 1, 'Given a Just, toPromise must return a resolved promise');
            });
        }

        {
            const m = Maybe.of();
            const p = Maybe.toPromise(m);

            p.catch(() => {
                t.pass('Given a Nothing, toPromise must return a rejected promise');
            })
            .finally(() => t.end());
        }
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

            res.map(value => (
                t.same(value, 0, 'Given a Nothing, a defaultValue and a function, mapOr must return defaultValue')
            ));
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

    test('mapOrElse', (t) => {
        const double = x => x * 2;
        const defaultVal = () => 0;

        {
            const m = Maybe.Nothing();
            const res = m.mapOrElse(defaultVal, double);

            res.map(value => (
                t.same(value, 0, 'Given a Nothing, a default function and a function, mapOrElse must return default()')
            ));
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

    test('ap', (t) => {
        {
            const m = Maybe.Nothing();
            const type = Maybe.Just(1);
            const res = m.ap(type);

            t.same(res.isNothing(), true, 'Given a Nothing, ap to other maybe must return Nothing');
        }

        {
            const double = x => x * 2;
            const m = Maybe.Just(double);
            const type = Maybe.Just(2);
            const res = m.ap(type);

            res.map(value => (
                t.same(value, 4, 'Given a Just(double), ap to other maybe must apply the function inside to the type passed')
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
            t.same(res.withDefault(0), 0, 'Given a Nothing and a function that returns a Maybe, andThen must not apply the function');
        }

        t.end();
    });

    test('chain', (t) => {
        {
            const res = Maybe.Just(1)
                .chain((value) => Maybe.Just(value * 2))
                .chain(() => Maybe.Just('Hello world'));

            t.same(res.isNothing(), false);
            t.same(res.withDefault(0), 'Hello world', 'Given a Just and a function that returns a Maybe, chain must apply that function to Just');
        }

        {
            const res = Maybe.Just(1)
                .chain(() => Maybe.Nothing())
                .chain(() => Maybe.Just('Hello world'));

            t.same(res.isNothing(), true);
            t.same(res.withDefault(0), 0, 'Given a Nothing and a function that returns a Maybe, chain must not apply the function');
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

    test('expect', t => {
        {
            const m = Maybe.Nothing();

            try {
                const value = m.expect('There is not value');
                t.fail();
            } catch (e) {
                t.same(e.name, 'UnwrapException', 'Given a Nothing and a msg, `expect` must raise an UnwrapException');
            }
        }

        {
            const m = Maybe.Nothing();

            try {
                const value = m.expect('There is not value');
                t.fail('Given a Nothing, `expects` must raise an exception');
            } catch (e) {
                t.same(e.message, 'There is not value', 'Given a Nothing and a msg, `expect` must raise an UnwrapException with the given msg');
            }
        }

        {
            const m = Maybe.Just('hello world');

            try {
                const value = m.expect('There is not value');
                t.same(value, 'hello world', 'Given a Just and a msg, `expect` must return the wrapped value');
            } catch (e) {
                t.fail('Given a Just, `expect` must not raise an exception');
            }
        }

        t.end();
    });

    test('unwrap', t => {
        {
            const m = Maybe.Nothing();

            try {
                const value = m.unwrap();
                t.fail();
            } catch (e) {
                t.same(e.name, 'UnwrapException', 'Given a Nothing, `unwrap` must raise an UnwrapException');
            }
        }

        {
            const m = Maybe.Nothing();

            try {
                const value = m.unwrap();
                t.fail('Given a Nothing, `unwrap` must raise an exception');
            } catch (e) {
                t.same(e.message, 'Tried to unwrap a Nothing value', 'Given a Nothing, `unwraps` must raise an UnwrapException');
            }
        }

        {
            const m = Maybe.Just('hello world');

            try {
                const value = m.unwrap('There is not value');
                t.same(value, 'hello world', 'Given a Just and a msg, `unwrap` must return the wrapped value');
            } catch (e) {
                t.fail('Given a Just, `unwraps` must not raise an exception');
            }
        }

        t.end();
    });

    test('unwrapOr', t => {
        {
            const m = Maybe.Nothing();
            t.same(m.unwrapOr(2), 2, 'Given a Nothing maybe and a default value of 2, `unwrapOr` must return 2');
        }

        {
            const m = Maybe.Just(2);
            t.same(m.unwrapOr(1), 2, 'Given a Just() maybe and a default value of 1, `unwrapOr` must return 2');
        }

        t.end();
    });

    test('unwrapOrElse', t => {
        {
            const m = Maybe.Nothing();
            t.same(m.unwrapOrElse(() => 2), 2, 'Given a Nothing maybe and a function which computes to 2, `unwrapOr` must return 2');
        }

        {
            const m = Maybe.Just(2);
            t.same(m.unwrapOrElse(() => 1), 2, 'Given a Just() maybe a function which computes to 1, `unwrapOr` must return 2');
        }

        t.end();
    });

    test('withDefault', t => {
        {
            const m = Maybe.Nothing();
            t.same(m.withDefault(2), 2, 'Given a Nothing maybe and a default value of 2, `withDefault` must return 2');
        }

        {
            const m = Maybe.Just(2);
            t.same(m.withDefault(1), 2, 'Given a Just()  maybe and a default value of 1, `withDefault` must return 2');
        }

        t.end();
    });

    test('map2', t => {
        const add = (a, b) => a + b;

        {
            const m = Maybe.Nothing();
            t.same(m.map2(Maybe.Just(1), add).isNothing(), true, 'Given a Nothing, a Just and a f, map2 must return Nothing');
        }

        {
            const m = Maybe.Just(1);
            t.same(m.map2(Maybe.Nothing(), add).isNothing(), true, 'Given a Just, a Nothing and a f, map2 must return Nothing');
        }

        {
            const m = Maybe.Just(1);
            const res = m.map2(Maybe.Just(2), add);
            t.same(res.isNothing(), false, 'Given a Just, another Just and a f, map2 must return Just');
            t.same(res.unwrapOr(0), 3, 'Given a Just 1, Just 2 and an add function, map2 must return a Just with the result within');
        }

        t.end();
    });

    test('Maybe.lift', t => {
        const m1 = Maybe.Just(1);
        const nothing = Maybe.Nothing();
        const double = x => x * 2;
        const liftedF = Maybe.lift(double);

        {
            const res = liftedF(m1);

            t.same(res.contains(2), true, 'Given a Just 1, liftedF must contain 2');
        }

        {
            const res = liftedF(nothing);

            t.same(res.isNothing(), true, 'Given a Nothing, liftedF must return Nothing');
        }

        t.end();
    });

    test('Maybe.lift2', t => {
        const m1 = Maybe.Just(2);
        const nothing = Maybe.Nothing();
        const add = (a, b) => a + b;
        const liftedF = Maybe.lift2(add);

        {
            const res = liftedF(m1, m1);

            t.same(res.contains(4), true, 'Given a Just 2 and a Just 2, liftedF must contain 4');
        }

        {
            const res = liftedF(nothing, nothing);

            t.same(res.isNothing(), true, 'Given a Nothing and another Nothing, liftedF must return Nothing');
        }

        {
            const res = liftedF(nothing, m1);

            t.same(res.isNothing(), true, 'Given a Nothing and Just, liftedF must return Nothing');
        }

        {
            const res = liftedF(m1, nothing);

            t.same(res.isNothing(), true, 'Given a Just and a Nothing, liftedF must return Nothing');
        }

        t.end();
    });
};
