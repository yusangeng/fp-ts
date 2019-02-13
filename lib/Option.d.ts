import { Alternative1 } from './Alternative';
import { Compactable1 } from './Compactable';
import { Either } from './Either';
import { Extend1 } from './Extend';
import { Filterable1 } from './Filterable';
import { Foldable2v1 } from './Foldable2v';
import { Lazy, Predicate, Refinement } from './function';
import { Monad1 } from './Monad';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Plus1 } from './Plus';
import { Semigroup } from './Semigroup';
import { Setoid } from './Setoid';
import { Traversable2v1 } from './Traversable2v';
import { Witherable1 } from './Witherable';
declare module './HKT' {
    interface URI2HKT<A> {
        Option: Option<A>;
    }
}
export declare const URI = "Option";
export declare type URI = typeof URI;
/**
 * If you have worked with JavaScript at all in the past, it is very likely that you have come across a `TypeError` at
 * some time (other languages will throw similarly named errors in such a case). Usually this happens because some
 * method returns `null` or `undefined` when you were not expecting it and thus not dealing with that possibility in
 * your client code.
 *
 * ```ts
 * const as: Array<string> = []
 * as[0].trim() // throws TypeError: Cannot read property 'trim' of undefined
 * ```
 *
 * fp-ts models the absence of values through the `Option` datatype similar to how Scala, Haskell and other FP languages
 * handle optional values. A value of `null` or `undefined` is often abused to represent an absent optional value.
 *
 * `Option<A>` is a container for an optional value of type `A`. If the value of type `A` is present, the `Option<A>` is
 * an instance of `Some<A>`, containing the present value of type `A`. If the value is absent, the `Option<A>` is an
 * instance of `None<A>`.
 *
 * An option could be looked at as a collection or foldable structure with either one or zero elements.
 * Another way to look at option is: it represents the effect of a possibly failing computation.
 *
 * ```ts
 * import { Option, some, none } from 'fp-ts/lib/Option'
 *
 * const someValue: Option<string> = some('foo')
 * const emptyValue: Option<string> = none
 * ```
 *
 * Let's write a function that may or not give us a string, thus returning `Option<string>`
 *
 *
 * ```ts
 * const head = (as: Array<string>): Option<string> => {
 *   return as.length > 0 ? some(as[0]) : none
 * }
 * ```
 *
 * Using `getOrElse` we can provide a default value `"No value"` when the optional argument `None` does not exist:
 *
 * ```ts
 * const value1 = head(['foo', 'bar']) // some('foo)
 * const value2 = head([]) // none
 * value1.getOrElse('No value') // 'foo'
 * value2.getOrElse('No value') // 'No value'
 * ```
 *
 * Checking whether option has value:
 *
 * ```ts
 * value1.isNone() // false
 * value2.isNone() // true
 * ```
 *
 * We can pattern match using the `fold` method
 *
 * ```ts
 * const number: Option<number> = some(3)
 * const noNumber: Option<number> = none
 * number.fold(1, n => n * 3) // 9
 * noNumber.fold(1, n => n * 3) // 1
 * ```
 *
 * You can chain several possibly failing computations using the `chain` method
 *
 * ```ts
 * const inverse = (n: number): Option<number> => {
 *   return n === 0 ? none : some(1 / n)
 * }
 *
 * number.chain(inverse) // 1/3
 * noNumber.chain(inverse) // none
 * some(0).chain(inverse) // none
 * ```
 *
 * Computing over independent values
 *
 * ```ts
 * const sum = (a: number) => (b: number): number => a + b
 * const sumLifted = (oa: Option<number>, ob: Option<number>): Option<number> => ob.ap(oa.map(sum))
 * sumLifted(some(1), some(2)) // some(3)
 * sumLifted(some(1), none) // none
 * ```
 *
 * @data
 * @constructor None
 * @constructor Some
 * @since 1.0.0
 */
