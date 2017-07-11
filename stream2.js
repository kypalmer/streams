function Stream (head, tail) {

    Object.defineProperty(this, 'head', {
        configurable: true,
        value: head
        }
    )

    Object.defineProperty(this, 'tail', {
        configurable: true,
        value: tail
        }
    )
}

function cons (head, tail) {
    return new Stream(() => head, () => tail);
}

function empty() {
    return undefined;
}

function fromArray() {
    var head = arguments[0];
    var tail = Array.prototype.slice.call(arguments, 1);
    console.log(head, tail);
    if (!head) {
        return empty;
    }
    else {
        return cons(head, fromArray.apply(this, tail)); 
    }
}

// There's still something wrong here. The call to ones is wrapping 'ones' in a thunk, 
// so it's requiring an extra function call.
function ones() {
    return cons(1, ones);
}

module.exports.Stream = Stream
module.exports.empty = empty
module.exports.fromArray = fromArray
module.exports.ones = ones