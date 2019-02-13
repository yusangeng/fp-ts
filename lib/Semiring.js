// adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Semiring.purs
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @since 1.0.0
     */
    exports.getFunctionSemiring = function (S) {
        return {
            add: function (f, g) { return function (x) { return S.add(f(x), g(x)); }; },
            zero: function () { return S.zero; },
            mul: function (f, g) { return function (x) { return S.mul(f(x), g(x)); }; },
            one: function () { return S.one; }
        };
    };
});
