import { Applicative2C } from './Applicative';
import { Apply2C } from './Apply';
import { Bifunctor2 } from './Bifunctor';
import { Chain2C } from './Chain';
import { ChainRec2C } from './ChainRec';
import { Comonad2 } from './Comonad';
import { Foldable2v2 } from './Foldable2v';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
import { Ord } from './Ord';
import { Semigroup } from './Semigroup';
import { Semigroupoid2 } from './Semigroupoid';
import { Setoid } from './Setoid';
import { Traversable2v2 } from './Traversable2v';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Tuple: Tuple<L, A>;
    }
}
export declare const URI = "Tuple";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Tuple
 * @since 1.0.0
 */
export declare class Tuple<L, A> {
    readonly fst: L;
    readonly snd: A;
    readonly _A: A;
    readonly _L: L;
    readonly _URI: URI;
    constructor(fst: L, snd: A);
    compose<B>(ab: Tuple<A, B>): Tuple<L, B>;
    map<B>(f: (a: A) => B): Tuple<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B>;
    extract(): A;
    extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /** Exchange the first and second components of a tuple */
    swap(): Tuple<A, L>;
    inspect(): string;
    toString(): string;
    toTuple(): [L, A];
}
/**
 * @since 1.0.0
 */
export declare const getSetoid: <L, A>(SA: Setoid<L>, SB: Setoid<A>) => Setoid<Tuple<L, A>>;
/**
 * To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
 * `snd`s are `compare`d.
 *
 * @since 1.0.0
 */
export declare const getOrd: <L, A>(OL: Ord<L>, OA: Ord<A>) => Ord<Tuple<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getSemigroup: <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => Semigroup<Tuple<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getMonoid: <L, A>(ML: Monoid<L>, MA: Monoid<A>) => Monoid<Tuple<L, A>>;
/**
 * @since 1.0.0
 */
export declare const getApply: <L>(S: Semigroup<L>) => Apply2C<"Tuple", L>;
/**
 * @since 1.0.0
 */
export declare const getApplicative: <L>(M: Monoid<L>) => Applicative2C<"Tuple", L>;
/**
 * @since 1.0.0
 */
export declare const getChain: <L>(S: Semigroup<L>) => Chain2C<"Tuple", L>;
/**
 * @since 1.0.0
 */
export declare const getMonad: <L>(M: Monoid<L>) => Monad2C<"Tuple", L>;
/**
 * @since 1.0.0
 */
export declare const getChainRec: <L>(M: Monoid<L>) => ChainRec2C<"Tuple", L>;
/**
 * @since 1.0.0
 */
export declare const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI>;