import MaybeProtocol from './protocol';

function UnwrapException(msg) {
    this.name = 'UnwrapException';
    this.message = msg;
}

const Nothing = () => ({
    isNothing: () => true,

    contains: (item) => false,

    expects(msg) {
        throw new UnwrapException(msg);
    },

    unwraps() {
        throw new UnwrapException('Tried to unwrap a Nothing value');
    },

    unwrapsOr: (defaultValue) => defaultValue,

    withDefault: (defaultValue) => (
        defaultValue
    ),

    withDefaultFn: (fn) => (
        fn()
    ),

    map: () => (
        Nothing()
    ),

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
});

const Just = (value) => ({
    isNothing: () => false,

    contains: (item) => (item === value),

    expects: (msg) => value,

    unwraps: () => value,

    unwrapsOr: () => value,

    withDefault: () => (
        value
    ),

    withDefaultFn: () => (
        value
    ),

    map: (fn) => (
        Maybe(fn(value))
    ),

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

Maybe.Just = value => Object.assign({}, MaybeProtocol, Just(value));
Maybe.Nothing = () => Object.assign({}, MaybeProtocol, Nothing());
Maybe.from = Maybe;

export default Maybe;
