import { Alternative1 } from './Alternative';
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative';
import { Compactable1, Separated } from './Compactable';
import { Either } from './Either';
import { Extend1 } from './Extend';
import { FilterableWithIndex1 } from './FilterableWithIndex';
import { Foldable2v1 } from './Foldable2v';
import { FoldableWithIndex1 } from './FoldableWithIndex';
import { Endomorphism, Predicate, Refinement } from './function';
import { FunctorWithIndex1 } from './FunctorWithIndex';
import { HKT, Type, Type2, Type3, URIS, URIS2, URIS3 } from './HKT';
import { Monad1 } from './Monad';
import { Monoid } from './Monoid';
import { Option } from './Option';
import { Ord } from './Ord';
import { Plus1 } from './Plus';
import { Setoid } from './Setoid';
import { TraversableWithIndex1 } from './TraversableWithIndex';
import { Unfoldable1 } from './Unfoldable';
import { Witherable1 } from './Witherable';
declare global {
    interface Array<T> {
        /** phantom property added by `fp-ts` */
        _URI: URI;
        /** phantom property added by `fp-ts` */
        _A: T;
    }
}
declare module './HKT' {
    interface URI2HKT<A> {
        Array: Array<A>;
    }
}
export declare const URI = "Array";
export declare type URI = typeof URI;
/**
 *
 * @example
 * import { getMonoid } from 'fp-ts/lib/Array'
 *
 * const M = getMonoid<number>()
 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
 *
 * @since 1.0.0
 */
export declare const getMonoid: <A = never>() => Monoid<A[]>;
/**
 * Derives a Setoid over the Array of a given element type from the Setoid of that type. The derived setoid defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given setoid `S`. In case of
 * arrays of different lengths, the result is non equality.
 *
 *
 * @example
 * import { ordString } from 'fp-ts/lib/Ord'
 * import { getSetoid } from 'fp-ts/lib/Array'
 *
 * const O = getSetoid(ordString)
 * assert.strictEqual(O.equals(['a', 'b'], ['a', 'b']), true)
 * assert.strictEqual(O.equals(['a'], []), false)
 *
 * @since 1.0.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<A[]>;
/**
 * Derives an `Ord` over the Array of a given element type from the `Ord` of that type. The ordering between two such
 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
 * the same length, the result is equality.
 *
 *
 * @example
 * import { getOrd } from 'fp-ts/lib/Array'
 * import { ordString } from 'fp-ts/lib/Ord'
 *
 * const O = getOrd(ordString)
 * assert.strictEqual(O.compare(['b'], ['a']), 1)
 * assert.strictEqual(O.compare(['a'], ['a']), 0)
 * assert.strictEqual(O.compare(['a'], ['b']), -1)
 *
 *
 * @since 1.2.0
 */
export declare const getOrd: <A>(O: Ord<A>) => Ord<A[]>;
/**
 * Use {@link array}`.traverse` instead
 *
 * @since 1.0.0
 * @deprecated
 */
export declare function traverse<F extends URIS3>(F: Applicative3<F>): <U, L, A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>;
export declare function traverse<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): <A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>;
export declare function traverse<F extends URIS2>(F: Applicative2<F>): <L, A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>;
export declare function traverse<F extends URIS2, L>(F: Applicative2C<F, L>): <A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>;
export declare function traverse<F extends URIS>(F: Applicative1<F>): <A, B>(ta: Array<A>, f: (a: A) => Type<F, B>) => Type<F, Array<B>>;
export declare function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>;
/**
 * An empty array
 *
 *
 * @since 1.9.0
 */
export declare const empty: Array<never>;
/**
 * Return a list of length `n` with element `i` initialized with `f(i)`
 *
 * @example
 * import { makeBy } from 'fp-ts/lib/Array'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 *
 * @since 1.10.0
 */
