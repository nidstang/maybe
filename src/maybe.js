const SYMBOLS = {
  NULLABLE: Symbol('nullable')
}

const isFunction = fn => {
  if (typeof fn !== 'function') {
    throw new Error('Arg must be a function')
  }
}

const isRequired = arg => {
  throw new Error(`${arg} is required`)
}

const Maybe = function (nullable) {
  this[SYMBOLS.NULLABLE] = nullable
  this.isNothing = () => this[SYMBOLS.NULLABLE] == null
}

Maybe.from = (nullable) => {
  return new Maybe(nullable)
}

Maybe.Just = (value) => {
  return new Maybe(value)
}

Maybe.Nothing = () => {
  return new Maybe(null)
}

export const withDefault = (maybe = isRequired('maybe')) => (defaultValue = isRequired('defaultValue')) => {
  return maybe.isNothing() ? defaultValue : maybe[SYMBOLS.NULLABLE]
}

export const map = (maybe = isRequired('maybe')) => (fn = isRequired('fn')) => {
  isFunction(fn)
  return maybe.isNothing() ? Maybe.Nothing() : Maybe.Just(fn(maybe[SYMBOLS.NULLABLE]))
}

export const andThen = (maybe = isRequired('maybe')) => (fn = isRequired('fn')) => {
  isFunction(fn)
  return maybe.isNothing() ? Maybe.Nothing() : fn(maybe[SYMBOLS.NULLABLE])
}

export const safe = (maybe = isRequired('maybe')) => (fn = isRequired('fn')) => {
  isFunction(fn)
  return maybe.isNothing() ? {} : fn(maybe[SYMBOLS.NULLABLE])
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
export const match = (maybe = isRequired('maybe')) => (pattern = isRequired('{Just: function, Nothing: function}')) => {
  isFunction(pattern.Just)
  isFunction(pattern.Nothing)

  if (maybe.isNothing()) {
    pattern.Nothing()
  } else {
    pattern.Just(maybe[SYMBOLS.NULLABLE])
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
export const caseof = (maybe = isRequired('maybe')) => (pattern = isRequired('{Just: function, Nothing: function}')) => {
  isFunction(pattern.Just)
  isFunction(pattern.Nothing)
  return maybe.isNothing() ? pattern.Nothing() : pattern.Just(maybe[SYMBOLS.NULLABLE])
}

Maybe.prototype.pipe = function (action, param) {
  const fn = (typeof action === 'function') ? action : exports[action]
  if (fn) {
    const fnCurried = fn(this)

    if (fnCurried && typeof fnCurried === 'function') {
      return fnCurried(param)
    } else {
      return Maybe.Nothing()
    }
  } else {
    return Maybe.Nothing()
  }
}

export { Maybe }
