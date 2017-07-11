const lazy = require('./lazy.js').Lazy

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
function Stream (h, t) {
    this.h = h;
    this.t = t;
}

/**
 * Smart constructor for streams. Wraps the two thunk parameters in Lazy, which memoizes the 
 * values when forced. You don't need to force the values if you're using the 
 * defined methods in the Stream library like head() and tail()
 * @augments Stream
 * @param {head~thunk} hd 
 * @param {tail~thunk} tl 
 * @returns {Stream<A>}
 */
function cons (hd, tl) {
    let head = new lazy(hd);
    let tail = new lazy(tl);

    return new Stream(() => head, () => tail);
}
Stream.cons = cons;

/**
 * Return the head of the stream without error checking
 * @return {A}
 */
function head() {
    return this.h().force();
}
Stream.prototype.head = head;

/**
 * Return the tail of the stream without error checking
 * @return {Stream<A>}
 */
function tail() {
    return this.t().force();
}
Stream.prototype.tail = tail;


function empty() {
    return undefined;
}
Stream.empty = empty

function fromArray() {
    var hd = arguments[0];
    var tl = Array.prototype.slice.call(arguments, 1);
    console.log(hd, tl);
    if (!hd) {
        return empty;
    }
    else {
        return cons(
            () => hd, 
            () => Stream.fromArray.apply(null, tl)); 
    }
}
Stream.fromArray = fromArray;

// There's still something wrong here. The call to ones is wrapping 'ones' in a thunk, 
// so it's requiring an extra function call.
function ones() {
    return cons(1, ones);
}
Stream.ones = ones

module.exports = Stream;

/**
 * @callback head~thunk
 * @returns {A}
 */

/**
 * @callback tail~thunk
 * @returns {Stream<A>}
 */