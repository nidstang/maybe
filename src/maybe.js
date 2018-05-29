// @flow

// $FlowFixMe
class Maybe<T> {
    nullable: ?T;

    constructor (nullable : ?T) {
      this.nullable = nullable
    }

    static toMaybe (nullable : ?T) {
      return new Maybe(nullable)
    }

    static Just (value : ?T) : Maybe<T> {
      return new Maybe(value)
    }

    static Nothing () : Maybe<T> {
      return new Maybe(null)
    }

    isNothing () : boolean {
      return (this.nullable == null)
    }

    _getValue () : T {
      if (!this.isNothing()) {
        // $FlowFixMe
        return this.nullable
      }
    }

    withDefault (defaultValue : T) : T {
      return (this.isNothing()) ? defaultValue : this.nullable
    }

    andThen (fn : (a : T) => Maybe<T>) : Maybe<T> {
      return (this.isNothing()) ? Maybe.Nothing() : fn(this._getValue())
    }

    // Apply a function but dont care the value returned
    safe (fn : (a : T) => any) : any {
      return (this.isNothing()) ? {} : fn(this._getValue())
    }

    map (fn : (a : T) => Maybe<T>) : Maybe<T> {
      return (this.isNothing()) ? Maybe.Nothing() : Maybe.Just(fn(this._getValue()))
    }

    /**
     * Example to use:
     *
     * match({
     *  Just: value => console.log(value),
     *  Nothing: () => console.error('The value is nothing'),
     * });
     *
     */
    match (pattern : { Just: (a : T) => void, Nothing: () => void }) : void {
      (this.isNothing()) ? pattern.Nothing() : pattern.Just(this._getValue())
    }

    /**
     * Unwrap the value in Maybe and give you a pattern to return sth in Just or in Nothing.
     *
     * Example to use:
     *
     * let result = maybe.case({
     *  Just: value => value + 1,
     *  Nothing: () => 0
     * })
     *
     * let withDefault = (maybe, default) => {
     *  return maybe.case({
     *      Just: value => value,
     *      Nothing: () => default
     *  })
     * }
     *
     * withDefault (Maybe.Nothing(), 1) // 1
     * withDefault (Maybe.Just(3), 1) // 3
     *
     * @param {Object} pattern
     *
     * @return {any}
     */
    case (pattern : { Just: (a : T) => any, Nothing: () => any}) : any {
      return (this.isNothing()) ? pattern.Nothing() : pattern.Just(this._getValue())
    }
};

export default Maybe
