"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {() => A} val
 * @returns {Lazy}
 *
 * A lazy evaluation scheme for thunks
 * TODO: Not RT. Alter so that it doesn't use local state
 */
var Lazy = (function () {
    function Lazy(val) {
        this.cacheable = val;
        this.cached_val = undefined;
    }
    Lazy.prototype.force = function () {
        if (this.cached_val) {
            return this.cached_val;
        }
        else {
            this.cached_val = this.cacheable();
            return this.cached_val;
        }
    };
    return Lazy;
}());
exports.Lazy = Lazy;
