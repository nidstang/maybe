/**
    * @template T
    *
    * @typedef {import('./defs/maybe').Maybe<T>} Maybe
    *
*/
import MaybeProtocol from './protocol';

function UnwrapException(msg) {
    this.name = 'UnwrapException';
    this.message = msg;
}

const fromValue = (value) => {
    if (value === null || value === undefined) {
        return Nothing();
    }

    return Just(value);
};

const lift = (f) => (ma) => ma.map(f);
const lift2 = (f) => (ma, mb) => ma.map2(mb, f);

const from = fromValue;
const of = fromValue;

const toPromise = maybe => maybe.caseof({
    Just: value => Promise.resolve(value),
    Nothing: () => Promise.reject(),
});

function Nothing() {
    return {
        isNothing: () => true,

        contains: (item) => false,

        expect(msg) {
            throw new UnwrapException(msg);
        },

        unwrap() {
            throw new UnwrapException('Tried to unwrap a Nothing value');
        },

        unwrapOr: (defaultValue) => defaultValue,

        unwrapOrElse: (f) => f(),

        withDefault: (defaultValue) => (
            defaultValue
        ),

        withDefaultFn: (fn) => (
            fn()
        ),

        map: () => (
            Nothing()
        ),

        map2: (other, f) => Nothing(),

        mapOr: (defaultValue, f) => (
            Just(defaultValue)
        ),

        mapOrElse: (defaultF, f) => (
            Just(defaultF())
        ),

        ap: (other) => (
            Nothing()
        ),

        filter: () => Nothing(),

        andThen: () => Nothing(),

        chain: () => Nothing(),

        and: (other) => Nothing(),

        or: (other) => other,

        safe: () => {},

        caseof: ({ Just, Nothing }) => {
            if (!Just || !Nothing) throw new Error('Pattern malformed');
            return Nothing();
        },

        zip: (other) => (
            Nothing()
        ),

        zipWith: (other, fn) => (
            Nothing()
        ),

        zipN: (...others) => Nothing(),
    };
}

function Just(value) {
    return {
        isNothing: () => false,

        contains: (item) => (item === value),

        expect: (msg) => value,

        unwrap: () => value,

        unwrapOr: () => value,

        unwrapOrElse: () => value,

        withDefault: () => (
            value
        ),

        withDefaultFn: () => (
            value
        ),

        map: (fn) => (
            fromValue(fn(value))
        ),

        map2(other, f) {
            return this.zip(other).map(([a, b]) => f(a, b));
        },

        mapOr: (defaultValue, f) => (
            fromValue(f(value))
        ),

        mapOrElse: (defaultF, f) => (
            fromValue(f(value))
        ),

        ap: (other) => (
            other.map(value)
        ),

        filter: (fn) => (fn(value) ? Just(value) : Nothing()),

        andThen: (fn) => fn(value),

        chain: (fn) => fn(value),

        and: (other) => (!other.isNothing() ? other : Nothing()),

        or() {
            return this;
        },

        safe: (fn) => (
            fn(value)
        ),

        caseof: ({ Just, Nothing }) => {
            if (!Just || !Nothing) {
                throw new Error('Pattern malformed');
            }
            return Just(value);
        },

        zip: (other) => (
            other.map((otherValue) => ([value, otherValue]))
        ),

        zipWith(other, fn) {
            return this.zip(other).map(fn);
        },
    };
}

const Maybe = fromValue;

export {
    fromValue,
    Just,
    Nothing,
    lift,
    lift2,
    from,
    of,
    toPromise,
};

export default Maybe;