export declare type Option<A> = None<A> | Some<A>;
export declare class None<A> {
    static value: Option<never>;
    readonly _tag: 'None';
    readonly _A: A;
    readonly _URI: URI;
    private constructor();
    /**
     * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors. If it
     * maps on `Some` then it will apply the `f` on `Some`'s value, if it maps on `None` it will return `None`.
     *
     * @example
     * import { some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(some(1).map(n => n * 2), some(2))
     */
    map<B>(f: (a: A) => B): Option<B>;
    /**
     * Maps `f` over this `Option`'s value. If the value returned from `f` is null or undefined, returns `None`
     *
     * @example
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * interface Foo {
     *   bar?: {
     *     baz?: string
     *   }
     * }
     *
     * assert.deepStrictEqual(
     *   some<Foo>({ bar: { baz: 'quux' } })
     *     .mapNullable(foo => foo.bar)
     *     .mapNullable(bar => bar.baz),
     *   some('quux')
     * )
     * assert.deepStrictEqual(
     *   some<Foo>({ bar: {} })
     *     .mapNullable(foo => foo.bar)
     *     .mapNullable(bar => bar.baz),
     *   none
     * )
     * assert.deepStrictEqual(
     *   some<Foo>({})
     *     .mapNullable(foo => foo.bar)
     *     .mapNullable(bar => bar.baz),
     *   none
     * )
     */
    mapNullable<B>(f: (a: A) => B | null | undefined): Option<B>;
    /**
     * `ap`, some may also call it "apply". Takes a function `fab` that is in the context of `Option`, and applies that
     * function to this `Option`'s value. If the `Option` calling `ap` is `none` it will return `none`.
     *
     * @example
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(some(2).ap(some((x: number) => x + 1)), some(3))
     * assert.deepStrictEqual(none.ap(some((x: number) => x + 1)), none)
     */
    ap<B>(fab: Option<(a: A) => B>): Option<B>;
    /**
     * Flipped version of {@link ap}
     *
     * @example
     * import { some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(some((x: number) => x + 1).ap_(some(2)), some(3))
     * assert.deepStrictEqual(none.ap_(some(2)), none)
     */
    ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>;
    /**
     * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty. Returns `None` if this
     * `Option` is empty. Slightly different from `map` in that `f` is expected to return an `Option` (which could be
     * `None`)
     */
    chain<B>(f: (a: A) => Option<B>): Option<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /**
     * `alt` short for alternative, takes another `Option`. If this `Option` is a `Some` type then it will be returned, if
     * it is a `None` then it will return the next `Some` if it exist. If both are `None` then it will return `none`.
     *
     * @example
     * import { Option, some, none } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(some(2).alt(some(4)), some(2))
     * const fa: Option<number> = none
     * assert.deepStrictEqual(fa.alt(some(4)), some(4))
     */
    alt(fa: Option<A>): Option<A>;
    /**
     * Lazy version of {@link alt}
     *
     * @example
     * import { some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(some(1).orElse(() => some(2)), some(1))
     *
     * @since 1.6.0
     */
    orElse(fa: Lazy<Option<A>>): Option<A>;
    extend<B>(f: (ea: Option<A>) => B): Option<B>;
    /**
     * Applies a function to each case in the data structure
     *
     * @example
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.strictEqual(some(1).fold('none', a => `some: ${a}`), 'some: 1')
     * assert.strictEqual(none.fold('none', a => `some: ${a}`), 'none')
     */
    fold<B>(b: B, onSome: (a: A) => B): B;
    /** Lazy version of {@link fold} */
    foldL<B>(onNone: () => B, onSome: (a: A) => B): B;
    /**
     * Returns the value from this `Some` or the given argument if this is a `None`
     *
     * @example
     * import { Option, none, some } from 'fp-ts/lib/Option'
     *
     * assert.strictEqual(some(1).getOrElse(0), 1)
     * const fa: Option<number> = none
     * assert.strictEqual(fa.getOrElse(0), 0)
     */
    getOrElse(a: A): A;
    /** Lazy version of {@link getOrElse} */
    getOrElseL(f: () => A): A;
    /** Returns the value from this `Some` or `null` if this is a `None` */
    toNullable(): A | null;
    /** Returns the value from this `Some` or `undefined` if this is a `None` */
    toUndefined(): A | undefined;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
    contains(S: Setoid<A>, a: A): boolean;
    /** Returns `true` if the option is `None`, `false` otherwise */
    isNone(): this is None<A>;
    /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
    isSome(): this is Some<A>;
    /**
     * Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value
     */
    exists(p: (a: A) => boolean): boolean;
    /**
     * Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value.
     * Otherwise returns `None`
     */
    filter<B extends A>(p: Refinement<A, B>): Option<B>;
    filter(p: Predicate<A>): Option<A>;
    /**
     * Use {@link filter} instead.
     * Returns this option refined as `Option<B>` if it is non empty and the `refinement` returns `true` when applied to
     * this Option's value. Otherwise returns `None`
     * @since 1.3.0
     * @deprecated
     */
    refine<B extends A>(refinement: Refinement<A, B>): Option<B>;
}
/**
 * @since 1.0.0
 */
