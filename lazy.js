/**
 * @param {() => A} val 
 * @returns {Lazy} 
 * 
 * A lazy evaluation scheme for thunks
 * TODO: Not RT. Alter so that it doesn't use local state
 */
function Lazy (val) {
    this.cacheable = val;
    this.cached_val = undefined;
}

function force () {
    if (this.cached_val) {
        return this.cached_val;
    } else {
        this.cached_val = this.cacheable();
        return this.cached_val;
    }
}
Lazy.prototype.force = force;

module.exports = Lazy;