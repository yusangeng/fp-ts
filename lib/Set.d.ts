import { Either } from './Either';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Setoid } from './Setoid';
import { Predicate, Refinement } from './function';
import { Separated } from './Compactable';
import { Option } from './Option';
/**
 * @since 1.14.0
 */
export declare const empty: Set<never>;
/**
 * @since 1.0.0
 */
export declare const toArray: <A>(O: Ord<A>) => (x: Set<A>) => A[];
/**
 * @since 1.0.0
 */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Set<A>>;
/**
 * @since 1.0.0
 */
export declare const some: <A>(x: Set<A>, predicate: Predicate<A>) => boolean;
/**
 * Projects a Set through a function
 *
 * @since 1.2.0
 */
export declare const map: <B>(S: Setoid<B>) => <A>(set: Set<A>, f: (x: A) => B) => Set<B>;
/**
 * @since 1.0.0
 */
export declare const every: <A>(x: Set<A>, predicate: Predicate<A>) => boolean;
/**
 * @since 1.2.0
 */
export declare const chain: <B>(S: Setoid<B>) => <A>(set: Set<A>, f: (x: A) => Set<B>) => Set<B>;
/**
 * `true` if and only if every element in the first set is an element of the second set
 *
 * @since 1.0.0
 */
export declare const subset: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => boolean;
/**
 * @since 1.0.0
 */
export declare function filter<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Set<B>;
export declare function filter<A>(x: Set<A>, predicate: Predicate<A>): Set<A>;
/**
 * @since 1.2.0
 */
export declare function partition<A, B extends A>(x: Set<A>, predicate: Refinement<A, B>): Separated<Set<A>, Set<B>>;
export declare function partition<A>(x: Set<A>, predicate: Predicate<A>): Separated<Set<A>, Set<A>>;
/**
 * Use {@link isMember} instead
 * @since 1.0.0
 * @deprecated
 */
export declare const member: <A>(S: Setoid<A>) => (set: Set<A>) => (a: A) => boolean;
/**
 * Test if a value is a member of a set
 *
 * @since 1.14.0
 */
export declare const isMember: <A>(S: Setoid<A>) => (a: A, x: Set<A>) => boolean;
/**
 * Form the union of two sets
 *
 * @since 1.0.0
 */
export declare const union: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * The set of elements which are in both the first and second set
 *
 * @since 1.0.0
 */
export declare const intersection: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * @since 1.2.0
 */
export declare const partitionMap: <L, R>(SL: Setoid<L>, SR: Setoid<R>) => <A>(x: Set<A>, f: (a: A) => Either<L, R>) => Separated<Set<L>, Set<R>>;
/**
 * Use {@link difference2v} instead
 *
 * @since 1.0.0
 * @deprecated
 */
export declare const difference: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * Form the set difference (`x` - `y`)
 *
 * @example
 * import { difference2v } from 'fp-ts/lib/Set'
 * import { setoidNumber } from 'fp-ts/lib/Setoid'
 *
 * assert.deepStrictEqual(difference2v(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
 *
 *
 * @since 1.12.0
 */
export declare const difference2v: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * @since 1.0.0
 */
export declare const getUnionMonoid: <A>(S: Setoid<A>) => Monoid<Set<A>>;
/**
 * @since 1.0.0
 */
export declare const getIntersectionSemigroup: <A>(S: Setoid<A>) => Semigroup<Set<A>>;
/**
 * @since 1.0.0
 */
export declare const reduce: <A>(O: Ord<A>) => <B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * Create a set with one element
 *
 * @since 1.0.0
 */
export declare const singleton: <A>(a: A) => Set<A>;
/**
 * Insert a value into a set
 *
 * @since 1.0.0
 */
export declare const insert: <A>(S: Setoid<A>) => (a: A, x: Set<A>) => Set<A>;
/**
 * Delete a value from a set
 *
 * @since 1.0.0
 */
export declare const remove: <A>(S: Setoid<A>) => (a: A, x: Set<A>) => Set<A>;
/**
 * Create a set from an array
 *
 * @since 1.2.0
 */
export declare const fromArray: <A>(S: Setoid<A>) => (as: A[]) => Set<A>;
/**
 * @since 1.12.0
 */
export declare const compact: <A>(S: Setoid<A>) => (fa: Set<Option<A>>) => Set<A>;
/**
 * @since 1.12.0
 */
export declare const separate: <L, R>(SL: Setoid<L>, SR: Setoid<R>) => (fa: Set<Either<L, R>>) => Separated<Set<L>, Set<R>>;
/**
 * @since 1.12.0
 */
export declare const filterMap: <B>(S: Setoid<B>) => <A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>;