export declare const makeBy: <A>(n: number, f: (i: number) => A) => A[];
/**
 * Create an array containing a range of integers, including both endpoints
 *
 * @example
 * import { range } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
 *
 *
 * @since 1.10.0
 */
export declare const range: (start: number, end: number) => number[];
/**
 * Create an array containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 *
 * @since 1.10.0
 */
export declare const replicate: <A>(n: number, a: A) => A[];
/**
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
 *
 * @since 1.0.0
 */
export declare const flatten: <A>(ffa: A[][]) => A[];
/**
 * Break an array into its first element and remaining elements
 *
 * @example
 * import { fold } from 'fp-ts/lib/Array'
 *
 * const len = <A>(as: Array<A>): number => fold(as, 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @since 1.0.0
 */
export declare const fold: <A, B>(as: A[], b: B, cons: (head: A, tail: A[]) => B) => B;
/**
 * Lazy version of {@link fold}
 *
 * @since 1.0.0
 */
export declare const foldL: <A, B>(as: A[], nil: () => B, cons: (head: A, tail: A[]) => B) => B;
/**
 * Break an array into its initial elements and the last element
 *
 * @since 1.7.0
 * @param as
 * @param b
 * @param cons
 */
export declare const foldr: <A, B>(as: A[], b: B, cons: (init: A[], last: A) => B) => B;
/**
 * Lazy version of {@link foldr}
 *
 * @since 1.7.0
 * @param as
 * @param nil
 * @param cons
 */
