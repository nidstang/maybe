import test from 'ava'
import { Maybe, map, andThen, match, caseof, withDefault, safe } from '../dist/maybe.node'

test('Create Maybe from nullable', t => {
  const m = new Maybe()
  t.is(m.isNothing(), true)
})

test('Create maybe from a number', t => {
  const m = new Maybe(1)
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
  t.is(withDefault(map(Maybe.Just(2))(value => value * value))(0), 4)
})

test('Add int to Maybe int', t => {
  const a1 = new Maybe(1)
  const a2 = 1

  const result = map(a1)(x => x + a2)

  t.is(withDefault(result)(0), 2)
})

test('Run safe function', t => {
  const m = new Maybe('Hello')
  const result = safe(m)(value => `${value} world`)

  t.is(result, 'Hello world')
})

test('Match a pattern', t => {
  const m = new Maybe(10)
  let global = ''
  match(m)({
    Just: value => {
      global = 'Just value'
    },
    Nothing: () => {
      global = 'Nothing'
    }
  })

  t.is(global, 'Just value')
})

test('Match a pattern with Error', t => {
  const m = new Maybe(10)
  try {
    match(m)('')
    t.pass()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Case a pattern', t => {
  const m = new Maybe(2)
  const re = caseof(m)({
    Just: value => value * 4,
    Nothing: () => 10
  })

  t.is(re, 8)
})

test('Case a pattern with a Error', t => {
  const m = new Maybe(2)
  try {
    caseof(m)({
      Just: value => value * 4
    })
    t.pass()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Test And then', t => {
  const m = Maybe.Just(1)
  const m1 = andThen(m)(value => Maybe.Just(value * 2))
  const m2 = andThen(m1)(value => Maybe.Just('Hello world'))

  t.is(m2.isNothing(), false)
  t.is(withDefault(m2)(0), 'Hello world')
})

test('Test And then with Nothing', t => {
  const m = Maybe.Just(1)
  const m1 = andThen(m)(value => Maybe.Nothing())
  const m2 = andThen(m1)(value => Maybe.Just('Hello world'))

  t.is(m2.isNothing(), true)
  t.is(withDefault(m2)(0), 0)
})

test('Required params control in withdefault', t => {
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
})

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
