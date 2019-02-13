var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Ord", "./function"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ord_1 = require("./Ord");
    var function_1 = require("./function");
    /**
     * @since 1.0.0
     */
    exports.fold = function (S) { return function (a) { return function (as) {
        return as.reduce(S.concat, a);
    }; }; };
    /**
     * @since 1.0.0
     */
    exports.getFirstSemigroup = function () {
        return { concat: function_1.identity };
    };
    /**
     * @since 1.0.0
     */
    exports.getLastSemigroup = function () {
        return { concat: function (_, y) { return y; } };
    };
    /**
     * @since 1.0.0
     */
    exports.getProductSemigroup = function (SA, SB) {
        return {
            concat: function (_a, _b) {
                var xa = _a[0], xb = _a[1];
                var ya = _b[0], yb = _b[1];
                return [SA.concat(xa, ya), SB.concat(xb, yb)];
            }
        };
    };
    /**
     * @since 1.0.0
     */
    exports.getDualSemigroup = function (S) {
        return {
            concat: function (x, y) { return S.concat(y, x); }
        };
    };
    /**
     * @since 1.0.0
     */
    exports.getFunctionSemigroup = function (S) { return function () {
        return {
            concat: function (f, g) { return function (a) { return S.concat(f(a), g(a)); }; }
        };
    }; };
    /**
     * @since 1.0.0
     */
    exports.getRecordSemigroup = function (semigroups) {
        return {
            concat: function (x, y) {
                var r = {};
                var keys = Object.keys(semigroups);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    r[key] = semigroups[key].concat(x[key], y[key]);
                }
                return r;
            }
        };
    };
    /**
     * @since 1.0.0
     */
    exports.getMeetSemigroup = function (O) {
        return {
            concat: Ord_1.min(O)
        };
    };
    /**
     * @since 1.0.0
     */
    exports.getJoinSemigroup = function (O) {
        return {
            concat: Ord_1.max(O)
        };
    };
    /**
     * Boolean semigroup under conjunction
     * @since 1.0.0
     */
    exports.semigroupAll = {
        concat: function (x, y) { return x && y; }
    };
    /**
     * Boolean semigroup under disjunction
     * @since 1.0.0
     */
    exports.semigroupAny = {
        concat: function (x, y) { return x || y; }
    };
    /**
     * Use {@link Monoid}'s `getArrayMonoid` instead
     * @since 1.0.0
     * @deprecated
     */
    exports.getArraySemigroup = function () {
        return { concat: function_1.concat };
    };
    function getDictionarySemigroup(S) {
        return {
            concat: function (x, y) {
                var r = __assign({}, x);
                var keys = Object.keys(y);
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    var k = keys[i];
                    r[k] = x.hasOwnProperty(k) ? S.concat(x[k], y[k]) : y[k];
                }
                return r;
            }
        };
    }
    exports.getDictionarySemigroup = getDictionarySemigroup;
    // tslint:disable-next-line: deprecation
    var semigroupAnyDictionary = getDictionarySemigroup(exports.getLastSemigroup());
    /**
     * Returns a {@link Semigroup} instance for objects preserving their type
     *
     * @example
     * import { getObjectSemigroup } from 'fp-ts/lib/Semigroup'
     *
     * interface Person {
     *   name: string
     *   age: number
     * }
     *
     * const S = getObjectSemigroup<Person>()
     * assert.deepStrictEqual(S.concat({ name: 'name', age: 23 }, { name: 'name', age: 24 }), { name: 'name', age: 24 })
     *
     * @since 1.4.0
     */
    exports.getObjectSemigroup = function () {
        return semigroupAnyDictionary;
    };
    /**
     * Number `Semigroup` under addition
     * @since 1.0.0
     */
    exports.semigroupSum = {
        concat: function (x, y) { return x + y; }
    };
    /**
     * Number `Semigroup` under multiplication
     * @since 1.0.0
     */
    exports.semigroupProduct = {
        concat: function (x, y) { return x * y; }
    };
    /**
     * @since 1.0.0
     */
    exports.semigroupString = {
        concat: function (x, y) { return x + y; }
    };
    /**
     * @since 1.0.0
     */
    exports.semigroupVoid = {
        concat: function () { return undefined; }
    };
});
