/**
 * @param {() => A} val 
 * @returns {Lazy} 
 * 
 * A lazy evaluation scheme for thunks
 * TODO: Not RT. Alter so that it doesn't use local state
 */
export class Lazy<A>{

    cacheable: () => A;
    cached_val: A | undefined;

    constructor(val: () => A) {
        this.cacheable = val;
        this.cached_val = undefined;
    }

    force () {
        if (this.cached_val) {
            return this.cached_val;
        } else {
            this.cached_val = this.cacheable();
            return this.cached_val;
        }
    }
}

