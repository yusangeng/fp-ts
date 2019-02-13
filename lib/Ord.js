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
        define(["require", "exports", "./Ordering", "./Setoid", "./function"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Ordering_1 = require("./Ordering");
    var Setoid_1 = require("./Setoid");
    var function_1 = require("./function");
    /**
     * @since 1.0.0
     */
    exports.unsafeCompare = function (x, y) {
        return x < y ? -1 : x > y ? 1 : 0;
    };
    /**
     * @since 1.0.0
     */
    exports.ordString = __assign({}, Setoid_1.setoidString, { compare: exports.unsafeCompare });
    /**
     * @since 1.0.0
     */
    exports.ordNumber = __assign({}, Setoid_1.setoidNumber, { compare: exports.unsafeCompare });
    /**
     * @since 1.0.0
     */
    exports.ordBoolean = __assign({}, Setoid_1.setoidBoolean, { compare: exports.unsafeCompare });
    /**
     * Test whether one value is _strictly less than_ another
     *
     * @since 1.0.0
     */
    exports.lessThan = function (O) { return function (x, y) {
        return O.compare(x, y) === -1;
    }; };
    /**
     * Test whether one value is _strictly greater than_ another
     *
     * @since 1.0.0
     */
    exports.greaterThan = function (O) { return function (x, y) {
        return O.compare(x, y) === 1;
    }; };
    /**
     * Test whether one value is _non-strictly less than_ another
     *
     * @since 1.0.0
     */
    exports.lessThanOrEq = function (O) { return function (x, y) {
        return O.compare(x, y) !== 1;
    }; };
    /**
     * Test whether one value is _non-strictly greater than_ another
     *
     * @since 1.0.0
     */
    exports.greaterThanOrEq = function (O) { return function (x, y) {
        return O.compare(x, y) !== -1;
    }; };
    /**
     * Take the minimum of two values. If they are considered equal, the first argument is chosen
     *
     * @since 1.0.0
     */
    exports.min = function (O) { return function (x, y) {
        return O.compare(x, y) === 1 ? y : x;
    }; };
    /**
     * Take the maximum of two values. If they are considered equal, the first argument is chosen
     *
     * @since 1.0.0
     */
    exports.max = function (O) { return function (x, y) {
        return O.compare(x, y) === -1 ? y : x;
    }; };
    /**
     * Clamp a value between a minimum and a maximum
     *
     * @since 1.0.0
     */
    exports.clamp = function (O) {
        var minO = exports.min(O);
        var maxO = exports.max(O);
        return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
    };
    /**
     * Test whether a value is between a minimum and a maximum (inclusive)
     *
     * @since 1.0.0
     */
    exports.between = function (O) {
        var lessThanO = exports.lessThan(O);
        var greaterThanO = exports.greaterThan(O);
        return function (low, hi) { return function (x) { return (lessThanO(x, low) || greaterThanO(x, hi) ? false : true); }; };
    };
    /**
     * @since 1.0.0
     */
    exports.fromCompare = function (compare) {
        var optimizedCompare = function (x, y) { return (x === y ? 0 : compare(x, y)); };
        return {
            equals: function (x, y) { return optimizedCompare(x, y) === 0; },
            compare: optimizedCompare
        };
    };
    /**
     * @since 1.0.0
     */
    exports.contramap = function (f, fa) {
        return exports.fromCompare(function_1.on(fa.compare)(f));
    };
    /**
     * @since 1.0.0
     */
    exports.getSemigroup = function () {
        return {
            concat: function (x, y) { return exports.fromCompare(function (a, b) { return Ordering_1.semigroupOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
        };
    };
    /**
     * @since 1.0.0
     */
    exports.getProductOrd = function (OA, OB) {
        return exports.fromCompare(function (_a, _b) {
            var xa = _a[0], xb = _a[1];
            var ya = _b[0], yb = _b[1];
            var r = OA.compare(xa, ya);
            return r === 0 ? OB.compare(xb, yb) : r;
        });
    };
    /**
     * @since 1.3.0
     */
    exports.getDualOrd = function (O) {
        return exports.fromCompare(function (x, y) { return O.compare(y, x); });
    };
    /**
     * @since 1.4.0
     */
    exports.ordDate = exports.contramap(function (date) { return date.valueOf(); }, exports.ordNumber);
});
