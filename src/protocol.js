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
     * @param {function} f - the function to get the default value
     * @return {*} value
     */
    withDefaultFn: abstract('withDefaultFn'),

    /*
     * Maps a `Maybe a` (this) to `Maybe b` by applying a function to a wrapped value
     *
     * map : Maybe a -> (a -> b) -> Maybe b
     *
     * @param {function} f - function to apply
     * @return {Maybe} - Just(f(value)) if maybe is `Just`. Otherwise `Nothing`
     *
     */
    map: abstract('map'),

    /*
     * Filters a `Maybe a` (this) by applying a function to a wrapped value
     * that matchs the predicate
     *
     * filter : Maybe a -> (a -> Bool) -> Maybe a
     *
     * @param {function} f - predicate function to filter a `Maybe a`
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
     * @param {function} f - function to apply that returns a Maybe
     * @return {Maybe} - f(value) if maybe is `Just`. Otherwise `Nothing`
     *
     */
    andThen: abstract('andThen'),

    /*
     * @deprecated since 3.0.0
     * Just like flat map but you may not need to use the value returned
     *
     * safe : Maybe a -> (a -> b) -> b
     *
     * @param {function} f - function to apply
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
