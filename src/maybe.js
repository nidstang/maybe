
const Maybe = value => {
  const isNothing = () => !value

  return {
    isNothing: isNothing,

    withDefault: defaultValue => (
      isNothing() ? defaultValue : value
    ),

    withDefaultFn: fn => (
      isNothing() ? fn() : value
    ),

    map: fn => (
      isNothing() ? Maybe(null) : Maybe(fn(value))
    ),

    filter: fn => (
      fn(value) ? Maybe(value) : Maybe(null)
    ),

    andThen: fn => (
      isNothing() ? Maybe(null) : fn(value)
    ),

    safe: fn => (
      isNothing() ? {} : fn(value)
    ),

    caseof: pattern => {
      const { Just, Nothing } = Maybe(pattern)
        .filter(({ Just, Nothing }) => !!Just && !!Nothing)
        .withDefaultFn(() => {
          throw new Error('Pattern malformed')
        })

      return isNothing() ? Nothing() : Just(value)
    }
  }
}

Maybe.Just = value => Maybe(value)
Maybe.Nothing = () => Maybe(null)
Maybe.from = Maybe.Just

export default Maybe