export declare const none: Option<never>;
export declare class Some<A> {
    readonly value: A;
    readonly _tag: 'Some';
    readonly _A: A;
    readonly _URI: URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Option<B>;
    mapNullable<B>(f: (a: A) => B | null | undefined): Option<B>;
    ap<B>(fab: Option<(a: A) => B>): Option<B>;
    ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>;
    chain<B>(f: (a: A) => Option<B>): Option<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    alt(fa: Option<A>): Option<A>;
    orElse(fa: Lazy<Option<A>>): Option<A>;
    extend<B>(f: (ea: Option<A>) => B): Option<B>;
    fold<B>(b: B, onSome: (a: A) => B): B;
    foldL<B>(onNone: () => B, onSome: (a: A) => B): B;
    getOrElse(a: A): A;
    getOrElseL(f: () => A): A;
    toNullable(): A | null;
    toUndefined(): A | undefined;
    inspect(): string;
    toString(): string;
    contains(S: Setoid<A>, a: A): boolean;
    isNone(): this is None<A>;
    isSome(): this is Some<A>;
    exists(p: (a: A) => boolean): boolean;
    filter<B extends A>(p: Refinement<A, B>): Option<B>;
    filter(p: Predicate<A>): Option<A>;
    refine<B extends A>(refinement: Refinement<A, B>): Option<B>;
}
/**
 *
 * @example
 * import { none, some, getSetoid } from 'fp-ts/lib/Option'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * const S = getSetoid(setoidNumber)
 * assert.strictEqual(S.equals(none, none), true)
 * assert.strictEqual(S.equals(none, some(1)), false)
 * assert.strictEqual(S.equals(some(1), none), false)
 * assert.strictEqual(S.equals(some(1), some(2)), false)
 * assert.strictEqual(S.equals(some(1), some(1)), true)
 *
 * @since 1.0.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Option<A>>;
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 *
 *
 * @example
 * import { none, some, getOrd } from 'fp-ts/lib/Option'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordNumber)
 * assert.strictEqual(O.compare(none, none), 0)
 * assert.strictEqual(O.compare(none, some(1)), -1)
 * assert.strictEqual(O.compare(some(1), none), 1)
 * assert.strictEqual(O.compare(some(1), some(2)), -1)
 * assert.strictEqual(O.compare(some(1), some(1)), 0)
 *
 * @since 1.2.0
 */
export declare const getOrd: <A>(O: Ord<A>) => Ord<Option<A>>;
/**
 * {@link Apply} semigroup
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const S = getApplySemigroup(semigroupSum)
 * assert.deepStrictEqual(S.concat(none, none), none)
 * assert.deepStrictEqual(S.concat(some(1), none), none)
 * assert.deepStrictEqual(S.concat(none, some(1)), none)
 * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
 *
 * @since 1.7.0
 */
export declare const getApplySemigroup: <A>(S: Semigroup<A>) => Semigroup<Option<A>>;
/**
 * @since 1.7.0
 */
export declare const getApplyMonoid: <A>(M: Monoid<A>) => Monoid<Option<A>>;
/**
 * Monoid returning the left-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(a)      |
 *
 * @example
 * import { getFirstMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getFirstMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
 *
 * @since 1.0.0
 */