export declare const foldrL: <A, B>(as: A[], nil: () => B, cons: (init: A[], last: A) => B) => B;
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(scanLeft([1, 2, 3], 10, (b, a) => b - a), [ 10, 9, 7, 4 ])
 * ```
 *
 *
 * @since 1.1.0
 */
export declare const scanLeft: <A, B>(as: A[], b: B, f: (b: B, a: A) => B) => B[];
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * @example
 * import { scanRight } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(scanRight([1, 2, 3], 10, (a, b) => b - a), [ 4, 5, 7, 10 ])
 *
 *
 * @since 1.1.0
 */
export declare const scanRight: <A, B>(as: A[], b: B, f: (a: A, b: B) => B) => B[];
/**
 * Test whether an array is empty
 *
 * @example
 * import { isEmpty } from 'fp-ts/lib/Array'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 1.0.0
 */
export declare const isEmpty: <A>(as: A[]) => boolean;
/**
 * Test whether an array contains a particular index
 *
 * @since 1.0.0
 */
export declare const isOutOfBound: <A>(i: number, as: A[]) => boolean;
/**
 * This function provides a safe way to read a value at a particular index from an array
 *
 * @example
 * import { lookup } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(lookup(1, [1, 2, 3]), some(2))
 * assert.deepStrictEqual(lookup(3, [1, 2, 3]), none)
 *
 * @since 1.14.0
 */
export declare const lookup: <A>(i: number, as: A[]) => Option<A>;
/**
 * Use {@link lookup} instead
 * @since 1.0.0
 * @deprecated
 */
export declare const index: <A>(i: number, as: A[]) => Option<A>;
/**
 * Attaches an element to the front of an array, creating a new array
 *
 * @example
 * import { cons } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(cons(0, [1, 2, 3]), [0, 1, 2, 3])
 *
 * @since 1.0.0
 */
export declare const cons: <A>(a: A, as: A[]) => A[];
/**
 * Append an element to the end of an array, creating a new array
 *
 * @example
 * import { snoc } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
 *
 * @since 1.0.0
 */
export declare const snoc: <A>(as: A[], a: A) => A[];
/**
 * Get the first element in an array, or `None` if the array is empty
 *
 * @example
 * import { head } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 1.0.0
 */
export declare const head: <A>(as: A[]) => Option<A>;
/**
 * Get the last element in an array, or `None` if the array is empty
 *
 * @example
 * import { last } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 1.0.0
 */
export declare const last: <A>(as: A[]) => Option<A>;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { tail } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 1.0.0
 */
export declare const tail: <A>(as: A[]) => Option<A[]>;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * @example
 * import { init } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 1.0.0
 */
export declare const init: <A>(as: A[]) => Option<A[]>;
/**
 * Keep only a number of elements from the start of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { take } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(take(2, [1, 2, 3]), [1, 2])
 *
 * @since 1.0.0
 */
export declare const take: <A>(n: number, as: A[]) => A[];
/**
 * Keep only a number of elements from the end of an array, creating a new array.
 * `n` must be a natural number
 *
 * @example
 * import { takeEnd } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(takeEnd(2, [1, 2, 3, 4, 5]), [4, 5])
 *
 *
 * @since 1.10.0
 */
export declare const takeEnd: <A>(n: number, as: A[]) => A[];
/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { takeWhile } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(takeWhile([2, 4, 3, 6], n => n % 2 === 0), [2, 4])
 *
 * @since 1.0.0
 */
export declare function takeWhile<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Array<B>;
export declare function takeWhile<A>(as: Array<A>, predicate: Predicate<A>): Array<A>;
/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { span } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(span([1, 3, 2, 4, 5], n => n % 2 === 1), { init: [1, 3], rest: [2, 4, 5] })
 *
 * @since 1.0.0
 */
export declare function span<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): {
    init: Array<B>;
    rest: Array<A>;
};
export declare function span<A>(as: Array<A>, predicate: Predicate<A>): {
    init: Array<A>;
    rest: Array<A>;
};
/**
 * Drop a number of elements from the start of an array, creating a new array
 *
 * @example
 * import { drop } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(drop(2, [1, 2, 3]), [3])
 *
 * @since 1.0.0
 */
export declare const drop: <A>(n: number, as: A[]) => A[];
/**
 * Drop a number of elements from the end of an array, creating a new array
 *
 * @example
 * import { dropEnd } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(dropEnd(2, [1, 2, 3, 4, 5]), [1, 2, 3])
 *
 *
 * @since 1.10.0
 */
export declare const dropEnd: <A>(n: number, as: A[]) => A[];
/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
 *
 * @example
 * import { dropWhile } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(dropWhile([1, 3, 2, 4, 5], n => n % 2 === 1), [2, 4, 5])
 *
 * @since 1.0.0
 */
export declare const dropWhile: <A>(as: A[], predicate: Predicate<A>) => A[];
/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(findIndex([1, 2, 3], x => x === 2), some(1))
 * assert.deepStrictEqual(findIndex([], x => x === 2), none)
 *
 * @since 1.0.0
 */
export declare const findIndex: <A>(as: A[], predicate: Predicate<A>) => Option<number>;
/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * @example
 * import { findFirst } from 'fp-ts/lib/Array'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(findFirst([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 1 }))
 *
 * @since 1.0.0
 */
export declare function findFirst<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Option<B>;
export declare function findFirst<A>(as: Array<A>, predicate: Predicate<A>): Option<A>;
/**
 * Find the last element which satisfies a predicate function
 *
 * @example
 * import { findLast } from 'fp-ts/lib/Array'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(findLast([{ a: 1, b: 1 }, { a: 1, b: 2 }], x => x.a === 1), some({ a: 1, b: 2 }))
 *
 * @since 1.0.0
 */
export declare function findLast<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Option<B>;
export declare function findLast<A>(as: Array<A>, predicate: Predicate<A>): Option<A>;
/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex(xs, x => x.a === 1), some(1))
 * assert.deepStrictEqual(findLastIndex(xs, x => x.a === 4), none)
 *
 *
 * @since 1.10.0
 */
export declare const findLastIndex: <A>(as: A[], predicate: Predicate<A>) => Option<number>;
/**
 * Use {@link filter} instead
 *
 * @since 1.0.0
 * @deprecated
 */
export declare const refine: <A, B extends A>(as: A[], refinement: Refinement<A, B>) => B[];
/**
 *
 * @since 1.0.0
 */
export declare const copy: <A>(as: A[]) => A[];
/**
 *
 * @since 1.0.0
 */
export declare const unsafeInsertAt: <A>(i: number, a: A, as: A[]) => A[];
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { insertAt } from 'fp-ts/lib/Array'
 * import { some } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5, [1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 1.0.0
 */
export declare const insertAt: <A>(i: number, a: A, as: A[]) => Option<A[]>;
/**
 *
 * @since 1.0.0
 */
export declare const unsafeUpdateAt: <A>(i: number, a: A, as: A[]) => A[];
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { updateAt } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1, [1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1, []), none)
 *
 * @since 1.0.0
 */
export declare const updateAt: <A>(i: number, a: A, as: A[]) => Option<A[]>;
/**
 *
 * @since 1.0.0
 */
export declare const unsafeDeleteAt: <A>(i: number, as: A[]) => A[];
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * @example
 * import { deleteAt } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(deleteAt(0, [1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1, []), none)
 *
 * @since 1.0.0
 */
export declare const deleteAt: <A>(i: number, as: A[]) => Option<A[]>;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * @example
 * import { modifyAt } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt([1, 2, 3], 1, double), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt([], 1, double), none)
 *
 * @since 1.0.0
 */
export declare const modifyAt: <A>(as: A[], i: number, f: Endomorphism<A>) => Option<A[]>;
/**
 * Reverse an array, creating a new array
 *
 * @example
 * import { reverse } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 1.0.0
 */
export declare const reverse: <A>(as: A[]) => A[];
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * @example
 * import { rights } from 'fp-ts/lib/Array'
 * import { right, left } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @since 1.0.0
 */
export declare const rights: <L, A>(as: Either<L, A>[]) => A[];
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/lib/Array'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @since 1.0.0
 */
export declare const lefts: <L, A>(as: Either<L, A>[]) => L[];
/**
 * Sort the elements of an array in increasing order, creating a new array
 *
 * @example
 * import { sort } from 'fp-ts/lib/Array'
 * import { ordNumber } from 'fp-ts/lib/Ord'
 *
 * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
 *
 * @since 1.0.0
 */
export declare const sort: <A>(O: Ord<A>) => (as: A[]) => A[];
/**
 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
 * input array is short, excess elements of the longer array are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
 *
 * @since 1.0.0
 */
export declare const zipWith: <A, B, C>(fa: A[], fb: B[], f: (a: A, b: B) => C) => C[];
/**
 * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
 * longer array are discarded
 *
 * @example
 * import { zip } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(zip([1, 2, 3], ['a', 'b', 'c', 'd']), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @since 1.0.0
 */
export declare const zip: <A, B>(fa: A[], fb: B[]) => [A, B][];
/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 *
 * @example
 * import { unzip } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 *
 * @since 1.13.0
 */
export declare const unzip: <A, B>(as: [A, B][]) => [A[], B[]];
/**
 * Rotate an array to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(rotate(2, [1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @since 1.0.0
 */
export declare const rotate: <A>(n: number, xs: A[]) => A[];
/**
 * Test if a value is a member of an array. Takes a `Setoid<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 *
 * @example
 * import { isMember } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.strictEqual(isMember(setoidNumber)(1, [1, 2, 3]), true)
 * assert.strictEqual(isMember(setoidNumber)(4, [1, 2, 3]), false)
 *
 * @since 1.14.0
 */
