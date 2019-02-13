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
    exports.tailRec = function (f, a) {
        var v = f(a);
        while (v.isLeft()) {
            v = f(v.value);
        }
        return v.value;
    };
});