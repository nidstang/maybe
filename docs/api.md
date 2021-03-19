## Constants

<dl>
<dt><a href="#isNothing">isNothing</a> ⇒ <code>boolean</code></dt>
<dd><p>It returns &#39;true&#39; if the maybe is Just</p>
</dd>
<dt><a href="#contains">contains</a> ⇒ <code>Boolean</code></dt>
<dd><p>It returns <code>true</code> if <code>self</code> is Just containing the given value</p>
<p>contains : Maybe a -&gt; b -&gt; Boolean</p>
</dd>
<dt><a href="#expect">expect</a> ⇒ <code>*</code></dt>
<dd><p>Because this function may panic, its use is discouraged
Instead, prefer to handle the Nothing case explicitily, or use unwrapOr, unwrapOrElse,
or withDefault</p>
<p>It returns the wrapped Just value if it&#39;s Just. Otherwise rises an UnwrapException</p>
<p>(!) impure function
(!) a try/catch is a must to use this function!</p>
</dd>
<dt><a href="#unwrap">unwrap</a> ⇒ <code>*</code></dt>
<dd><p>Because this function may panic, its use is discouraged
Instead, prefer to handle the Nothing case explicitily, or use unwrapOr, unwrapOrElse,
or withDefault</p>
<p>It returns the wrapped Just value if it&#39;s Just. Otherwise rises an UnwrapException</p>
<p>(!) impure function
(!) a try/catch is a must to use this function!</p>
</dd>
<dt><a href="#unwrapOr">unwrapOr</a> ⇒ <code>*</code></dt>
<dd><p>It returns the wrapped Just value or a provided default
Arguments passed to map_or are eagerly evaluated;
if you are passing the result of a function call,
it is recommended to use unwrapOrElse, which is lazily evaluated.</p>
<p>unwrapOr : Maybe a -&gt; b -&gt; c</p>
</dd>
<dt><a href="#unwrapOrElse">unwrapOrElse</a> ⇒ <code>*</code></dt>
<dd><p>It returns the wrapped Just value or computes it from f</p>
<p>unwrapOrElse : Maybe a -&gt; (b) -&gt; c</p>
</dd>
<dt><del><a href="#withDefault">withDefault</a> ⇒ <code>*</code></del></dt>
<dd></dd>
<dt><del><a href="#withDefaultFn">withDefaultFn</a> ⇒ <code>*</code></del></dt>
<dd></dd>
<dt><a href="#map">map</a> ⇒ <code>Maybe</code></dt>
<dd><p>Maps a <code>Maybe a</code> (this) to <code>Maybe b</code> by applying a function to a wrapped value</p>
<p>map : Maybe a -&gt; (a -&gt; b) -&gt; Maybe b</p>
</dd>
<dt><a href="#mapOr">mapOr</a> ⇒ <code>*</code></dt>
<dd><p>If there is a wrapped value, it applies a function to it.
Otherwise it returns the provide default</p>
<p>Arguments passed to map_or are eagerly evaluated;
if you are passing the result of a function call,
it is recommended to use mapOrElse, which is lazily evaluated.</p>
<p>mapOr : Maybe a -&gt; b -&gt; (a -&gt; b) -&gt; b</p>
</dd>
<dt><a href="#mapOrElse">mapOrElse</a> ⇒ <code>*</code></dt>
<dd><p>Applies a function to a wrapped value if any. Otherwise computes a default value</p>
<p>mapOrElse : Maybe a -&gt; (b) -&gt; (a -&gt; b) -&gt; b</p>
</dd>
<dt><a href="#map2">map2</a> ⇒ <code>Maybe</code></dt>
<dd><p>Applies f to <code>this</code> and other.
This is an alias over zip and then apply a two params function</p>
<p>map2 : Maybe a -&gt; Maybe b -&gt; (a -&gt; b -&gt; c) -&gt; Maybe c</p>
</dd>
<dt><a href="#filter">filter</a> ⇒ <code>Maybe</code></dt>
<dd><p>Filters a <code>Maybe a</code> (this) by applying a function to a wrapped value
that matchs the predicate</p>
<p>filter : Maybe a -&gt; (a -&gt; Bool) -&gt; Maybe a</p>
</dd>
<dt><a href="#andThen">andThen</a> ⇒ <code>Maybe</code></dt>
<dd><p>Flat maps a <code>Maybe a</code> to <code>Maybe b</code> by applying a function
that returns a Maybe to a wrapped value</p>
<p>andThen : Maybe a -&gt; (a -&gt; Maybe b) -&gt; Maybe b</p>
</dd>
<dt><a href="#and">and</a> ⇒ <code>Maybe</code></dt>
<dd><p>It returns Nothing if other is Nothing. Otherwise it returns <code>other</code></p>
<p>and : Maybe a -&gt; Maybe b -&gt; Maybe b</p>
</dd>
<dt><a href="#or">or</a> ⇒ <code>Maybe</code></dt>
<dd><p>Returns <code>this</code> maybe if it contains a value. Otherwise returns other</p>
<p>or : Maybe a -&gt; Maybe  b -&gt; Maybe c</p>
</dd>
<dt><del><a href="#safe">safe</a> ⇒ <code>*</code></del></dt>
<dd></dd>
<dt><a href="#caseof">caseof</a> ⇒ <code>*</code></dt>
<dd><p>It uses to unwraps a value from a <code>Maybe a</code> but you will force to define
what to do in both Just(value) and Nothing
caseof takes a just-nothing pattern which is an object and looks like:
{ Just : (a -&gt; b), Nothing: (b) }</p>
<p>caseof : Maybe a -&gt; ({ Just: (a -&gt; b), Nothing: (b) }) -&gt; b</p>
<p>withDefault function can be made from caseof:</p>
<pre><code class="language-javascript">const withDefault = maybe =&gt; defaultValue =&gt; caseof({
  Just: value =&gt; value,
  Nothing: () =&gt; defaultValue,
});
</code></pre>
</dd>
<dt><a href="#zip">zip</a> ⇒ <code>Maybe</code></dt>
<dd><p>Zips <code>this</code> with another Maybe</p>
<p>zip : Maybe a -&gt; Maybe b -&gt; Maybe([a, b])</p>
</dd>
<dt><a href="#zipWith">zipWith</a> ⇒ <code>Maybe</code></dt>
<dd><p>Zips this and another Maybe with function f</p>
<p>zipWith : Maybe a -&gt; Maybe b -&gt; ([a, b] -&gt; c) -&gt; Maybe c</p>
</dd>
<dt><a href="#lift">lift</a> ⇒ <code>function</code></dt>
<dd><p>It lifts an unary function that works with <code>a</code> type to <code>Maybe a</code> and <code>Maybe b</code></p>
<p>Maybe.lift : (a -&gt; b) -&gt; (Maybe a -&gt; Maybe b)</p>
</dd>
<dt><a href="#lift2">lift2</a> ⇒ <code>function</code></dt>
<dd><p>It lifts a binary function that works with <code>a</code> and <code>b</code> types to <code>Maybe a</code>, <code>Maybe b</code> <code>Maybe c</code></p>
<p>Maybe.lift : (a -&gt; b -&gt; c) -&gt; (Maybe a -&gt; Maybe b -&gt; Maybe c)</p>
</dd>
</dl>

