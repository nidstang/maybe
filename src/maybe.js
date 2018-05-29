const Maybe = function (nullable) {
  this.nullable = nullable
  // privates
  var _isFunction = fn => {
    if (typeof fn !== 'function') {
      throw new Error('Arg must be a function')
    }
  }
  var _isRequried = arg => {
    throw new Error(`${arg} is required`)
  }

  // publics
  this.isNothing = () => {
    return (this.nullable == null)
  }

  this.withDefault = defaultValue => {
    return (this.isNothing()) ? defaultValue : this.nullable
  }

  this.andThen = (fn = _isRequried('fn')) => {
    _isFunction(fn)
    return (this.isNothing()) ? Maybe.Nothing() : fn(this.nullable)
  }

  this.safe = (fn = _isRequried('fn')) => {
    _isFunction(fn)
    return (this.isNothing()) ? {} : fn(this.nullable)
  }

  this.map = (fn = _isRequried('fn')) => {
    _isFunction(fn)
    return (this.isNothing()) ? Maybe.Nothing() : Maybe.Just(fn(this.nullable))
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
  this.match = (pattern = _isRequried('{Just: fn, Nothing: fn}')) => {
    _isFunction(pattern.Just)
    _isFunction(pattern.Nothing)

    if (this.isNothing()) {
      pattern.Nothing()
    } else {
      pattern.Just(this.nullable)
    }
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
  this.case = (pattern = _isRequried('{Just: fn, Nothing: fn}')) => {
    _isFunction(pattern.Just)
    _isFunction(pattern.Nothing)
    return (this.isNothing()) ? pattern.Nothing() : pattern.Just(this.nullable)
  }
}

Maybe.Just = function (value) {
  return new Maybe(value)
}

Maybe.Nothing = function () {
  return new Maybe(null)
}

Maybe.toMaybe = function (nullable) {
  return new Maybe(nullable)
}

export default Maybe
