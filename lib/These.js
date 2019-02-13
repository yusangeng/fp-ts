(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./function", "./Option", "./Setoid"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var function_1 = require("./function");
    var Option_1 = require("./Option");
    var Setoid_1 = require("./Setoid");
    exports.URI = 'These';
    var This = /** @class */ (function () {
        function This(value) {
            this.value = value;
            this._tag = 'This';
        }
        This.prototype.map = function (f) {
            return this;
        };
        This.prototype.bimap = function (f, g) {
            return new This(f(this.value));
        };
        This.prototype.reduce = function (b, f) {
            return b;
        };
        /** Applies a function to each case in the data structure */
        This.prototype.fold = function (this_, that, both) {
            return this_(this.value);
        };
        This.prototype.inspect = function () {
            return this.toString();
        };
        This.prototype.toString = function () {
            return "this_(" + function_1.toString(this.value) + ")";
        };
        /** Returns `true` if the these is `This`, `false` otherwise */
        This.prototype.isThis = function () {
            return true;
        };
        /** Returns `true` if the these is `That`, `false` otherwise */
        This.prototype.isThat = function () {
            return false;
        };
        /** Returns `true` if the these is `Both`, `false` otherwise */
        This.prototype.isBoth = function () {
            return false;
        };
        return This;
    }());
    exports.This = This;
    var That = /** @class */ (function () {
        function That(value) {
            this.value = value;
            this._tag = 'That';
        }
        That.prototype.map = function (f) {
            return new That(f(this.value));
        };
        That.prototype.bimap = function (f, g) {
            return new That(g(this.value));
        };
        That.prototype.reduce = function (b, f) {
            return f(b, this.value);
        };
        That.prototype.fold = function (this_, that, both) {
            return that(this.value);
        };
        That.prototype.inspect = function () {
            return this.toString();
        };
        That.prototype.toString = function () {
            return "that(" + function_1.toString(this.value) + ")";
        };
        That.prototype.isThis = function () {
            return false;
        };
        That.prototype.isThat = function () {
            return true;
        };
        That.prototype.isBoth = function () {
            return false;
        };
        return That;
    }());
    exports.That = That;
    var Both = /** @class */ (function () {
        function Both(l, a) {
            this.l = l;
            this.a = a;
            this._tag = 'Both';
        }
        Both.prototype.map = function (f) {
            return new Both(this.l, f(this.a));
        };
        Both.prototype.bimap = function (f, g) {
            return new Both(f(this.l), g(this.a));
        };
        Both.prototype.reduce = function (b, f) {
            return f(b, this.a);
        };
        Both.prototype.fold = function (this_, that, both) {
            return both(this.l, this.a);
        };
        Both.prototype.inspect = function () {
            return this.toString();
        };
        Both.prototype.toString = function () {
            return "both(" + function_1.toString(this.l) + ", " + function_1.toString(this.a) + ")";
        };
        Both.prototype.isThis = function () {
            return false;
        };
        Both.prototype.isThat = function () {
            return false;
        };
        Both.prototype.isBoth = function () {
            return true;
        };
        return Both;
    }());
    exports.Both = Both;
    /**
     *
     * @since 1.0.0
     */
    exports.getSetoid = function (SL, SA) {
        return Setoid_1.fromEquals(function (x, y) {
            return x.isThis()
                ? y.isThis() && SL.equals(x.value, y.value)
                : x.isThat()
                    ? y.isThat() && SA.equals(x.value, y.value)
                    : y.isBoth() && SL.equals(x.l, y.l) && SA.equals(x.a, y.a);
        });
    };
    /**
     *
     * @since 1.0.0
     */
    exports.getSemigroup = function (SL, SA) {
        return {
            concat: function (x, y) {
                return x.isThis()
                    ? y.isThis()
                        ? exports.this_(SL.concat(x.value, y.value))
                        : y.isThat()
                            ? exports.both(x.value, y.value)
                            : exports.both(SL.concat(x.value, y.l), y.a)
                    : x.isThat()
                        ? y.isThis()
                            ? exports.both(y.value, x.value)
                            : y.isThat()
                                ? exports.that(SA.concat(x.value, y.value))
                                : exports.both(y.l, SA.concat(x.value, y.a))
                        : y.isThis()
                            ? exports.both(SL.concat(x.l, y.value), x.a)
                            : y.isThat()
                                ? exports.both(x.l, SA.concat(x.a, y.value))
                                : exports.both(SL.concat(x.l, y.l), SA.concat(x.a, y.a));
            }
        };
    };
    var map = function (fa, f) {
        return fa.map(f);
    };
    var of = function (a) {
        return new That(a);
    };
    var ap = function (S) { return function (fab, fa) {
        return chain(S)(fab, function (f) { return map(fa, f); });
    }; };
    var chain = function (S) { return function (fa, f) {
        if (fa.isThis()) {
            return exports.this_(fa.value);
        }
        else if (fa.isThat()) {
            return f(fa.value);
        }
        else {
            var fb = f(fa.a);
            return fb.isThis()
                ? exports.this_(S.concat(fa.l, fb.value))
                : fb.isThat()
                    ? exports.both(fa.l, fb.value)
                    : exports.both(S.concat(fa.l, fb.l), fb.a);
        }
    }; };
    /**
     *
     * @since 1.0.0
     */
    exports.getMonad = function (S) {
        return {
            URI: exports.URI,
            _L: function_1.phantom,
            map: map,
            of: of,
            ap: ap(S),
            chain: chain(S)
        };
    };
    var bimap = function (fla, f, g) {
        return fla.bimap(f, g);
    };
    var reduce = function (fa, b, f) {
        return fa.reduce(b, f);
    };
    var foldMap = function (M) { return function (fa, f) {
        return fa.isThis() ? M.empty : fa.isThat() ? f(fa.value) : f(fa.a);
    }; };
    var foldr = function (fa, b, f) {
        return fa.isThis() ? b : fa.isThat() ? f(fa.value, b) : f(fa.a, b);
    };
    var traverse = function (F) { return function (ta, f) {
        return ta.isThis()
            ? F.of(exports.this_(ta.value))
            : ta.isThat()
                ? F.map(f(ta.value), exports.that)
                : F.map(f(ta.a), function (b) { return exports.both(ta.l, b); });
    }; };
    var sequence = function (F) { return function (ta) {
        return ta.isThis()
            ? F.of(exports.this_(ta.value))
            : ta.isThat()
                ? F.map(ta.value, exports.that)
                : F.map(ta.a, function (b) { return exports.both(ta.l, b); });
    }; };
    /**
     *
     * @since 1.0.0
     */
    exports.this_ = function (l) {
        return new This(l);
    };
    /**
     *
     * @since 1.0.0
     * @alias of
     */
    exports.that = of;
    /**
     *
     * @since 1.0.0
     */
    exports.both = function (l, a) {
        return new Both(l, a);
    };
    /**
     *
     * @example
     * import { fromThese, this_, that, both } from 'fp-ts/lib/These'
     *
     * const from = fromThese('a', 1)
     * assert.deepStrictEqual(from(this_('b')), ['b', 1])
     * assert.deepStrictEqual(from(that(2)), ['a', 2])
     * assert.deepStrictEqual(from(both('b', 2)), ['b', 2])
     *
     * @since 1.0.0
     */
    exports.fromThese = function (defaultThis, defaultThat) { return function (fa) {
        return fa.isThis() ? [fa.value, defaultThat] : fa.isThat() ? [defaultThis, fa.value] : [fa.l, fa.a];
    }; };
    /**
     * Returns an `L` value if possible
     *
     * @example
     * import { theseLeft, this_, that, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(theseLeft(this_('a')), some('a'))
     * assert.deepStrictEqual(theseLeft(that(1)), none)
     * assert.deepStrictEqual(theseLeft(both('a', 1)), some('a'))
     *
     * @since 1.0.0
     */
    exports.theseLeft = function (fa) {
        return fa.isThis() ? Option_1.some(fa.value) : fa.isThat() ? Option_1.none : Option_1.some(fa.l);
    };
    /**
     * Returns an `A` value if possible
     *
     * @example
     * import { theseRight, this_, that, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(theseRight(this_('a')), none)
     * assert.deepStrictEqual(theseRight(that(1)), some(1))
     * assert.deepStrictEqual(theseRight(both('a', 1)), some(1))
     *
     * @since 1.0.0
     */
    exports.theseRight = function (fa) {
        return fa.isThis() ? Option_1.none : fa.isThat() ? Option_1.some(fa.value) : Option_1.some(fa.a);
    };
    /**
     * Returns `true` if the these is an instance of `This`, `false` otherwise
     *
     * @since 1.0.0
     */
    exports.isThis = function (fa) {
        return fa.isThis();
    };
    /**
     * Returns `true` if the these is an instance of `That`, `false` otherwise
     *
     * @since 1.0.0
     */
    exports.isThat = function (fa) {
        return fa.isThat();
    };
    /**
     * Returns `true` if the these is an instance of `Both`, `false` otherwise
     *
     * @since 1.0.0
     */
    exports.isBoth = function (fa) {
        return fa.isBoth();
    };
    /**
     * @example
     * import { thisOrBoth, this_, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(thisOrBoth('a', none), this_('a'))
     * assert.deepStrictEqual(thisOrBoth('a', some(1)), both('a', 1))
     *
     * @since 1.13.0
     */
    exports.thisOrBoth = function (defaultThis, ma) {
        return ma.isNone() ? exports.this_(defaultThis) : exports.both(defaultThis, ma.value);
    };
    /**
     * @example
     * import { thatOrBoth, that, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(thatOrBoth(1, none), that(1))
     * assert.deepStrictEqual(thatOrBoth(1, some('a')), both('a', 1))
     *
     * @since 1.13.0
     */
    exports.thatOrBoth = function (defaultThat, ml) {
        return ml.isNone() ? exports.that(defaultThat) : exports.both(ml.value, defaultThat);
    };
    /**
     * Returns the `L` value if and only if the value is constructed with `This`
     *
     * @example
     * import { theseThis, this_, that, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(theseThis(this_('a')), some('a'))
     * assert.deepStrictEqual(theseThis(that(1)), none)
     * assert.deepStrictEqual(theseThis(both('a', 1)), none)
     *
     * @since 1.13.0
     */
    exports.theseThis = function (fa) {
        return fa.isThis() ? Option_1.some(fa.value) : Option_1.none;
    };
    /**
     * Returns the `A` value if and only if the value is constructed with `That`
     *
     * @example
     * import { theseThat, this_, that, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(theseThat(this_('a')), none)
     * assert.deepStrictEqual(theseThat(that(1)), some(1))
     * assert.deepStrictEqual(theseThat(both('a', 1)), none)
     *
     *
     * @since 1.13.0
     */
    exports.theseThat = function (fa) {
        return fa.isThat() ? Option_1.some(fa.value) : Option_1.none;
    };
    /**
     * Takes a pair of `Option`s and attempts to create a `These` from them
     *
     * @example
     * import { fromOptions, this_, that, both } from 'fp-ts/lib/These'
     * import { none, some } from 'fp-ts/lib/Option'
     *
     * assert.deepStrictEqual(fromOptions(none, none), none)
     * assert.deepStrictEqual(fromOptions(some('a'), none), some(this_('a')))
     * assert.deepStrictEqual(fromOptions(none, some(1)), some(that(1)))
     * assert.deepStrictEqual(fromOptions(some('a'), some(1)), some(both('a', 1)))
     *
     * @since 1.13.0
     */
    exports.fromOptions = function (fl, fa) {
        return fl.foldL(function () { return fa.fold(Option_1.none, function (a) { return Option_1.some(exports.that(a)); }); }, function (l) { return fa.foldL(function () { return Option_1.some(exports.this_(l)); }, function (a) { return Option_1.some(exports.both(l, a)); }); });
    };
    /**
     * @example
     * import { fromEither, this_, that } from 'fp-ts/lib/These'
     * import { left, right } from 'fp-ts/lib/Either'
     *
     * assert.deepStrictEqual(fromEither(left('a')), this_('a'))
     * assert.deepStrictEqual(fromEither(right(1)), that(1))
     *
     * @since 1.13.0
     */
    exports.fromEither = function (fa) {
        return fa.isLeft() ? exports.this_(fa.value) : exports.that(fa.value);
    };
    /**
     * @since 1.0.0
     */
    exports.these = {
        URI: exports.URI,
        map: map,
        bimap: bimap,
        reduce: reduce,
        foldMap: foldMap,
        foldr: foldr,
        traverse: traverse,
        sequence: sequence
    };
});