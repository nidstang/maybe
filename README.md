# JavaScript Maybe
[![Build Status](https://travis-ci.org/nidstang/maybe.svg?branch=master)](https://travis-ci.org/nidstang/maybe)
## Getting starter
```
const a = new Maybe(10)
const b = new Maybe.from(10)
const c = new Maybe.Just(10)
const d = new Maybe.Nothing()

console.log(a.isNothing()) // false
console.log(b.isNothing()) // false
console.log(c.isNothing()) // false
console.log(d.isNothing()) // true
```

## Aplying a function
```
//Simple adder
cosnt a1 = new Maybe(1) // Just(1)
const result = Maybe.map(a1)(x => x + 1) // Just(2)
```

## Unwrapping maybes
### Withdefault
```
Maybe.withDefault(Maybe.Just('Hello world'))('Bye') // 'Hello world'
Maybe.withDefault(Maybe.Nothing())(0) // 0
```

### Case
```
const maybe = new Maybe(2)
const result = Maybe.case(maybe)({
    Just: value => value * 2,
    Nothing: () => 0
})

// result == Just(4)
```