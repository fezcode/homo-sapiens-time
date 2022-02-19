// import {msToTimeString} from "./homo-sapiens-time.js"
const lib = require("./homo-sapiens-time.js")

/**
 * Following 8 tests will be run for same value to test options.
 * options = { true , obj , true  }
 * options = { true , obj , false }
 * options = { true , none, true  }
 * options = { true , none, false }
 * options = { false, obj , true  }
 * options = { false, obj , false }
 * options = { false, none, true  }
 * options = { false, none, false }
 */

// test('Converts \`31557601001\` to \`1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : true, units: [ 'year', 'month' ], showEmpty: true});
//     console.log(a);

//     expect(a).toBe('1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms');
// });

// test('Converts \`31557601001\` to \`1 year 1 second 1 ms\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : true, units: [ 'year', 'month' ], showEmpty: false});
//     console.log(a);

//     expect(a).toBe('1 year 1 seconds 1 ms');
// });

// test('Converts \`31557601001\` to \`1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : true, showEmpty: true});
//     console.log(a);

//     expect(a).toBe('1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms');
// });

// test('Converts \`31557601001\` to \`1 year 1 second 1 ms\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : true, showEmpty: false});
//     console.log(a);

//     expect(a).toBe('1 year 1 seconds 1 ms');
// });

// test('Converts \`31557601001\` to \`1 year 0 month\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : false, units: [ 'year', 'month' ], showEmpty: true});
//     console.log(a);

//     expect(a).toBe('1 year 0 month');
// });

// test('Converts \`31557601001\` to \`1 year\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : false, units: [ 'year', 'month' ], showEmpty: false});
//     console.log(a);

//     expect(a).toBe('1 year');
// });

// test('Converts \`31557601001\` to \`8766 hour 0 minute 1 second\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : false, showEmpty: true});
//     console.log(a);

//     expect(a).toBe('8766 hour 0 minute 1 second');
// });

// test('Converts \`31557601001\` to \`8766 hour 1 second\`', () => {
//     var a = lib.msToTimeString(31557601001, {auto : false, showEmpty: false});
//     console.log(a);

//     expect(a).toBe('8766 hour 1 second');
// });


test('Converts \`1645307362744\` to \`8766 hour 1 second\`', () => {
    var a = lib.msToTimeString(1645307362744, {auto : false, units: ['year','month','day','hour','minute','seconds','ms'], showEmpty: false});
    console.log(a);

    expect(a).toBe('52 year 1 month 19 day 11 hour 19 minute 22 seconds 744 ms');
});

