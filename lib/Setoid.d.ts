/**
 * The `Setoid` type class represents types which support decidable equality.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Reflexivity: `S.equals(a, a) === true`
 * 2. Symmetry: `S.equals(a, b) === S.equals(b, a)`
 * 3. Transitivity: if `S.equals(a, b) === true` and `S.equals(b, c) === true`, then `S.equals(a, c) === true`
 *
 * @typeclass
 * @since 1.0.0
 */
export interface Setoid<A> {
    readonly equals: (x: A, y: A) => boolean;
}
/**
 * @since 1.14.0
 */
export declare const fromEquals: <A>(equals: (x: A, y: A) => boolean) => Setoid<A>;
/**
 * @since 1.0.0
 */
export declare const strictEqual: <A>(a: A, b: A) => boolean;
/**
 * @since 1.0.0
 */
export declare const setoidString: Setoid<string>;
/**
 * @since 1.0.0
 */
export declare const setoidNumber: Setoid<number>;
/**
 * @since 1.0.0
 */
export declare const setoidBoolean: Setoid<boolean>;
/**
 * @since 1.0.0
 */
export declare const getArraySetoid: <A>(S: Setoid<A>) => Setoid<A[]>;
/**
 * @since 1.0.0
 */
export declare const getRecordSetoid: <O extends {
    [key: string]: any;
}>(setoids: { [K in keyof O]: Setoid<O[K]>; }) => Setoid<O>;
/**
 * @since 1.0.0
 */
export declare const getProductSetoid: <A, B>(SA: Setoid<A>, SB: Setoid<B>) => Setoid<[A, B]>;
/**
 * Returns the `Setoid` corresponding to the partitions of `B` induced by `f`
 *
 * @since 1.2.0
 */
export declare const contramap: <A, B>(f: (b: B) => A, fa: Setoid<A>) => Setoid<B>;
/**
 * @since 1.4.0
 */
export declare const setoidDate: Setoid<Date>;
