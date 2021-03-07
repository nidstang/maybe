import MaybeProtocol from './protocol';

const Nothing = () => Object.assign({}, MaybeProtocol, {
    isNothing: () => true,

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

const Just = (value) => Object.assign({}, MaybeProtocol, {
    isNothing: () => false,

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

Maybe.Just = Just;
Maybe.Nothing = Nothing;
Maybe.from = Maybe;

export default Maybe;
