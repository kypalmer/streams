const Stream = require('./stream').Stream;
const cons = Stream.cons;
const empty = Stream.empty;

console.log('\n\n\n\x1b[32m' + "stream_test.js:" + '\x1b[0m' );
let description;
let results_array = [];
let a;
let b;
let c;
let result;

description = "Stream built with cons has correct head: ";
a = new cons(()=>"A", cons(() => "B", () => empty()));
console.log(a.head());
result = a.head() === "A";
log_test(description, result);

description = "Stream built with cons has correct tail().head(): ";
a = new cons(()=>"A", () => cons(() => "B", () => empty()));
result = a.tail().head() === "B";
log_test(description, result);

description = "fromArray makes the right thing: ";
a = Stream.fromArray("a","b","c");
r1 = a.head() === "a";
r2 = a.tail().head() === "b";
r3 = a.tail().tail().head() === "c";
r4 = a.tail().tail().tail() === undefined;
result = r1&r2&r3&r4;
log_test(description, result);

finish_testing(results_array);

function finish_testing(res_array) {
    console.log("ran ", res_array.length, " tests")
}

function pass_fail(arg) {
    if(arg) 
        return '\x1b[32m' + 'pass' + '\x1b[0m';
    else 
        return '\x1b[31m' + 'fail' + '\x1b[0m';
}

function log_test(description, result) {
    const pf_decision = pass_fail(result);
    results_array.push(result);
    console.log(description, pf_decision);
}