<a name="isNothing"></a>

## isNothing ⇒ <code>boolean</code>
It returns 'true' if the maybe is Just

**Returns**: <code>boolean</code> - true if the wrapped value is Just, false otherwise  
<a name="contains"></a>

## contains ⇒ <code>Boolean</code>
It returns `true` if `self` is Just containing the given value

contains : Maybe a -> b -> Boolean

**Returns**: <code>Boolean</code> - `true` if value is the same as the item inside the maybe if this is Some  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>\*</code> | the value to check with |

<a name="expect"></a>

## expect ⇒ <code>\*</code>
Because this function may panic, its use is discouraged
Instead, prefer to handle the Nothing case explicitily, or use unwrapOr, unwrapOrElse,
or withDefault

It returns the wrapped Just value if it's Just. Otherwise rises an UnwrapException

(!) impure function
(!) a try/catch is a must to use this function!

**Returns**: <code>\*</code> - the wrapped value if it's Just  
**Throws**:

- <code>UnwrapException</code> msg


| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | message for UnwrapException |

<a name="unwrap"></a>

## unwrap ⇒ <code>\*</code>
Because this function may panic, its use is discouraged
Instead, prefer to handle the Nothing case explicitily, or use unwrapOr, unwrapOrElse,
or withDefault

It returns the wrapped Just value if it's Just. Otherwise rises an UnwrapException

