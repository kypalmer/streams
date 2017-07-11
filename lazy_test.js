const lazy = require('./lazy').Lazy;
let results_array = [];

console.log('\n\n\n\x1b[32m' + "lazy_test.js:" + '\x1b[0m' );

let description = "Type of properties is correct before forcing: "
let a = new lazy(()=>"A");
let b;
let test_cacheable_before_force = (typeof a.cacheable ===  "function");
let test_cache_val_before_force = (!a.cache_value);
let result = test_cache_val_before_force && test_cacheable_before_force;
log_test(description, result);

description = "Correct result returned: "
a = new lazy(() => "A").force();
result = a === "A";
log_test(description, result);


// This test cements the current stateful api. Eventually should change it
description = "Result is cached: "
a = new lazy(() => "A");
a.force();
b = a.cached_val;
result = b === "A";
log_test(description, result);

description = "Multiple calls to force: ";
a = new lazy(() => "A");
a.force();
b = a.force();
result = b === "A";
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