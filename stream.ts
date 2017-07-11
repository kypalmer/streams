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
        let head = new lazy(hd);
        let tail = new lazy(tl);

        return new Stream( () => head, () => tail);
    }
    /**
     * Return the head of the stream without error checking
     * @return {A}
     */
    head() {
        return this.h().force();
    }

    /**
     * Return the tail of the stream without error checking
     * @return {Stream<A>}
     */
    tail() {
        return this.t().force();
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

    static ones() {
        return Stream.cons(() => 1, Stream.ones);
    }
}








/**
 * @callback head~thunk
 * @returns {A}
 */

/**
 * @callback tail~thunk
 * @returns {Stream<A>}
 */