export declare const isMember: <A>(S: Setoid<A>) => (a: A, as: A[]) => boolean;
/**
 * Use {@link isMember} instead
 * @since 1.3.0
 * @deprecated
 */
export declare const member: <A>(S: Setoid<A>) => (as: A[], a: A) => boolean;
/**
 * Remove duplicates from an array, keeping the first occurance of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepStrictEqual(uniq(setoidNumber)([1, 2, 1]), [1, 2])
 *
 *
 * @since 1.3.0
 */
export declare const uniq: <A>(S: Setoid<A>) => (as: A[]) => A[];
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/lib/Array'
 * import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = contramap((p: Person) => p.name, ordString)
 * const byAge = contramap((p: Person) => p.age, ordNumber)
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * if (sortByNameByAge.isSome()) {
 *   const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 *   assert.deepStrictEqual(sortByNameByAge.value(persons), [
 *     { name: 'a', age: 1 },
 *     { name: 'b', age: 2 },
 *     { name: 'b', age: 3 },
 *     { name: 'c', age: 2 }
 *   ])
 * }
 *
 *
 * @since 1.3.0
 */
export declare const sortBy: <A>(ords: Ord<A>[]) => Option<Endomorphism<A[]>>;
/**
 * Non failing version of {@link sortBy}
 * @example
 * import { sortBy1 } from 'fp-ts/lib/Array'
 * import { contramap, ordString, ordNumber } from 'fp-ts/lib/Ord'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = contramap((p: Person) => p.name, ordString)
 * const byAge = contramap((p: Person) => p.age, ordNumber)
 *
 * const sortByNameByAge = sortBy1(byName, [byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 *
 * @since 1.3.0
 */
