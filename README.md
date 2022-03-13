# JavaScript Maybe
![master build](https://github.com/nidstang/maybe/actions/workflows/tests.node.js.yml/badge.svg?branch=master)
![dev build](https://github.com/nidstang/maybe/actions/workflows/tests.node.js.yml/badge.svg?branch=dev)
[![npm version](https://badge.fury.io/js/maybe-monada.svg)](https://badge.fury.io/js/maybe-monada)

## Introduction
This is a simple but very useful package to wrap your data into a data type that is coping witn nullables for you. This data type is called Maybe and it'll be your best friend.

You will not have to ask if some thing is null or undefined again. Also maybe-moanda gives you a rich API to work with your types.

When you use it, you will love it.


Don't forget to check out the [API docs](https://github.com/nidstang/maybe/blob/master/docs/api.md).

This package is compatible with Nodejs and Browsers.

## Install
Only you have to do, it's run the npm install command in your proyect:
```bash
npm i maybe-monada
```

After that you can import it by using your favorite module system since it's been bundled for UMD:
```javascript
import Maybe from 'maybe-monada' // ES2015 modules
const Maybe = require('maybe-monada') // Commonjs modules
```

## Getting a Maybe
The most basic way to get a new Maybe is by using `Maybe.of`:

```javascript
const a = Maybe.of(10)
const b = Maybe.of('Hello world')
```

Additionaly, you can get a new maybe from Just and Nothing methods:

```javascript
const c = Maybe.Just(10)
const d = Maybe.Nothing()
```

Just gives you a Maybe with your value inside and Nothing gives you an empty Maybe. Both Just and Nothing implements the same API, so you do not have to worry about chaining operations. For instance, to apply a function with **map** to a Nothing, it gives you back another Nothing.

## Applying functions
Maybe is a Functor, so it cames with a **map** method that allows you to apply a function to the value inside:

```javascript
import Maybe from 'maybe-monada';

const a = Maybe.of(2)

a.map(x => x * 2) // Maybe(4)

const noValue = Maybe.Nothing();

noValue.map(x => x * 2) // Maybe
```

Also, you can chain several maps:

```javascript
import Maybe from 'maybe-monada';

const total = Maybe(2)
const sqrt = x => Math.sqrt(x)
const double = x => x * 2

total.map(double).map(square) // Maybe(2)

Maybe.Nothing().map(double) // Maybe
```

In addition you can apply a two arguments function to two maybes with **map2**:

```javascript
import Maybe from 'maybe-monada';

const add = (a, b) => a + b;

const m1 = Maybe.of(1);
const m2 = Maybe.of(2);

m1.map2(m2, add) // Maybe(3)

```

## Unwrapping maybes
Commonly, you want to unwrap your maybes to get the raw value. maybe-monada gives you three ways to safely unrwap your values:

1. By using the `unwrap` method which it will return you the value inside. Since the maybe can be Nothing, this method can raise an UnwrapException. So use it responsibly.
2. A better option is to provide a default value just in case the maybe was Nothing. For this you can use `unwrapOr` which takes one param as a default value.
3. Finally if you're planning to pass the result of a function as the default value for `unwrapOr`, we highly recommend you to use `unwrapOrElse` instead, since this method takes the function rather than the value, so it's lazily evalutated.

Also we bundled maybe-monada with an utility inspired by the case of sintax from [Elm Lang](https://elm-lang.org/docs/syntax) wich it's called `caseof`:

```javascript
const rawValue = Maybe.of(2).caseof({
	Just: x => x, // just the value
	Nothing: () => 0 // default value
})

// rawValue === 2

const anotherRawValue = Maybe.Nothing().caseof({
	Just: x => x * 2,
	Nothing: () => 2
})

// rawValue === 2
```

Also, you may have a procedure instead of functions that no return values:

```javascript
Maybe().caseof({
	Just: x => console.log(x),
	Nothing: () => console.log('There is no thing')
})

// In console: There is no thing

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
	.chain(getFirstElement)
	.chain(double)

// Maybe(2)
```

Also you can use the alias `andThen`.

## Zipping two maybes
It's common to have two maybes that you need to temporarily group in order to apply some function:
```javascript
import Maybe from 'maybe-monada';

const add = ([a,b]) => a + b;

const m1 = Maybe.of(12);
const m2 = Maybe.of(12);

const total = m1.zipWith(m2, add) // Maybe(24)
```

You can check all docs out here: https://github.com/nidstang/maybe/blob/master/docs/api.md