(!) impure function
(!) a try/catch is a must to use this function!

**Returns**: <code>\*</code> - the wrapped value if it's Just  
**Throws**:

- <code>UnwrapException</code> Tried to unwrap a Nothing value

<a name="unwrapOr"></a>

## unwrapOr ⇒ <code>\*</code>
It returns the wrapped Just value or a provided default
Arguments passed to map_or are eagerly evaluated;
if you are passing the result of a function call,
it is recommended to use unwrapOrElse, which is lazily evaluated.

unwrapOr : Maybe a -> b -> c

**Returns**: <code>\*</code> - value if maybe is Just. Otherwise default is returned  

| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>\*</code> | default value to be returned if the maybe is Nothing |

<a name="unwrapOrElse"></a>

## unwrapOrElse ⇒ <code>\*</code>
It returns the wrapped Just value or computes it from f

unwrapOrElse : Maybe a -> (b) -> c

**Returns**: <code>\*</code> - value if maybe is Just. Otherwise computes defaultValue from f  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | for computing a default value if maybe is Nothing |

<a name="withDefault"></a>

## ~~withDefault ⇒ <code>\*</code>~~
***Deprecated***

**Returns**: <code>\*</code> - value  

| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>\*</code> | the value for returning if maybe is Nothing |

<a name="withDefaultFn"></a>

## ~~withDefaultFn ⇒ <code>\*</code>~~
***Deprecated***

**Returns**: <code>\*</code> - value  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | the function to get the default value |

<a name="map"></a>

## map ⇒ <code>Maybe</code>
Maps a `Maybe a` (this) to `Maybe b` by applying a function to a wrapped value

map : Maybe a -> (a -> b) -> Maybe b

**Returns**: <code>Maybe</code> - Maybe(f(value)) if maybe is `Just`. Otherwise `Nothing`  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | function to apply |

<a name="mapOr"></a>

## mapOr ⇒ <code>\*</code>
If there is a wrapped value, it applies a function to it.
Otherwise it returns the provide default

Arguments passed to map_or are eagerly evaluated;
if you are passing the result of a function call,
it is recommended to use mapOrElse, which is lazily evaluated.

mapOr : Maybe a -> b -> (a -> b) -> b

**Returns**: <code>\*</code> - `Just(f(value))` if maybe is `Just(value)` else `defaultValue`  

| Param | Type | Description |
| --- | --- | --- |
| defaultValue | <code>\*</code> | the value to return if Maybe a is Nothing |
| f | <code>function</code> | function to apply if Maybe a is Just |

<a name="mapOrElse"></a>

## mapOrElse ⇒ <code>\*</code>
Applies a function to a wrapped value if any. Otherwise computes a default value

mapOrElse : Maybe a -> (b) -> (a -> b) -> b

**Returns**: <code>\*</code> - `Just(f(value))` if maybe is `Just(value)` else `default()`  

| Param | Type | Description |
| --- | --- | --- |
| default | <code>function</code> | the function to compute a default value |
| f | <code>function</code> | function to apply to if Maybe a is Just |

<a name="map2"></a>

## map2 ⇒ <code>Maybe</code>
Applies f to `this` and other.
This is an alias over zip and then apply a two params function

map2 : Maybe a -> Maybe b -> (a -> b -> c) -> Maybe c

**Returns**: <code>Maybe</code> - Just(f(value, other.value)) if maybe is Just else Nothing  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Maybe</code> | other maybe to be passed to f |
| f | <code>function</code> | two params function to apply to |

