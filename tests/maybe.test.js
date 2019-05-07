import test from 'ava'
import Maybe from '../src/maybe'

test('Create Maybe from nullable', t => {
  const m = Maybe()
  t.is(m.isNothing(), true)
})

test('Create maybe from a number', t => {
  const m = Maybe(1)
  t.is(m.isNothing(), false)
})

test('Create maybe from Maybe.Just', t => {
  const m = Maybe.Just(1)
  t.is(m.isNothing(), false)
})

test('Create maybe from Maybe.Nothing', t => {
  t.is(Maybe.Nothing().isNothing(), true)
})

test('Cast nullable to Maybe', t => {
  t.is(Maybe.from(undefined).isNothing(), true)
})

test('Applying function to Maybe', t => {
  const result = Maybe.Just(2)
    .map(val => val * val)
    .withDefault(0)

  t.is(result, 4)
})

test('Add int to Maybe int', t => {
  const a1 = Maybe(1)
  const a2 = 1

  const result = a1.map(x => x + a2)

  t.is(result.withDefault(0), 2)
})

test('Run safe function', t => {
  const m = Maybe('Hello')
  const result = m.safe(value => `${value} world`)

  t.is(result, 'Hello world')
})

test('caseof a pattern', t => {
  const m = Maybe(10)
  let result = ''
  m.caseof({
    Just: value => {
      result = 'Just value'
    },
    Nothing: () => {
      result = 'Nothing'
    }
  })

  t.is(result, 'Just value')
})

test('Caseof a pattern with return', t => {
  const m = Maybe(2)
  const re = m.caseof({
    Just: value => value * 4,
    Nothing: () => 10
  })

  t.is(re, 8)
})

test('Caseof a malformed pattern', t => {
  const m = Maybe(2)
  t.throws(() => m.caseof({
    Nothing: () => 10
  }))
})

test('Chaining maybes with andThen', t => {
  const res = Maybe.Just(1)
    .andThen(value => Maybe.Just(value * 2))
    .andThen(value => Maybe.Just('Hello world'))

  t.is(res.isNothing(), false)
  t.is(res.withDefault(0), 'Hello world')
})

test('Chaining nothing maybes with andThen', t => {
  const res = Maybe.Just(1)
    .andThen(value => Maybe.Nothing())
    .andThen(value => Maybe.Just('Hello world'))

  t.is(res.isNothing(), true)
  t.is(res.withDefault(0), 0)
})

test('Test filter', t => {
  const res = Maybe.from(1)
    .map(x => x * 2)
    .filter(x => x > 2)
    .withDefault(0)

  t.is(res, 0)
})

test('Another test filter', t => {
  const res = Maybe.from(2)
    .map(x => x * 2)
    .filter(x => x > 2)
    .withDefault(0)

  t.is(res, 4)
})

/* test('Required params control in withdefault', t => {
  try {
    withDefault()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Required params control in map', t => {
  try {
    map()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Required params control in andThen', t => {
  try {
    andThen()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Required params control in safe', t => {
  try {
    safe()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Required params control in match', t => {
  try {
    match()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Required params control in caseof', t => {
  try {
    caseof()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
}) */

// test('isFunction control in map', t => {
//   try {
//     map(Maybe.Nothing(), '')
//   } catch (ex) {
//     t.is(ex instanceof Error, true)
//   }
// })

// test('isFunction control in andThen', t => {
//   try {
//     andThen(Maybe.Nothing(), '')
//   } catch (ex) {
//     t.is(ex instanceof Error, true)
//   }
// })

// test('isFunction params control in safe', t => {
//   try {
//     safe(Maybe.Nothing(), '')
//   } catch (ex) {
//     t.is(ex instanceof Error, true)
//   }
// })

// test('isFunction params control in match', t => {
//   try {
//     match(Maybe.Nothing(), '')
//   } catch (ex) {
//     t.is(ex instanceof Error, true)
//   }
// })

// test('isFunction params control in caseof', t => {
//   try {
//     caseof(Maybe.Nothing(), '')
//   } catch (ex) {
//     t.is(ex instanceof Error, true)
//   }
// })
