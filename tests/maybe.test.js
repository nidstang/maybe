import test from 'ava'
import Maybe from '../src/maybe'

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
  t.is(Maybe.withDefault(Maybe.map(Maybe.Just(2))(value => value * value))(0), 4)
})

test('Add int to Maybe int', t => {
  const a1 = new Maybe(1)
  const a2 = 1

  const result = Maybe.map(a1)(x => x + a2)

  t.is(Maybe.withDefault(result)(0), 2)
})

test('Run safe function', t => {
  const m = new Maybe('Hello')
  const result = Maybe.safe(m)(value => `${value} world`)

  t.is(result, 'Hello world')
})

test('Match a pattern', t => {
  const m = new Maybe(10)
  let global = ''
  Maybe.match(m)({
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
    Maybe.match(m)('')
    t.pass()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Case a pattern', t => {
  const m = new Maybe(2)
  const re = Maybe.case(m)({
    Just: value => value * 4,
    Nothing: () => 10
  })

  t.is(re, 8)
})

test('Case a pattern with a Error', t => {
  const m = new Maybe(2)
  try {
    Maybe.case(m)({
      Just: value => value * 4
    })
    t.pass()
  } catch (ex) {
    t.is(ex instanceof Error, true)
  }
})

test('Test And then', t => {
  const m = Maybe.Just(1)
  const m1 = Maybe.andThen(m)(value => Maybe.Just(value * 2))
  const m2 = Maybe.andThen(m1)(value => Maybe.Just('Hello world'))

  t.is(m2.isNothing(), false)
  t.is(Maybe.withDefault(m2)(0), 'Hello world')
})

test('Test And then with Nothing', t => {
  const m = Maybe.Just(1)
  const m1 = Maybe.andThen(m)(value => Maybe.Nothing())
  const m2 = Maybe.andThen(m1)(value => Maybe.Just('Hello world'))

  t.is(m2.isNothing(), true)
  t.is(Maybe.withDefault(m2)(0), 0)
})
