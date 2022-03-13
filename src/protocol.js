function abstract(method) {
    return function inner() {
        throw new Error(`${method} must be implemented`);
    };
}

/**
 * It returns 'true' if the maybe is Just
 *
 * @return {boolean} true if the wrapped value is Just, false otherwise
 */
const isNothing = abstract('isNothing');

/**
 * It returns `true` if `self` is Just containing the given value
 *
 * contains : Maybe a -> b -> Boolean
 *
 * @param {*} item - the value to check with
 * @return {Boolean} `true` if value is the same as the item inside the maybe if this is Some
 *
 */
const contains = abstract('contains');

/**
 * Because this function may panic, its use is discouraged
 * Instead, prefer to handle the Nothing case explicitily, or use unwrapOr, unwrapOrElse,
 * or withDefault
 *
 * It returns the wrapped Just value if it's Just. Otherwise rises an UnwrapException
 *
 * (!) impure function
 * (!) a try/catch is a must to use this function!
 *
 * @param {string} msg - message for UnwrapException
 * @return {*} the wrapped value if it's Just
 * @throws {UnwrapException} msg
 *
 */
const expect = abstract('expect');

/**
 * Because this function may panic, its use is discouraged
 * Instead, prefer to handle the Nothing case explicitily, or use unwrapOr, unwrapOrElse,
 * or withDefault
 *
 * It returns the wrapped Just value if it's Just. Otherwise rises an UnwrapException
 *
 * (!) impure function
 * (!) a try/catch is a must to use this function!
 *
 * @return {*} the wrapped value if it's Just
 * @throws {UnwrapException} Tried to unwrap a Nothing value
 *
 */
const unwrap = abstract('unwrap');

/**
 * It returns the wrapped Just value or a provided default
 * Arguments passed to map_or are eagerly evaluated;
 * if you are passing the result of a function call,
 * it is recommended to use unwrapOrElse, which is lazily evaluated.
 *
 * unwrapOr : Maybe a -> b -> c
 *
 * @param {*} defaultValue - default value to be returned if the maybe is Nothing
 * @return {*} value if maybe is Just. Otherwise default is returned
 *
 */
const unwrapOr = abstract('unwrapOr');

/**
 * It returns the wrapped Just value or computes it from f
 *
 * unwrapOrElse : Maybe a -> (b) -> c
 *
 * @param {Function} f - for computing a default value if maybe is Nothing
 * @return {*} value if maybe is Just. Otherwise computes defaultValue from f
 *
 */
const unwrapOrElse = abstract('unwrapOrElse');

/**
 * @deprecated favor unwrapOr
 * It unwraps the value if the maybe is Just and returns it. Otherwise it returns defaultValue
 *
 * withDefault : Maybe a -> a -> b
 *
 * @param {*} defaultValue - the value for returning if maybe is Nothing
 * @return {*} value
 */
const withDefault = abstract('withDefault');

/**
 * @deprecated
 * It unwraps the value if the maybe is Just and returns it.
 * Otherwise it calls fn and return its result
 *
 * withDefaultFn : Maybe a -> (a -> b) -> c
 *
 * @param {Function} f - the function to get the default value
 * @return {*} value
 */
const withDefaultFn = abstract('withDefaultFn');

/**
 * Maps a `Maybe a` (this) to `Maybe b` by applying a function to a wrapped value
 *
 * map : Maybe a -> (a -> b) -> Maybe b
 *
 * @param {Function} f - function to apply
 * @return {Maybe} Maybe(f(value)) if maybe is `Just`. Otherwise `Nothing`
 *
 */
const map = abstract('map');

/**
 * If there is a wrapped value, it applies a function to it.
 * Otherwise it returns the provide default
 *
 * Arguments passed to map_or are eagerly evaluated;
 * if you are passing the result of a function call,
 * it is recommended to use mapOrElse, which is lazily evaluated.
 *
 * mapOr : Maybe a -> b -> (a -> b) -> Maybe b
 *
 * @param {*} defaultValue - the value to put into a Just if Maybe a is Nothing
 * @param {Function} f - function to apply if Maybe is Just
 * @return {Maybe} `Just(f(value))` if maybe is `Just(value)` else `Just(defaultValue)`
 *
 */
const mapOr = abstract('mapOr');

/**
 * Applies a function to a wrapped value if any.
 * Otherwise computes a default value and put it into a Just
 *
 * mapOrElse : Maybe a -> (b) -> (a -> b) -> Maybe b
 *
 * @param {Function} default - the function to compute a default value and put it into a Just
 * @param {Function} f - function to apply to if Maybe a is Just
 * @return {Maybe} `Just(f(value))` if maybe is `Just(value)` else `Just(default())`
 */
const mapOrElse = abstract('mapOrElse');

/**
 * Applies f to `this` and other.
 * This is an alias over zip and then apply a two params function
 *
 * map2 : Maybe a -> Maybe b -> (a -> b -> c) -> Maybe c
 *
 * @param {Maybe} other - other maybe to be passed to f
 * @param {Function} f - two params function to apply to
 * @return {Maybe} Just(f(value, other.value)) if maybe is Just else Nothing
 *
 */
const map2 = abstract('map2');

