import { Ring } from './Ring';
import { Setoid } from './Setoid';
/**
 * @typeclass
 * @since 1.0.0
 */
export interface Field<A> extends Ring<A> {
    readonly degree: (a: A) => number;
    readonly div: (x: A, y: A) => A;
    readonly mod: (x: A, y: A) => A;
}
/**
 * @since 1.0.0
 */
export declare const fieldNumber: Field<number>;
/**
 * The *greatest common divisor* of two values
 *
 * @since 1.0.0
 */
export declare const gcd: <A>(S: Setoid<A>, field: Field<A>) => (x: A, y: A) => A;
/**
 * The *least common multiple* of two values
 *
 * @since 1.0.0
 */
export declare const lcm: <A>(S: Setoid<A>, F: Field<A>) => (x: A, y: A) => A;