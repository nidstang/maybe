declare module 'maybe-monada' {
    export type Maybe<T> = {
        isNothing() : boolean;
        contains<K>(value : K): boolean;
        expect(message : string) : T | never;
        unwrap() : T | never;
        unwrapOr<K>(defaultValue : K) : K | T;
        unwrapOrElse<K>(fn: () => K) : K | T;
        withDefault<K>(defaultValue : K) : K | T;
        withDefaultFn<K>(fn: () => K) : K | T;
        map<K>(fn : (value : T) => K) : Maybe<K>;
        mapOr<K>(defaultValue : K, fn: (value : T) => K) : K;
        mapOrElse<K>(defaultFn: () => K, fn: (value : T) => K) : K;
        map2<K>(other : Maybe<J>, fn : (value1 : T, value2: J) => K) : Maybe<K>;
        ap<K>(other : Maybe<J>) : K;
        filter<K>(fn : (value : T) => Maybe<K>) : Maybe<K>;
        andThen<K>(fn : (value : T) => Maybe<K>) : Maybe<K>;
        chain<K>(fn : (value : T) => Maybe<K>) : Maybe<K>;
        safe<K>(fn : (value : T) => K) : K;
        and<K>(other : Maybe<K>) : Maybe<K>;
        or<K>(other : Maybe<K>) : Maybe<K> | Maybe<T>;
        zip<K>(other : Maybe<K>) : Maybe<[T,K]>;
        zipWith<K,J>(other : Maybe<K>, fn : (value: [T,K]) => J) : Maybe<J>;
        lift<K>(fn : (value : T) => K) : (value : Maybe<T>) => Maybe<K>;
        lift2<K,J>(fn : (value1 : T, value2 : K) => J) : (value1 : Maybe<T>, value2 : Maybe<K>) => Maybe<J>;
        caseof<K,J>(pattern : { Just: (value : T ) => K, Nothing: () => J }) : K | J;
    }

    export function Just<T>(value : T) : Maybe<T>;
    export function Nothing() : Maybe;
    export function fromValue<T>(value : T) : Maybe<T>;
    export function lift<T>(f : (value : T) => T) : (m : Maybe<T>) => Maybe<T>;
    export function lift2<T,K,H>(f : (v1 : T, v2: K) => H) : (ma: Maybe<T>, mb: Maybe<K>) => Maybe<H>;
    export function of<T>(value : T) : Maybe<T>;
    export function from<T>(value : T) : Maybe<T>;
    export function toPromise<T>(m : Maybe<T>) : Promise<T>;
    export function Maybe<T>(value : T) : Maybe<T>;
}
