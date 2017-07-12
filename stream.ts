import {Lazy as lazy } from './lazy';

/**
 * The main constructor for Streams, but the preferred interface is through the 
 * Stream.cons static method. This constructor performs no wrapping, so lazy values
 * or thunks must be passed explicitly.
 * @constructor
 * @param {Lazy<A>} h 
 * @param {Lazy<Stream<A>>} t 
 * @returns {Stream}
 * 
 * 
 */
export class Stream <A> {
    h: (() => A);
    t: (() => Stream<A>);

    constructor(h: (() => A), t: (() => Stream<A>)) {
        this.h = h;
        this.t = t;
        return this;
    }

    /**
     * Smart constructor for streams. Wraps the two thunk parameters in Lazy, which memoizes the 
     * values when forced. You don't need to force the values if you're using the 
     * defined methods in the Stream library like head() and tail()
     * @param {head~thunk} hd 
     * @param {tail~thunk} tl 
     * @returns {Stream<A>}
     */
    static cons <A> (hd: (() => A), tl: (() => Stream<A>)): Stream<A> {
        // Due to binding patterns in JavaScript, binding 'force' would bind to the 'Stream' instead of the 
        // 'Lazy' object we just created. we have to bind the correct 'this' to force at the moment we bind 
        // the method.
        let h = new lazy(hd);
        let head = h.force.bind(h);
        let t = new lazy(tl);
        let tail = t.force.bind(t);

        return new Stream<A>( head, tail);
    }
    /**
     * Return the head of the stream without error checking
     * @return {A}
     */
    head() {
        return this.h();
    }

    /**
     * Return the tail of the stream without error checking
     * @return {Stream<A>}
     */
    tail() {
        return this.t();
    }

    static empty() {
        return undefined;
    }

    static fromArray() {
        var hd = arguments[0];
        var tl = Array.prototype.slice.call(arguments, 1);
        if (!hd) {
            return Stream.empty();
        }
        else {
            return Stream.cons(
                () => hd, 
                () => Stream.fromArray.apply(null, tl)); 
        }
    }

    static ones(): Stream<number>{
        return Stream.cons(() => 1, Stream.ones);
    }
}