/**
 * Applies a function inside of a Maybe to another Maybe
 * This function could be used to lift regular functions to Maybe.
 * Since functions are first-class citizen, they can be used as values too.
 *
 * Lift example:
 *
 * ```javascript
 * const lift2 = f => (m1, m2) => Maybe.of(f).ap(m1).ap(m2);
 * const add = a => b => a + b; // important! f must be curried
 *
 * const addLifted = lift2(add);
 *
 * addLifted(Maybe.of(1), Maybe.of(2)) // Just(3)
 *
 * // or you can use Ramda
 *
 * const addLifted = R.lift(add);
 *
 * ```
 *
 * ap : (a -> b) -> Maybe a -> Maybe b
 *
 * @param {Maybe} other - other maybe to be applied to Maybe(a -> b)
 * @return {Maybe} a Just with the result of applying the function
 * inside of a Maybe to value of other else Nothing
 *
 */
const ap = abstract('ap');

/**
 * Filters a `Maybe a` (this) by applying a function to a wrapped value
 * that matchs the predicate
 *
 * filter : Maybe a -> (a -> Bool) -> Maybe a
 *
 * @param {Function} f - predicate function to filter a `Maybe a`
 * @return {Maybe} Just(value) if fn(value) is true. Otherwise `Nothing`
 *
 */
const filter = abstract('filter');

/**
 * Flat maps a `Maybe a` to `Maybe b` by applying a function
 * that returns a Maybe to a wrapped value
 *
 * andThen : Maybe a -> (a -> Maybe b) -> Maybe b
 *
 * @param {Function} f - function to apply that returns a Maybe
 * @return {Maybe} Just(f(value)) if maybe is `Just`. Otherwise `Nothing`
 *
 */
const andThen = abstract('andThen');

/**
 * This function is just an andThen alias
 * Flat maps a `Maybe a` to `Maybe b` by applying a function
 * that returns a Maybe to a wrapped value
 *
 * chain : Maybe a -> (a -> Maybe b) -> Maybe b
 *
 * @param {Function} f - function to apply that returns a Maybe
 * @return {Maybe} Just(f(value)) if maybe is `Just`. Otherwise `Nothing`
 *
 */
const chain = abstract('chain');

/**
 * It returns Nothing if other is Nothing. Otherwise it returns `other`
 *
 * and : Maybe a -> Maybe b -> Maybe b
 *
 * @param {Maybe} other - the maybe to return if `this` and `other` are Just value
 * @return {Maybe} other if either self and `other` are Just and Nothing if the're not
 *
 */
const and = abstract('and');

/**
 * Returns `this` maybe if it contains a value. Otherwise returns other
 *
 * or : Maybe a -> Maybe  b -> Maybe c
 *
 * @param {Maybe} other - the maybe to return if `this` is Nothing
 * @return {Maybe} other if the `this` maybe is Nothing. `this` otherwise
 */
const or = abstract('or');

/**
 * @deprecated since 3.0.0
 * Just like flat map but you may not need to use the value returned
 *
 * safe : Maybe a -> (a -> b) -> b
 *
 * @param {Function} f - function to apply
 * @return {*} - value
 *
 */
const safe = abstract('safe');

/**
 * It uses to unwraps a value from a `Maybe a` but you will force to define
 * what to do in both Just(value) and Nothing
 * caseof takes a just-nothing pattern which is an object and looks like:
 * { Just : (a -> b), Nothing: (b) }
 *
 * caseof : Maybe a -> ({ Just: (a -> b), Nothing: (b) }) -> b
 *
 * withDefault function can be made from caseof:
 *
 * ```javascript
 * const withDefault = maybe => defaultValue => caseof({
 *   Just: value => value,
 *   Nothing: () => defaultValue,
 * });
 *
 * ```
 *
 * @param {object} object - just-nothing object pattern
 * @return {*} value
 *
 */
const caseof = abstract('caseof');

/**
 * Zips `this` with another Maybe
 *
 * zip : Maybe a -> Maybe b -> Maybe([a, b])
 *
 * @param {Maybe} maybe - to zip with
 *
 * @return {Maybe} if `Maybe a` and `Maybe b` are Just, it returns `Maybe [a, b]`
 * Otherwise returns Nothing
 *
 */
const zip = abstract('zip');

/**
 * Zips this and another Maybe with function f
 *
 * zipWith : Maybe a -> Maybe b -> ([a, b] -> c) -> Maybe c
 *
 * @param {Maybe} maybe - to zip with
 * @param {Function} f - to apply to the zipped maybe values
 *
 * @return {Maybe} If this is `Just a` and other is `Just b`,
 * it returns `Maybe(f([a, b]))`
 *
 */
const zipWith = abstract('zipWith');

/**
 * It lifts an unary function that works with `a` type to `Maybe a` and `Maybe b`
 *
 * Maybe.lift : (a -> b) -> (Maybe a -> Maybe b)
 *
 * @param {Function} f - the unary function to lift
 * @return {Function} the unary lifted function
 */
const lift = abstract('lift');

/**
 * It lifts a binary function that works with `a` and `b` types to `Maybe a`, `Maybe b` `Maybe c`
 *
 * Maybe.lift : (a -> b -> c) -> (Maybe a -> Maybe b -> Maybe c)
 *
 * @param {Function} f - the binary function to lift
 * @return {Function} the lifted binary function
 */
const lift2 = abstract('lift2');

export default {
    isNothing,
    contains,
    expect,
    unwrap,
    unwrapOr,
    unwrapOrElse,
    withDefault,
    withDefaultFn,
    map,
    mapOr,
    mapOrElse,
    map2,
    filter,
    andThen,
    and,
    or,
    safe,
    caseof,
    zip,
    zipWith,
};
