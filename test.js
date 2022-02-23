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

test('Converts 31557601001 to 1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms', () => {
    var a = lib.msToTimeString(31557601001, {auto : true, units: [ 'year', 'month' ], showEmpty: true});
    console.log(a);

    expect(a).toBe('1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms');
});

test('Converts 31557601001 to 1 year 1 second 1 ms', () => {
    var a = lib.msToTimeString(31557601001, {auto : true, units: [ 'year', 'month' ], showEmpty: false});
    console.log(a);

    expect(a).toBe('1 year 1 seconds 1 ms');
});

test('Converts 31557601001 to 1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms', () => {
    var a = lib.msToTimeString(31557601001, {auto : true, showEmpty: true});
    console.log(a);

    expect(a).toBe('1 year 0 month 0 week 0 day 0 hour 0 minute 1 seconds 1 ms');
});

test('Converts 31557601001 to 1 year 1 second 1 ms', () => {
    var a = lib.msToTimeString(31557601001, {auto : true, showEmpty: false});
    console.log(a);

    expect(a).toBe('1 year 1 seconds 1 ms');
});

test('Converts 31557601001 to 1 year 0 month', () => {
    var a = lib.msToTimeString(31557601001, {auto : false, units: [ 'year', 'month' ], showEmpty: true});
    console.log(a);

    expect(a).toBe('1 year 0 month');
});

test('Converts 31557601001 to 1 year', () => {
    var a = lib.msToTimeString(31557601001, {auto : false, units: [ 'year', 'month' ], showEmpty: false});
    console.log(a);

    expect(a).toBe('1 year');
});

test('Converts 31557601001 to 8766 hour 0 minute 1 second', () => {
    var a = lib.msToTimeString(31557601001, {auto : false, showEmpty: true});
    console.log(a);

    expect(a).toBe('8766 hour 0 minute 1 second');
});

test('Converts 31557601001 to 8766 hour 1 second', () => {
    var a = lib.msToTimeString(31557601001, {auto : false, showEmpty: false});
    console.log(a);

    expect(a).toBe('8766 hour 1 second');
});


test('Converts 1645307362744 to 8766 hour 1 second', () => {
    var a = lib.msToTimeString(1645307362744, {auto : false, units: ['year','month','day','hour','minute','seconds','ms'], showEmpty: false});
    console.log(a);

    expect(a).toBe('52 year 1 month 19 day 11 hour 19 minute 22 seconds 744 ms');
});

test('Add time to now', () => {
    // 1 year 1 month = 34187400000
    var now = Date.now();
    var a = lib.impreciseDurationAddedToNow("1 year 1 month");
    console.log(a);

    let diff = a - now;
    console.log(diff);

    //            -2 seconds                    1 seconds
    var result  = 34187398000 < diff && diff <= 34187401000;
    expect(result).toBe(true);

});

test('Time added to now converted to string', () => {
    // 1 year 1 month = 34187400000
    let time_str = "1 year 1 month";
    var now = Date.now();
    var a = lib.impreciseDurationAddedToNow(time_str);
    console.log(a);

    let diff = a - now;
    console.log(diff);
    //            -2 seconds                    1 seconds
    var result  = 34187398000 < diff && diff <= 34187401000;
    expect(result).toBe(true);
    var str = lib.msToTimeString(diff, {auto: false, showEmpty: true, units: ['year', 'month']});
    expect(str).toBe(time_str);
});


test('Add negative time to now', () => {
    // -1 minute = -60000
    var now = Date.now();
    var a = lib.impreciseDurationAddedToNow("-1 minute");
    console.log(a);
    let diff = now - a;
    console.log(diff);
    var result  = 0 < diff && diff <= 60000;
    expect(result).toBe(true);
});


test('1 year - 6 month = 6 month', () => {
    var a = lib.timeStringToMs("1 year -6 month");
    var b = lib.timeStringToMs("6 month");

    console.log(`a-> ${a} === ${b} <-b`)

    expect(a).toBe(b);
});

test('Wrong unit name in msToTimeString', () => {
    var a = lib.msToTimeString(31557601000, {auto: false, units: ['seconds', 'yeer']});

    expect(a).toBe(null);
});

test('Sort units', () => {
    var a = lib.msToTimeString(31557601000, {auto: false, units: ['seconds', 'year']});
    expect(a).toBe('31557601 seconds');

    var b = lib.msToTimeString(31557601000, {auto: false, units: ['seconds', 'year'], sortUnits: true});
    expect(b).toBe('1 year 1 seconds');
});

test('2 year 2 seconds', () => {
    var b = lib.msToTimeString(63115202000, {auto: false, units: ['seconds', 'year'], sortUnits: true});
    expect(b).toBe('2 year 2 seconds');
});