(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./function", "./Monoid", "./Option", "./Setoid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var function_1 = require("./function");
    var Monoid_1 = require("./Monoid");
    var Option_1 = require("./Option");
    var Setoid_1 = require("./Setoid");
    /**
     * Calculate the number of key/value pairs in a record
     *
     * @since 1.10.0
     */
    exports.size = function (d) {
        return Object.keys(d).length;
    };
    /**
     * Test whether a record is empty
     *
     * @since 1.10.0
     */
    exports.isEmpty = function (d) {
        return Object.keys(d).length === 0;
    };
    function collect(d, f) {
        var out = [];
        var keys = Object.keys(d).sort();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            out.push(f(key, d[key]));
        }
        return out;
    }
    exports.collect = collect;
    function toArray(d) {
        return collect(d, function (k, a) { return function_1.tuple(k, a); });
    }
    exports.toArray = toArray;
    function toUnfoldable(unfoldable) {
        return function (d) {
            var arr = toArray(d);
            var len = arr.length;
            return unfoldable.unfoldr(0, function (b) { return (b < len ? Option_1.some(function_1.tuple(arr[b], b + 1)) : Option_1.none); });
        };
    }
    exports.toUnfoldable = toUnfoldable;
    function insert(k, a, d) {
        if (d[k] === a) {
            return d;
        }
        var r = Object.assign({}, d);
        r[k] = a;
        return r;
    }
    exports.insert = insert;
    function remove(k, d) {
        if (!d.hasOwnProperty(k)) {
            return d;
        }
        var r = Object.assign({}, d);
        delete r[k];
        return r;
    }
    exports.remove = remove;
    /**
     * Delete a key and value from a map, returning the value as well as the subsequent map
     *
     * @since 1.10.0
     */
    exports.pop = function (k, d) {
        var a = exports.lookup(k, d);
        return a.isNone() ? Option_1.none : Option_1.some(function_1.tuple(a.value, remove(k, d)));
    };
    /**
     * Test whether one record contains all of the keys and values contained in another record
     *
     * @since 1.14.0
     */
    exports.isSubrecord = function (S) { return function (d1, d2) {
        for (var k in d1) {
            if (!d2.hasOwnProperty(k) || !S.equals(d1[k], d2[k])) {
                return false;
            }
        }
        return true;
    }; };
    /**
     * Use {@link isSubrecord} instead
     * @since 1.10.0
     * @deprecated
     */
    exports.isSubdictionary = exports.isSubrecord;
    function getSetoid(S) {
        var isSubrecordS = exports.isSubrecord(S);
        return Setoid_1.fromEquals(function (x, y) { return isSubrecordS(x, y) && isSubrecordS(y, x); });
    }
    exports.getSetoid = getSetoid;
    function getMonoid(S) {
        // tslint:disable-next-line: deprecation
        return Monoid_1.getDictionaryMonoid(S);
    }
    exports.getMonoid = getMonoid;
    /**
     * Lookup the value for a key in a dictionary
     * @since 1.10.0
     */
    exports.lookup = function (key, fa) {
        return fa.hasOwnProperty(key) ? Option_1.some(fa[key]) : Option_1.none;
    };
    function filter(fa, p) {
        return filterWithIndex(fa, function (_, a) { return p(a); });
    }
    exports.filter = filter;
    /**
     * @since 1.10.0
     */
    exports.empty = {};
    function mapWithKey(fa, f) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            r[key] = f(key, fa[key]);
        }
        return r;
    }
    exports.mapWithKey = mapWithKey;
    function map(fa, f) {
        return mapWithKey(fa, function (_, a) { return f(a); });
    }
    exports.map = map;
    /**
     * @since 1.10.0
     */
    exports.reduce = function (fa, b, f) {
        return reduceWithKey(fa, b, function (_, b, a) { return f(b, a); });
    };
    /**
     * @since 1.10.0
     */
    exports.foldMap = function (M) {
        var foldMapWithKeyM = exports.foldMapWithKey(M);
        return function (fa, f) { return foldMapWithKeyM(fa, function (_, a) { return f(a); }); };
    };
    /**
     * @since 1.10.0
     */
    exports.foldr = function (fa, b, f) {
        return foldrWithKey(fa, b, function (_, a, b) { return f(a, b); });
    };
    function reduceWithKey(fa, b, f) {
        var out = b;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = f(k, out, fa[k]);
        }
        return out;
    }
    exports.reduceWithKey = reduceWithKey;
    /**
     * @since 1.12.0
     */
    exports.foldMapWithKey = function (M) { return function (fa, f) {
        var out = M.empty;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var k = keys[i];
            out = M.concat(out, f(k, fa[k]));
        }
        return out;
    }; };
    function foldrWithKey(fa, b, f) {
        var out = b;
        var keys = Object.keys(fa).sort();
        var len = keys.length;
        for (var i = len - 1; i >= 0; i--) {
            var k = keys[i];
            out = f(k, fa[k], out);
        }
        return out;
    }
    exports.foldrWithKey = foldrWithKey;
    /**
     * Create a dictionary with one key/value pair
     *
     * @since 1.10.0
     */
    exports.singleton = function (k, a) {
        var _a;
        return _a = {}, _a[k] = a, _a;
    };
    function traverseWithKey(F) {
        return function (ta, f) {
            var keys = Object.keys(ta);
            if (keys.length === 0) {
                return F.of(exports.empty);
            }
            var fr = F.of({});
            var _loop_1 = function (key) {
                fr = F.ap(F.map(fr, function (r) { return function (b) {
                    r[key] = b;
                    return r;
                }; }), f(key, ta[key]));
            };
            for (var _i = 0, keys_3 = keys; _i < keys_3.length; _i++) {
                var key = keys_3[_i];
                _loop_1(key);
            }
            return fr;
        };
    }
    exports.traverseWithKey = traverseWithKey;
    function traverse(F) {
        var traverseWithKeyF = traverseWithKey(F);
        return function (ta, f) { return traverseWithKeyF(ta, function (_, a) { return f(a); }); };
    }
    exports.traverse = traverse;
    function sequence(F) {
        var traverseWithKeyF = traverseWithKey(F);
        return function (ta) { return traverseWithKeyF(ta, function (_, a) { return a; }); };
    }
    exports.sequence = sequence;
    /**
     * @since 1.10.0
     */
    exports.compact = function (fa) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_4 = keys; _i < keys_4.length; _i++) {
            var key = keys_4[_i];
            var optionA = fa[key];
            if (optionA.isSome()) {
                r[key] = optionA.value;
            }
        }
        return r;
    };
    /**
     * @since 1.10.0
     */
    exports.partitionMap = function (fa, f) {
        return partitionMapWithIndex(fa, function (_, a) { return f(a); });
    };
    /**
     * @since 1.10.0
     */
    exports.partition = function (fa, p) {
        return partitionWithIndex(fa, function (_, a) { return p(a); });
    };
    /**
     * @since 1.10.0
     */
    exports.separate = function (fa) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_5 = keys; _i < keys_5.length; _i++) {
            var key = keys_5[_i];
            var e = fa[key];
            if (e.isLeft()) {
                left[key] = e.value;
            }
            else {
                right[key] = e.value;
            }
        }
        return {
            left: left,
            right: right
        };
    };
    function wither(F) {
        var traverseF = traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), exports.compact); };
    }
    exports.wither = wither;
    function wilt(F) {
        var traverseF = traverse(F);
        return function (wa, f) { return F.map(traverseF(wa, f), exports.separate); };
    }
    exports.wilt = wilt;
    /**
     * @since 1.10.0
     */
    exports.filterMap = function (fa, f) {
        return filterMapWithIndex(fa, function (_, a) { return f(a); });
    };
    function partitionMapWithIndex(fa, f) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_6 = keys; _i < keys_6.length; _i++) {
            var key = keys_6[_i];
            var e = f(key, fa[key]);
            if (e.isLeft()) {
                left[key] = e.value;
            }
            else {
                right[key] = e.value;
            }
        }
        return {
            left: left,
            right: right
        };
    }
    exports.partitionMapWithIndex = partitionMapWithIndex;
    function partitionWithIndex(fa, p) {
        var left = {};
        var right = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_7 = keys; _i < keys_7.length; _i++) {
            var key = keys_7[_i];
            var a = fa[key];
            if (p(key, a)) {
                right[key] = a;
            }
            else {
                left[key] = a;
            }
        }
        return {
            left: left,
            right: right
        };
    }
    exports.partitionWithIndex = partitionWithIndex;
    function filterMapWithIndex(fa, f) {
        var r = {};
        var keys = Object.keys(fa);
        for (var _i = 0, keys_8 = keys; _i < keys_8.length; _i++) {
            var key = keys_8[_i];
            var optionB = f(key, fa[key]);
            if (optionB.isSome()) {
                r[key] = optionB.value;
            }
        }
        return r;
    }
    exports.filterMapWithIndex = filterMapWithIndex;
    function filterWithIndex(fa, p) {
        var r = {};
        var changed = false;
        for (var key in fa) {
            if (fa.hasOwnProperty(key)) {
                var a = fa[key];
                if (p(key, a)) {
                    r[key] = a;
                }
                else {
                    changed = true;
                }
            }
        }
        return changed ? r : fa;
    }
    exports.filterWithIndex = filterWithIndex;
    function fromFoldable(
    // tslint:disable-next-line: deprecation
    F) {
        return function (ta, f) {
            return F.reduce(ta, {}, function (b, _a) {
                var k = _a[0], a = _a[1];
                b[k] = b.hasOwnProperty(k) ? f(b[k], a) : a;
                return b;
            });
        };
    }
    exports.fromFoldable = fromFoldable;
    /**
     * @since 1.14.0
     */
    function every(fa, predicate) {
        for (var k in fa) {
            if (!predicate(fa[k])) {
                return false;
            }
        }
        return true;
    }
    exports.every = every;
    /**
     * @since 1.14.0
     */
    function some(fa, predicate) {
        for (var k in fa) {
            if (predicate(fa[k])) {
                return true;
            }
        }
        return false;
    }
    exports.some = some;
    /**
     * @since 1.14.0
     */
    function isMember(S) {
        return function (a, fa) { return some(fa, function (x) { return S.equals(x, a); }); };
    }
    exports.isMember = isMember;
});
