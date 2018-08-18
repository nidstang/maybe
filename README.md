# JavaScript Maybe
[![Build Status](https://travis-ci.org/nidstang/maybe.svg?branch=master)](https://travis-ci.org/nidstang/maybe)
## Getting starter
```javascript
const a = new Maybe(10)
const b = new Maybe.from(10)
const c = new Maybe.Just(10)
const d = new Maybe.Nothing()

console.log(a.isNothing()) // false
console.log(b.isNothing()) // false
console.log(c.isNothing()) // false
console.log(d.isNothing()) // true
```

## Applying a function
```javascript
//Simple adder
cosnt a1 = new Maybe(1) // Just(1)
const result = map(a1)(x => x + 1) // Just(2)
```

## Unwrapping maybes
### Withdefault
```javascript
withDefault(Maybe.Just('Hello world'))('Bye') // 'Hello world'
withDefault(Maybe.Nothing())(0) // 0
```

### Case of
```javascript
const maybe = new Maybe(2)
const result = caseof(maybe)({
    Just: value => value * 2,
    Nothing: () => 0
})

// result == Just(4)
```
