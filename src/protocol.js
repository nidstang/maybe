function abstract(method) {
    return function inner() {
        throw new Error(`${method} must be implemented`);
    };
}

export default {
    /*
     * It returns 'true' if the maybe is Just
     *
     * @return {boolean} - true if the wrapped value is Just, false otherwise
     */
    isNothing: abstract('isNothing'),

    /*
     * It returns `true` if `self` is Just containing the given value
     *
     * contains : Maybe a -> b -> Boolean
     *
     * @param {*} item - the value to check with
     * @return {Boolean} - `true` if value is the same as the item inside the maybe if this is Some
     *
     */
    contains: abstract('contains'),

    /*
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
    expect: abstract('expect'),

    /*
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
    unwrap: abstract('unwrap'),

    /*
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
    unwrapOr: abstract('unwrapOr'),

    /*
     * It returns the wrapped Just value or computes it from f
     *
     * unwrapOrElse : Maybe a -> (b) -> c
     *
     * @param {Function} f for computing a default value if maybe is Nothing
     * @return {*} value if maybe is Just. Otherwise computes defaultValue from f
     *
     */
    unwrapOrElse: abstract('unwrapOrElse'),

    /*
     * @deprecated favor unwrapOr
     * It unwraps the value if the maybe is Just and returns it. Otherwise it returns defaultValue
     *
     * withDefault : Maybe a -> a -> b
     *
     * @param {*} defaultValue - the value for returning if maybe is Nothing
     * @return {*} value
     */
    withDefault: abstract('withDefault'),

    /*
     * It unwraps the value if the maybe is Just and returns it.
     * Otherwise it calls fn and return its result
     *
     * withDefaultFn : Maybe a -> (a -> b) -> c
     *
     * @param {Function} f - the function to get the default value
     * @return {*} value
     */
    withDefaultFn: abstract('withDefaultFn'),

    /*
     * Maps a `Maybe a` (this) to `Maybe b` by applying a function to a wrapped value
     *
     * map : Maybe a -> (a -> b) -> Maybe b
     *
     * @param {Function} f - function to apply
     * @return {Maybe} - Maybe(f(value)) if maybe is `Just`. Otherwise `Nothing`
     *
     */
    map: abstract('map'),

    /*
     * If there is a wrapped value, it applies a function to it.
     * Otherwise it returns the provide default
     *
     * Arguments passed to map_or are eagerly evaluated;
     * if you are passing the result of a function call,
     * it is recommended to use mapOrElse, which is lazily evaluated.
     *
     * mapOr : Maybe a -> b -> (a -> b) -> b
     *
     * @param {*} defaultValue - the value to return if Maybe a is Nothing
     * @param {Function} f - function to apply if Maybe a is Just
     * @return {*} - `Just(f(value))` if maybe is `Just(value)` else `defaultValue`
     *
     */
    mapOr: abstract('mapOr'),

    /*
     * Applies a function to a wrapped value if any. Otherwise computes a default value
     *
     * mapOrElse : Maybe a -> (b) -> (a -> b) -> b
     *
     * @param {Function} default - the function to compute a default value
     * @param {Function} f - function to apply to if Maybe a is Just
     * @return {*} `Just(f(value))` if maybe is `Just(value)` else `default()`
     */
    mapOrElse: abstract('mapOrElse'),

    /*
     * Applies f to `this` and other
     * This is an alias over zip and then apply a two params function
     *
     * map2 : Maybe a -> Maybe b -> (a -> b -> c) -> Maybe c
     *
     * @param {Maybe} other - other maybe to be passed to f
     * @param {Function} f - two params function to apply to
     * @return {Maybe} Just(f(value, other.value)) if maybe is Just else Nothing
     *
     */
    map2: abstract('map2'),

    /*
     * Filters a `Maybe a` (this) by applying a function to a wrapped value
     * that matchs the predicate
     *
     * filter : Maybe a -> (a -> Bool) -> Maybe a
     *
     * @param {Function} f - predicate function to filter a `Maybe a`
     * @return {Maybe} - Just(value) if fn(value) is true. Otherwise `Nothing`
     *
     */
    filter: abstract('filter'),

    /*
     * Flat maps a `Maybe a` to `Maybe b` by applying a function
     * that returns a Maybe to a wrapped value
     *
     * andThen : Maybe a -> (a -> Maybe b) -> Maybe b
     *
     * @param {Function} f - function to apply that returns a Maybe
     * @return {Maybe} - f(value) if maybe is `Just`. Otherwise `Nothing`
     *
     */
    andThen: abstract('andThen'),

    /*
     * It returns Nothing if other is Nothing. Otherwise it returns `other`
     *
     * and : Maybe a -> Maybe b -> Maybe b
     *
     * @param {Maybe} other - the maybe to return if `this` and `other` are Just value
     * @return {Maybe} - other if either self and `other` are Just and Nothing if the're not
     *
     */
    and: abstract('and'),

    /*
     * Returns `this` maybe if it contains a value. Otherwise returns other
     *
     * or : Maybe a -> Maybe  b -> Maybe c
     *
     * @param {Maybe} other - the maybe to return if `this` is Nothing
     * @return {Maybe} - other if the `this` maybe is Nothing. `this` otherwise
     */
    or: abstract('or'),

    /*
     * @deprecated since 3.0.0
     * Just like flat map but you may not need to use the value returned
     *
     * safe : Maybe a -> (a -> b) -> b
     *
     * @param {Function} f - function to apply
     * @return {*} - value
     *
     */
    safe: abstract('safe'),

    /*
     * It uses to unwraps a value from a `Maybe a` but you will force to define
     * what to do in both Just(value) and Nothing
     * caseof takes a just-nothing pattern which is an object and looks like:
     * { Just : (a -> b), Nothing: (b) }
     *
     * caseof : Maybe a -> ({ Just: (a -> b), Nothing: (b) }) -> b
     *
     * withDefault function can be made from caseof:
     *
     * ```
     * const withDefault = maybe => defaultValue => caseof({
     *   Just: value => value,
     *   Nothing: () => defaultValue,
     * });
     *
     * ```
     *
     * @param {object} - just-nothing object pattern
     * @return {*} value
     *
     */
    caseof: abstract('caseof'),

    /*
     * Zips `this` with another Maybe
     *
     * zip : Maybe a -> Maybe b -> Maybe([a, b])
     *
     * @param maybe - to zip with
     *
     * @return {Maybe} value - if `Maybe a` and `Maybe b` are Just, it returns `Maybe [a, b]`
     * Otherwise returns Nothing
     *
     */
    zip: abstract('zip'),

    /*
     * Zips this and another Maybe with function f
     *
     * zipWith : Maybe a -> Maybe b -> ([a, b] -> c) -> Maybe c
     *
     * @param maybe - to zip with
     * @param f - to apply to the zipped maybe values
     *
     * @return {Maybe} value - If this is `Just a` and other is `Just b`,
     * it returns `Maybe(f([a, b]))`
     *
     */
    zipWith: abstract('zipWith'),
};