<a name="filter"></a>

## filter ⇒ <code>Maybe</code>
Filters a `Maybe a` (this) by applying a function to a wrapped value
that matchs the predicate

filter : Maybe a -> (a -> Bool) -> Maybe a

**Returns**: <code>Maybe</code> - Just(value) if fn(value) is true. Otherwise `Nothing`  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | predicate function to filter a `Maybe a` |

<a name="andThen"></a>

## andThen ⇒ <code>Maybe</code>
Flat maps a `Maybe a` to `Maybe b` by applying a function
that returns a Maybe to a wrapped value

andThen : Maybe a -> (a -> Maybe b) -> Maybe b

**Returns**: <code>Maybe</code> - Just(f(value)) if maybe is `Just`. Otherwise `Nothing`  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | function to apply that returns a Maybe |

<a name="and"></a>

## and ⇒ <code>Maybe</code>
It returns Nothing if other is Nothing. Otherwise it returns `other`

and : Maybe a -> Maybe b -> Maybe b

**Returns**: <code>Maybe</code> - other if either self and `other` are Just and Nothing if the're not  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Maybe</code> | the maybe to return if `this` and `other` are Just value |

<a name="or"></a>

## or ⇒ <code>Maybe</code>
Returns `this` maybe if it contains a value. Otherwise returns other

or : Maybe a -> Maybe  b -> Maybe c

**Returns**: <code>Maybe</code> - other if the `this` maybe is Nothing. `this` otherwise  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>Maybe</code> | the maybe to return if `this` is Nothing |

<a name="safe"></a>

## ~~safe ⇒ <code>\*</code>~~
***Deprecated***

**Returns**: <code>\*</code> - - value  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | function to apply |

<a name="caseof"></a>

## caseof ⇒ <code>\*</code>
It uses to unwraps a value from a `Maybe a` but you will force to define
what to do in both Just(value) and Nothing
caseof takes a just-nothing pattern which is an object and looks like:
{ Just : (a -> b), Nothing: (b) }

caseof : Maybe a -> ({ Just: (a -> b), Nothing: (b) }) -> b

withDefault function can be made from caseof:

```javascript
const withDefault = maybe => defaultValue => caseof({
  Just: value => value,
  Nothing: () => defaultValue,
});

```

**Returns**: <code>\*</code> - value  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | just-nothing object pattern |

<a name="zip"></a>

## zip ⇒ <code>Maybe</code>
Zips `this` with another Maybe

zip : Maybe a -> Maybe b -> Maybe([a, b])

**Returns**: <code>Maybe</code> - if `Maybe a` and `Maybe b` are Just, it returns `Maybe [a, b]`
Otherwise returns Nothing  

| Param | Type | Description |
| --- | --- | --- |
| maybe | <code>Maybe</code> | to zip with |

<a name="zipWith"></a>

## zipWith ⇒ <code>Maybe</code>
Zips this and another Maybe with function f

zipWith : Maybe a -> Maybe b -> ([a, b] -> c) -> Maybe c

**Returns**: <code>Maybe</code> - If this is `Just a` and other is `Just b`,
it returns `Maybe(f([a, b]))`  

| Param | Type | Description |
| --- | --- | --- |
| maybe | <code>Maybe</code> | to zip with |
| f | <code>function</code> | to apply to the zipped maybe values |

<a name="lift"></a>

## lift ⇒ <code>function</code>
It lifts an unary function that works with `a` type to `Maybe a` and `Maybe b`

Maybe.lift : (a -> b) -> (Maybe a -> Maybe b)

**Returns**: <code>function</code> - the unary lifted function  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | the unary function to lift |

<a name="lift2"></a>

## lift2 ⇒ <code>function</code>
It lifts a binary function that works with `a` and `b` types to `Maybe a`, `Maybe b` `Maybe c`

Maybe.lift : (a -> b -> c) -> (Maybe a -> Maybe b -> Maybe c)

**Returns**: <code>function</code> - the lifted binary function  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>function</code> | the binary function to lift |

