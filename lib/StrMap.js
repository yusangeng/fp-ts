(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./function", "./Record", "./Semigroup", "./Setoid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var function_1 = require("./function");
    var R = require("./Record");
    var Semigroup_1 = require("./Semigroup");
    var Setoid_1 = require("./Setoid");
    exports.URI = 'StrMap';
    var liftSeparated = function (_a) {
        var left = _a.left, right = _a.right;
        return {
            left: new StrMap(left),
            right: new StrMap(right)
        };
    };
    /**
     * @data
     * @constructor StrMap
     * @since 1.0.0
     */
    var StrMap = /** @class */ (function () {
        function StrMap(value) {
            this.value = value;
        }
        StrMap.prototype.mapWithKey = function (f) {
            return new StrMap(R.mapWithKey(this.value, f));
        };
        StrMap.prototype.map = function (f) {
            return this.mapWithKey(function (_, a) { return f(a); });
        };
        StrMap.prototype.reduce = function (b, f) {
            return R.reduce(this.value, b, f);
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.foldr = function (b, f) {
            return R.foldr(this.value, b, f);
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.reduceWithKey = function (b, f) {
            return R.reduceWithKey(this.value, b, f);
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.foldrWithKey = function (b, f) {
            return R.foldrWithKey(this.value, b, f);
        };
        StrMap.prototype.filter = function (p) {
            return this.filterWithIndex(function (_, a) { return p(a); });
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.filterMap = function (f) {
            return this.filterMapWithIndex(function (_, a) { return f(a); });
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.partition = function (p) {
            return this.partitionWithIndex(function (_, a) { return p(a); });
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.partitionMap = function (f) {
            return this.partitionMapWithIndex(function (_, a) { return f(a); });
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.separate = function () {
            return liftSeparated(R.separate(this.value));
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.partitionMapWithIndex = function (f) {
            return liftSeparated(R.partitionMapWithIndex(this.value, f));
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.partitionWithIndex = function (p) {
            return liftSeparated(R.partitionWithIndex(this.value, p));
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.filterMapWithIndex = function (f) {
            return new StrMap(R.filterMapWithIndex(this.value, f));
        };
        /**
         * @since 1.12.0
         */
        StrMap.prototype.filterWithIndex = function (p) {
            return new StrMap(R.filterWithIndex(this.value, p));
        };
        /**
         * @since 1.14.0
         */
        StrMap.prototype.every = function (predicate) {
            return R.every(this.value, predicate);
        };
        /**
         * @since 1.14.0
         */
        StrMap.prototype.some = function (predicate) {
            return R.some(this.value, predicate);
        };
        return StrMap;
    }());
    exports.StrMap = StrMap;
    /**
     *
     * @since 1.10.0
     */
    var empty = new StrMap(R.empty);
    var concat = function (S) {
        var concat = R.getMonoid(S).concat;
        return function (x, y) { return new StrMap(concat(x.value, y.value)); };
    };
    /**
     *
     * @since 1.0.0
     */
    exports.getMonoid = function (S) {
        if (S === void 0) { S = Semigroup_1.getLastSemigroup(); }
        return {
            concat: concat(S),
            empty: empty
        };
    };
    var map = function (fa, f) {
        return fa.map(f);
    };
    var reduce = function (fa, b, f) {
        return fa.reduce(b, f);
    };
    var foldMap = function (M) {
        var foldMapM = R.foldMap(M);
        return function (fa, f) { return foldMapM(fa.value, f); };
    };
    var foldr = function (fa, b, f) {
        return fa.foldr(b, f);
    };
    var reduceWithIndex = function (fa, b, f) {
        return fa.reduceWithKey(b, f);
    };
    var foldMapWithIndex = function (M) {
        var foldMapWithKey = R.foldMapWithKey(M);
        return function (fa, f) { return foldMapWithKey(fa.value, f); };
    };
    var foldrWithIndex = function (fa, b, f) {
        return fa.foldrWithKey(b, f);
    };
    function traverseWithKey(F) {
        var traverseWithKeyF = R.traverseWithKey(F);
        return function (ta, f) { return F.map(traverseWithKeyF(ta.value, f), function (d) { return new StrMap(d); }); };
    }
    exports.traverseWithKey = traverseWithKey;
    function traverse(F) {
        var traverseWithKeyF = traverseWithKey(F);
        return function (ta, f) { return traverseWithKeyF(ta, function (_, a) { return f(a); }); };
    }
    function sequence(F) {
        var traverseWithKeyF = traverseWithKey(F);
        return function (ta) { return traverseWithKeyF(ta, function (_, a) { return a; }); };
    }
    /**
     * Test whether one dictionary contains all of the keys and values contained in another dictionary
     *
     * @since 1.0.0
     */
    exports.isSubdictionary = function (S) {
        var isSubrecordS = R.isSubrecord(S);
        return function (d1, d2) { return isSubrecordS(d1.value, d2.value); };
    };
    /**
     * Calculate the number of key/value pairs in a dictionary
     *
     * @since 1.0.0
     */
    exports.size = function (d) {
        return R.size(d.value);
    };
    /**
     * Test whether a dictionary is empty
     *
     * @since 1.0.0
     */
    exports.isEmpty = function (d) {
        return R.isEmpty(d.value);
    };
    /**
     *
     * @since 1.0.0
     */
    exports.getSetoid = function (S) {
        var isSubrecordS = R.isSubrecord(S);
        return Setoid_1.fromEquals(function (x, y) { return isSubrecordS(x.value, y.value) && isSubrecordS(y.value, x.value); });
    };
    /**
     * Create a dictionary with one key/value pair
     *
     * @since 1.0.0
     */
    exports.singleton = function (k, a) {
        return new StrMap(R.singleton(k, a));
    };
    /**
     * Lookup the value for a key in a dictionary
     *
     * @since 1.0.0
     */
    exports.lookup = function (k, d) {
        return R.lookup(k, d.value);
    };
    function fromFoldable(
    // tslint:disable-next-line: deprecation
    F) {
        var fromFoldableF = R.fromFoldable(F);
        return function (ta, f) { return new StrMap(fromFoldableF(ta, f)); };
    }
    exports.fromFoldable = fromFoldable;
    /**
     *
     * @since 1.0.0
     */
    exports.collect = function (d, f) {
        return R.collect(d.value, f);
    };
    /**
     *
     * @since 1.0.0
     */
    exports.toArray = function (d) {
        return R.toArray(d.value);
    };
    function toUnfoldable(U) {
        var toUnfoldableU = R.toUnfoldable(U);
        return function (d) { return toUnfoldableU(d.value); };
    }
    exports.toUnfoldable = toUnfoldable;
    /**
     * Insert or replace a key/value pair in a map
     *
     * @since 1.0.0
     */
    exports.insert = function (k, a, d) {
        var value = R.insert(k, a, d.value);
        return value === d.value ? d : new StrMap(value);
    };
    /**
     * Delete a key and value from a map
     *
     * @since 1.0.0
     */
    exports.remove = function (k, d) {
        var value = R.remove(k, d.value);
        return value === d.value ? d : new StrMap(value);
    };
    /**
     * Delete a key and value from a map, returning the value as well as the subsequent map
     *
     * @since 1.0.0
     */
    exports.pop = function (k, d) {
        return R.pop(k, d.value).map(function (_a) {
            var a = _a[0], d = _a[1];
            return function_1.tuple(a, new StrMap(d));
        });
    };
    /**
     * @since 1.14.0
     */
    function isMember(S) {
        return function (a, fa) { return fa.some(function (x) { return S.equals(x, a); }); };
    }
    exports.isMember = isMember;
    var filterMap = function (fa, f) {
        return fa.filterMap(f);
    };
    var filter = function (fa, p) {
        return fa.filter(p);
    };
    var compact = function (fa) {
        return new StrMap(R.compact(fa.value));
    };
    var separate = function (fa) {
        return fa.separate();
    };
    var partitionMap = function (fa, f) {
        return fa.partitionMap(f);
    };
    var partition = function (fa, p) {
        return fa.partition(p);
    };
    var wither = function (F) {
        var traverseF = traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), compact); };
    };
    var wilt = function (F) {
        var traverseF = traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), separate); };
    };
    var mapWithIndex = function (fa, f) {
        return fa.mapWithKey(f);
    };
    var traverseWithIndex = traverseWithKey;
    var partitionMapWithIndex = function (fa, f) {
        return fa.partitionMapWithIndex(f);
    };
    var partitionWithIndex = function (fa, p) {
        return fa.partitionWithIndex(p);
    };
    var filterMapWithIndex = function (fa, f) {
        return fa.filterMapWithIndex(f);
    };
    var filterWithIndex = function (fa, p) {
        return fa.filterWithIndex(p);
    };
    /**
     * @since 1.0.0
     */
    exports.strmap = {
        URI: exports.URI,
        map: map,
        reduce: reduce,
        foldMap: foldMap,
        foldr: foldr,
        traverse: traverse,
        sequence: sequence,
        compact: compact,
        separate: separate,
        filter: filter,
        filterMap: filterMap,
        partition: partition,
        partitionMap: partitionMap,
        wither: wither,
        wilt: wilt,
        mapWithIndex: mapWithIndex,
        reduceWithIndex: reduceWithIndex,
        foldMapWithIndex: foldMapWithIndex,
        foldrWithIndex: foldrWithIndex,
        traverseWithIndex: traverseWithIndex,
        partitionMapWithIndex: partitionMapWithIndex,
        partitionWithIndex: partitionWithIndex,
        filterMapWithIndex: filterMapWithIndex,
        filterWithIndex: filterWithIndex
    };
});