export declare const sortBy1: <A>(head: Ord<A>, tail: Ord<A>[]) => Endomorphism<A[]>;
/**
 * Apply a function to each element in an array, keeping only the results which contain a value, creating a new array.
 *
 * Alias of {@link Filterable}'s `filterMap`
 *
 * @example
 * import { mapOption } from 'fp-ts/lib/Array'
 * import { Option, some, none } from 'fp-ts/lib/Option'
 *
 * const f = (n: number): Option<number> => (n % 2 === 0 ? none : some(n))
 * assert.deepStrictEqual(mapOption([1, 2, 3], f), [1, 3])
 *
 * @since 1.0.0
 */
export declare const mapOption: <A, B>(as: A[], f: (a: A) => Option<B>) => B[];
/**
 * Filter an array of optional values, keeping only the elements which contain a value, creating a new array.
 *
 * Alias of {@link Compactable}'s `compact`
 *
 * @example
 * import { catOptions } from 'fp-ts/lib/Array'
 * import { some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(catOptions([some(1), none, some(3)]), [1, 3])
 *
 * @since 1.0.0
 */
export declare const catOptions: <A>(as: Option<A>[]) => A[];
/**
 * @example
 * import { array } from 'fp-ts/lib/Array'
 * import { left, right } from 'fp-ts/lib/Either'
 * import { identity } from 'fp-ts/lib/function'
 *
 * assert.deepStrictEqual(array.partitionMap([right(1), left('foo'), right(2)], identity), { left: ['foo'], right: [1, 2] })
 *
 * @since 1.0.0
 */
export declare const partitionMap: <A, L, R>(fa: A[], f: (a: A) => Either<L, R>) => Separated<L[], R[]>;
/**
 * Filter an array, keeping the elements which satisfy a predicate function, creating a new array
 *
 * @since 1.0.0
 */
export declare function filter<A, B extends A>(as: Array<A>, predicate: Refinement<A, B>): Array<B>;
export declare function filter<A>(as: Array<A>, predicate: Predicate<A>): Array<A>;
/**
 *
 * @since 1.12.0
 */
export declare function partition<A, B extends A>(fa: Array<A>, p: Refinement<A, B>): Separated<Array<A>, Array<B>>;
export declare function partition<A>(fa: Array<A>, p: Predicate<A>): Separated<Array<A>, Array<A>>;
/**
 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
 * value and the rest of the array.
 *
 * @example
 * import { Setoid, setoidNumber } from 'fp-ts/lib/Setoid'
 * import { chop, span } from 'fp-ts/lib/Array'
 *
 * const group = <A>(S: Setoid<A>) => (as: Array<A>): Array<Array<A>> => {
 *   return chop(as, as => {
 *     const { init, rest } = span(as, a => S.equals(a, as[0]))
 *     return [init, rest]
 *   })
 * }
 * assert.deepStrictEqual(group(setoidNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 *
 * @since 1.10.0
 */
