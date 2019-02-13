import { Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Option } from './Option';
import { Traversable1 } from './Traversable';
/**
 * This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.
 *
 * @typeclass
 * @since 1.0.0
 */
export interface Unfoldable<F> {
    readonly URI: F;
    readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>;
}
export interface Unfoldable1<F extends URIS> {
    readonly URI: F;
    readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type<F, A>;
}
export interface Unfoldable2<F extends URIS2> {
    readonly URI: F;
    readonly unfoldr: <L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>;
}
export interface Unfoldable3<F extends URIS3> {
    readonly URI: F;
    readonly unfoldr: <U, L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>;
}
export interface Unfoldable2C<F extends URIS2, L> {
    readonly URI: F;
    readonly _L: L;
    readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>;
}
export interface Unfoldable3C<F extends URIS3, U, L> {
    readonly URI: F;
    readonly _L: L;
    readonly _U: U;
    readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>;
}
/**
 * Replicate a value some natural number of times.
 *
 * @example
 * import { replicate } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(replicate(array)('s', 2), ['s', 's'])
 *
 * @since 1.0.0
 */
export declare function replicate<F extends URIS3>(U: Unfoldable3<F>): <U, L, A>(a: A, n: number) => Type3<F, U, L, A>;
export declare function replicate<F extends URIS3, U, L>(U: Unfoldable3C<F, U, L>): <A>(a: A, n: number) => Type3<F, U, L, A>;
export declare function replicate<F extends URIS2>(U: Unfoldable2<F>): <L, A>(a: A, n: number) => Type2<F, L, A>;
export declare function replicate<F extends URIS2, L>(U: Unfoldable2C<F, L>): <A>(a: A, n: number) => Type2<F, L, A>;
export declare function replicate<F extends URIS>(U: Unfoldable<F>): <A>(a: A, n: number) => Type<F, A>;
export declare function replicate<F>(U: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>;
/**
 * The container with no elements - unfolded with zero iterations.
 *
 * @example
 * import { empty } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(empty(array), [])
 *
 * @since 1.0.0
 */
export declare function empty<F extends URIS3, U, L, A>(U: Unfoldable3<F> | Unfoldable3C<F, U, L>): Type3<F, U, L, A>;
export declare function empty<F extends URIS2, L, A>(U: Unfoldable2<F> | Unfoldable2C<F, L>): Type2<F, L, A>;
export declare function empty<F extends URIS, A>(U: Unfoldable1<F>): Type<F, A>;
export declare function empty<F, A>(U: Unfoldable<F>): HKT<F, A>;
/**
 * Contain a single value
 *
 * @example
 * import { singleton } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(singleton(array)(1), [1])
 *
 * @since 1.0.0
 */
export declare function singleton<F extends URIS3>(U: Unfoldable3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>;
export declare function singleton<F extends URIS3, U, L>(U: Unfoldable3C<F, U, L>): <A>(a: A) => Type3<F, U, L, A>;
export declare function singleton<F extends URIS2>(U: Unfoldable2<F>): <L, A>(a: A) => Type2<F, L, A>;
export declare function singleton<F extends URIS2, L>(U: Unfoldable2C<F, L>): <A>(a: A) => Type2<F, L, A>;
export declare function singleton<F extends URIS>(U: Unfoldable1<F>): <A>(a: A) => Type<F, A>;
export declare function singleton<F>(U: Unfoldable<F>): <A>(a: A) => HKT<F, A>;
/**
 * Perform an Applicative action `n` times, and accumulate all the results
 *
 * @example
 * import { replicateA } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 * import { option, some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
 * assert.deepStrictEqual(replicateA(option, array)(2, none), none)
 *
 * @since 1.0.0
 */
export declare function replicateA<F extends URIS3, T extends URIS>(A: Applicative3<F>, UT: Unfoldable1<T> & Traversable1<T>): <U, L, A>(n: number, ma: Type3<F, U, L, A>) => Type3<F, U, L, Type<T, A>>;
export declare function replicateA<F extends URIS3, T extends URIS, U, L>(A: Applicative3C<F, U, L>, UT: Unfoldable1<T> & Traversable1<T>): <A>(n: number, ma: Type3<F, U, L, A>) => Type3<F, U, L, Type<T, A>>;
export declare function replicateA<F extends URIS2, T extends URIS>(A: Applicative2<F>, UT: Unfoldable1<T> & Traversable1<T>): <L, A>(n: number, ma: Type2<F, L, A>) => Type2<F, L, Type<T, A>>;
export declare function replicateA<F extends URIS2, T extends URIS, L>(A: Applicative2C<F, L>, UT: Unfoldable1<T> & Traversable1<T>): <A>(n: number, ma: Type2<F, L, A>) => Type2<F, L, Type<T, A>>;
export declare function replicateA<F extends URIS, T extends URIS>(F: Applicative1<F>, UT: Unfoldable1<T> & Traversable1<T>): <A>(n: number, ma: Type<F, A>) => Type<F, Type<T, A>>;