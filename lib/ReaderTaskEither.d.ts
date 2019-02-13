import { Alt3 } from './Alt';
import { Bifunctor3 } from './Bifunctor';
import { Either } from './Either';
import { Predicate, Refinement } from './function';
import { IO } from './IO';
import { IOEither } from './IOEither';
import { Monad3 } from './Monad';
import { MonadIO3 } from './MonadIO';
import { Reader } from './Reader';
import { Task } from './Task';
import * as taskEither from './TaskEither';
import TaskEither = taskEither.TaskEither;
import { MonadTask3 } from './MonadTask';
declare module './HKT' {
    interface URI2HKT3<U, L, A> {
        ReaderTaskEither: ReaderTaskEither<U, L, A>;
    }
}
export declare const URI = "ReaderTaskEither";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor ReaderTaskEither
 * @since 1.6.0
 */
export declare class ReaderTaskEither<E, L, A> {
    readonly value: (e: E) => TaskEither<L, A>;
    readonly _A: A;
    readonly _L: L;
    readonly _U: E;
    readonly _URI: URI;
    constructor(value: (e: E) => TaskEither<L, A>);
    /** Runs the inner `TaskEither` */
    run(e: E): Promise<Either<L, A>>;
    map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B>;
    ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B>;
    /**
     * Flipped version of {@link ap}
     */
    ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C>;
    /**
     * Combine two effectful actions, keeping only the result of the first
     */
    applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A>;
    /**
     * Combine two effectful actions, keeping only the result of the second
     */
    applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>;
    chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>;
    fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>>;
    mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A>;
    /**
     * Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`
     */
    orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A>;
    alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B>;
    /**
     * @since 1.6.1
     */
    local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A>;
}
/**
 * @since 1.6.0
 */
export declare const ask: <E, L>() => ReaderTaskEither<E, L, E>;
/**
 * @since 1.6.0
 */
export declare const asks: <E, L, A>(f: (e: E) => A) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const local: <E, E2 = E>(f: (e: E2) => E) => <L, A>(fa: ReaderTaskEither<E, L, A>) => ReaderTaskEither<E2, L, A>;
/**
 * @since 1.6.0
 */
export declare const right: <E, L, A>(fa: Task<A>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const left: <E, L, A>(fa: Task<L>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const fromTaskEither: <E, L, A>(fa: taskEither.TaskEither<L, A>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const fromReader: <E, L, A>(fa: Reader<E, A>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const fromEither: <E, L, A>(fa: Either<L, A>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const fromIO: <E, L, A>(fa: IO<A>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const fromLeft: <E, L, A>(l: L) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const fromIOEither: <E, L, A>(fa: IOEither<L, A>) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare function fromPredicate<E, L, A, B extends A>(predicate: Refinement<A, B>, onFalse: (a: A) => L): ((a: A) => ReaderTaskEither<E, L, B>);
export declare function fromPredicate<E, L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => ReaderTaskEither<E, L, A>);
/**
 * @since 1.6.0
 */
export declare const tryCatch: <E, L, A>(f: (e: E) => Promise<A>, onrejected: (reason: unknown, e: E) => L) => ReaderTaskEither<E, L, A>;
/**
 * @since 1.6.0
 */
export declare const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI>;
/**
 * Like {@link readerTaskEither} but `ap` is sequential
 * @since 1.10.0
 */
export declare const readerTaskEitherSeq: typeof readerTaskEither;