export declare const chop: <A, B>(as: A[], f: (as: A[]) => [B, A[]]) => B[];
/**
 * Splits an array into two pieces, the first piece has `n` elements.
 *
 * @example
 * import { split } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(split(2, [1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 *
 * @since 1.10.0
 */
export declare const split: <A>(n: number, as: A[]) => [A[], A[]];
/**
 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the array. Note that `chunksOf([], n)` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(xs, n).concat(chunksOf(ys, n)) == chunksOf(xs.concat(ys)), n)
 * ```
 *
 * whenever `n` evenly divides the length of `xs`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(chunksOf([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]])
 *
 *
 * @since 1.10.0
 */
export declare const chunksOf: <A>(as: A[], n: number) => A[][];
/**
 * Array comprehension
 *
 * ```
 * [ g(x, y, ...) | x ← xs, y ← ys, ..., f(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/lib/Array'
 * import { tuple } from 'fp-ts/lib/function'
 *
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], (a, b) => (a + b.length) % 2 === 0, tuple), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 *
 * @since 1.10.0
 */
export declare function comprehension<A, B, C, D, R>(input: [Array<A>, Array<B>, Array<C>, Array<D>], f: (a: A, b: B, c: C, d: D) => boolean, g: (a: A, b: B, c: C, d: D) => R): Array<R>;
export declare function comprehension<A, B, C, R>(input: [Array<A>, Array<B>, Array<C>], f: (a: A, b: B, c: C) => boolean, g: (a: A, b: B, c: C) => R): Array<R>;
export declare function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g: (a: A) => R): Array<R>;
export declare function comprehension<A, B, R>(input: [Array<A>, Array<B>], f: (a: A, b: B) => boolean, g: (a: A, b: B) => R): Array<R>;
export declare function comprehension<A, R>(input: [Array<A>], f: (a: A) => boolean, g: (a: A) => R): Array<R>;
/**
 * Creates an array of unique values, in order, from all given arrays using a {@link Setoid} for equality comparisons
 *
 * @example
 * import { union } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepStrictEqual(union(setoidNumber)([1, 2], [2, 3]), [1, 2, 3])
 *
 *
 * @since 1.12.0
 */
export declare const union: <A>(S: Setoid<A>) => (xs: A[], ys: A[]) => A[];
/**
 * Creates an array of unique values that are included in all given arrays using a {@link Setoid} for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { intersection } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepStrictEqual(intersection(setoidNumber)([1, 2], [2, 3]), [2])
 *
 *
 * @since 1.12.0
 */
export declare const intersection: <A>(S: Setoid<A>) => (xs: A[], ys: A[]) => A[];
/**
 * Creates an array of array values not included in the other given array using a {@link Setoid} for equality
 * comparisons. The order and references of result values are determined by the first array.
 *
 * @example
 * import { difference } from 'fp-ts/lib/Array'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepStrictEqual(difference(setoidNumber)([1, 2], [2, 3]), [1])
 *
 *
 * @since 1.12.0
 */
export declare const difference: <A>(S: Setoid<A>) => (xs: A[], ys: A[]) => A[];
/**
 * @since 1.0.0
 */
export declare const array: Monad1<URI> & Foldable2v1<URI> & Unfoldable1<URI> & TraversableWithIndex1<URI, number> & Alternative1<URI> & Plus1<URI> & Extend1<URI> & Compactable1<URI> & FilterableWithIndex1<URI, number> & Witherable1<URI> & FunctorWithIndex1<URI, number> & FoldableWithIndex1<URI, number>;