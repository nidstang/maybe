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
const a1 = new Maybe(1) // Just(1)
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

## Pipeline
The pipe method attaches a new action to the maybe, also you can create a chain of pipes 

```
maybe | action1 | action2 | action3 ...
```

Note that actions must return a new maybe otherwise the chain will break.

##### Maybe.prototype.pipe(action, param)
```javascript
const getFirst = list => {
    const first = list[0]
    if (first) {
        return Maybe.Just(first)
    } else {
        return Maybe.Nothing()
    }
}

const validMonth = month => {
    if (month > 0 && month <= 12) {
        return Maybe.Just(month)
    } else {
        return Maybe.Nothing()
    }
}

// Custom action must be Maybe a -> Param -> Maybe b | b 
const customAction = maybe => {
    return () => {
        const monthName = getNameByMonth(withDefault(maybe)(1))
        return monthName
    }
}

const result = getFirst([1, 2, 3])
    .pipe(map, m => m * 2)
    .pipe('andThen', validMonth)
    .pipe(customAction)

// result === 'February'
```
