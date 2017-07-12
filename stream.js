"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lazy_1 = require("./lazy");
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
var Stream = (function () {
    function Stream(h, t) {
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
    Stream.cons = function (hd, tl) {
        // Due to binding patterns in JavaScript, binding 'force' would bind to the 'Stream' instead of the 
        // 'Lazy' object we just created. we have to bind the correct 'this' to force at the moment we bind 
        // the method.
        var h = new lazy_1.Lazy(hd);
        var head = h.force.bind(h);
        var t = new lazy_1.Lazy(tl);
        var tail = t.force.bind(t);
        return new Stream(head, tail);
    };
    /**
     * Return the head of the stream without error checking
     * @return {A}
     */
    Stream.prototype.head = function () {
        return this.h();
    };
    /**
     * Return the tail of the stream without error checking
     * @return {Stream<A>}
     */
    Stream.prototype.tail = function () {
        return this.t();
    };
    Stream.empty = function () {
        return undefined;
    };
    Stream.fromArray = function () {
        var hd = arguments[0];
        var tl = Array.prototype.slice.call(arguments, 1);
        if (!hd) {
            return Stream.empty();
        }
        else {
            return Stream.cons(function () { return hd; }, function () { return Stream.fromArray.apply(null, tl); });
        }
    };
    Stream.ones = function () {
        return Stream.cons(function () { return 1; }, Stream.ones);
    };
    return Stream;
}());
exports.Stream = Stream;
