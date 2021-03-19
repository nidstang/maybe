import MaybeProtocol from './protocol';

function UnwrapException(msg) {
    this.name = 'UnwrapException';
    this.message = msg;
}

const Nothing = () => ({
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
        defaultValue
    ),

    mapOrElse: (defaultF, f) => (
        defaultF()
    ),

    filter: () => Nothing(),

    andThen: () => Nothing(),

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
});

const Just = (value) => ({
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
        Maybe(fn(value))
    ),

    map2(other, f) {
        return this.zip(other).map(([a, b]) => f(a, b));
    },

    mapOr: (defaultValue, f) => (
        Maybe(f(value))
    ),

    mapOrElse: (defaultF, f) => (
        Maybe(f(value))
    ),

    filter: (fn) => (fn(value) ? Just(value) : Nothing()),

    andThen: (fn) => fn(value),

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
});

const Maybe = (value) => {
    if (value === null || value === undefined) {
        return Nothing();
    }

    return Just(value);
};

Maybe.lift = (f) => (ma) => ma.map(f);
Maybe.lift2 = (f) => (ma, mb) => ma.map2(mb, f);

Maybe.Just = value => Object.assign({}, MaybeProtocol, Just(value));
Maybe.Nothing = () => Object.assign({}, MaybeProtocol, Nothing());
Maybe.from = Maybe;

export default Maybe;
