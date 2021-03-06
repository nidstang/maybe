# JavaScript Maybe
[![Build Status](https://travis-ci.org/nidstang/maybe.svg?branch=master)](https://travis-ci.org/nidstang/maybe)
[![npm version](https://badge.fury.io/js/maybe-monada.svg)](https://badge.fury.io/js/maybe-monada)

## Introduction
This package is a maybe monad that gives you a simple way to wrap your data. You always have to operate with your data inside a context. It's like a box. Your value will be in that box all the time and the only way you can transform it is to apply functions with **map** and **filter** methods.

Inside a Maybe you can find a value or nothing, so you will need to define both paths when you want to unwrap it.

When you use it, you will love you.

## Getting a Maybe
The most basic way to get a maybe is Maybe(value) or by using Maybe.from method:

```javascript
const a = Maybe(10)
const b = Maybe.from('Hello world')
```

Additionaly, you can get a maybe from Just and Nothing methods:

```javascript
const c = Maybe.Just(10)
const d = Maybe.Nothing()
```

## Applying functions
You have your value in a context already, so it's highly likely that you want to apply functions over it. You can use **map**:

```javascript
const a = Maybe(2)

a.map(x => x * 2) // Maybe(4)
```

Also, you can chain several maps:

```javascript
const total = Maybe(2)
const sqrt = x => Math.sqrt(x)
const double = x => x * 2

total
	.map(double)
	.map(square)

// total === Maybe(2)
```

## Unwrapping maybes
Commonly, you want to unwrap your maybes to get the raw value. In order to keep your program safe, you need to define what it will happend in every case (box with value or empty box), so you need **caseof**

```javascript
const rawValue = Maybe(2).caseof({
	Just: x => x, // just the value
	Nothing: () => 0 // default value
})

// rawValue === 2

const anotherRawValue = Maybe().caseof({
	Just: x => x * 2,
	Nothing: () => 2
})

// rawValue === 2
```

Also, you may have a procedure rather than functions that no return values:

```javascript
Maybe().caseof({
	Just: x => console.log(x),
	Nothing: () => console.log('There is no thing')
})

// In console: There is no thing

```

Additionally, you may use **withDefault** method to get your raw value quickly:

```javascript
Maybe(10).withDefault(0) // 10
Maybe(null).withDefault(0) // 0
```

## Chaning Maybes
Sometimes it is useful to chain functions that return new maybes in order to get another maybe with the result:

```javascript
const getFirstElement = list => {
	const [first] = list
	return first? Maybe.Just(first) : Maybe.Nothing()
}

const double = value => {
	return Maybe.Just(value * 2)
}

Maybe([1,2,3])
	.andThen(getFirstElement)
	.andThen(double)

// Maybe(2)
```


## API
### Maybe

#### map (fn : a => b) => Maybe(b)

#### filter (fn : a => Bool) => Maybe

#### withDefault (a) => b

#### withDefaultFn (fn => a) => a

#### andThen (fn : a => Maybe(b)) => Maybe(b)

#### safe (fn : a => b) => a | void

#### caseof ({ Just: a => b, Nothing: () => b} => b

#### isNothing () => Bool

#### Maybe.Just (a) => Maybe(a)

#### Maybe.Nothing () => Maybe()

#### Maybe.from (a) => Maybe(a)