export declare const getFirstMonoid: <A = never>() => Monoid<Option<A>>;
/**
 * Monoid returning the right-most non-`None` value
 *
 * | x       | y       | concat(x, y) |
 * | ------- | ------- | ------------ |
 * | none    | none    | none         |
 * | some(a) | none    | some(a)      |
 * | none    | some(a) | some(a)      |
 * | some(a) | some(b) | some(b)      |
 *
 * @example
 * import { getLastMonoid, some, none } from 'fp-ts/lib/Option'
 *
 * const M = getLastMonoid<number>()
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
 *
 * @since 1.0.0
 */
export declare const getLastMonoid: <A = never>() => Monoid<Option<A>>;
/**
 * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
 * appended using the provided `Semigroup`
 *
 * | x       | y       | concat(x, y)       |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | some(a)            |
 * | none    | some(a) | some(a)            |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @example
 * import { getMonoid, some, none } from 'fp-ts/lib/Option'
 * import { semigroupSum } from 'fp-ts/lib/Semigroup'
 *
 * const M = getMonoid(semigroupSum)
 * assert.deepStrictEqual(M.concat(none, none), none)
 * assert.deepStrictEqual(M.concat(some(1), none), some(1))
 * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
 * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
 *
 * @since 1.0.0
 */
export declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<Option<A>>;
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromNullable } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(fromNullable(undefined), none)
 * assert.deepStrictEqual(fromNullable(null), none)
 * assert.deepStrictEqual(fromNullable(1), some(1))
 *
 * @since 1.0.0
 */
export declare const fromNullable: <A>(a: A | null | undefined) => Option<A>;
/**
 * @since 1.0.0
 * @alias of
 */
export declare const some: <A>(a: A) => Option<A>;
/**
 * @example
 * import { none, some, fromPredicate } from 'fp-ts/lib/Option'
 *
 * const positive = fromPredicate((n: number) => n >= 0)
 *
 * assert.deepStrictEqual(positive(-1), none)
 * assert.deepStrictEqual(positive(1), some(1))
 *
 * @since 1.0.0
 */
export declare function fromPredicate<A, B extends A>(predicate: Refinement<A, B>): (a: A) => Option<B>;
export declare function fromPredicate<A>(predicate: Predicate<A>): (a: A) => Option<A>;
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 *
 * @example
 * import { none, some, tryCatch } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(
 *   tryCatch(() => {
 *     throw new Error()
 *   }),
 *   none
 * )
 * assert.deepStrictEqual(tryCatch(() => 1), some(1))
 *
 * @since 1.0.0
 */
export declare const tryCatch: <A>(f: Lazy<A>) => Option<A>;
/**
 * Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
 * value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromEither } from 'fp-ts/lib/Option'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(left(1)), none)
 * assert.deepStrictEqual(fromEither(right(1)), some(1))
 *
 * @since 1.0.0
 */
export declare const fromEither: <L, A>(fa: Either<L, A>) => Option<A>;
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isSome: <A>(fa: Option<A>) => fa is Some<A>;
/**
 * Returns `true` if the option is `None`, `false` otherwise
 *
 * @since 1.0.0
 */
export declare const isNone: <A>(fa: Option<A>) => fa is None<A>;
/**
 * Use {@link fromPredicate} instead.
 * Refinement version of {@link fromPredicate}
 *
 * @since 1.3.0
 * @deprecated
 */
export declare const fromRefinement: <A, B extends A>(refinement: Refinement<A, B>) => (a: A) => Option<B>;
/**
 * Returns a refinement from a prism.
 * This function ensures that a custom type guard definition is type-safe.
 *
 * ```ts
 * import { some, none, getRefinement } from 'fp-ts/lib/Option'
 *
 * type A = { type: 'A' }
 * type B = { type: 'B' }
 * type C = A | B
 *
 * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
 * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
 * ```
 *
 * @since 1.7.0
 */
export declare const getRefinement: <A, B extends A>(getOption: (a: A) => Option<B>) => Refinement<A, B>;
/**
 * @since 1.0.0
 */
export declare const option: Monad1<URI> & Foldable2v1<URI> & Plus1<URI> & Traversable2v1<URI> & Alternative1<URI> & Extend1<URI> & Compactable1<URI> & Filterable1<URI> & Witherable1<URI>;
