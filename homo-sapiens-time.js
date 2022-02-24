// {
//     [years, months, weeks, days, hours, minutes, seconds, milliseconds]
//     [year, month, week, day, hour, minute, second, millisecond]   
//     [y, mo, w, d, h, m, s, ms]
// }

// milliseconds|seconds|minutes|hours|days|weeks|months|years|millisecond|second|minute|hour|day|week|month|year|ms|mo|m|s|h|d|y|w

const timeConstants = {
    y : 31557600000,
    mo: 2629800000,
    w : 604800000,
    d : 86400000,
    h : 3600000,
    m : 60000,
    s : 1000,
    ms: 1
}

const units = {
    years : 'y',
    year : 'y',
    y : 'y',

    months : 'mo',
    month : 'mo',
    mo : 'mo',

    weeks: 'w',
    week: 'w',
    w: 'w',

    days: 'd',
    day: 'd',
    d: 'd',

    hours: 'h',
    hour: 'h',
    h: 'h',

    minutes: 'm',
    minute: 'm',
    m: 'm',

    seconds : 's',
    second : 's',
    s : 's',

    milliseconds : 'ms',
    millisecond : 'ms',
    ms : 'ms'
}

const msConversionRegex = new RegExp('((-?\\d+)\\s*(milliseconds|seconds|minutes|hours|days|weeks|months|years|millisecond|second|minute|hour|day|week|month|year|ms|mo|m|s|h|d|y|w)\\s*)', 'g')

// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

// https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

const getMSEquivalent = (type, count) => {
    return count * timeConstants[units[type]]
}

function timeStringToMs(str) {
    let milliseconds = 0;
    let myArray;
    while ((myArray = msConversionRegex.exec(str)) !== null) {
        var type = myArray[3];
        var count = parseInt(myArray[2]);
        milliseconds += getMSEquivalent(type, count);
    }
    return milliseconds;
}

/**
 * Takes `ms` and converts it to string that consists of given units.
 * @param {number}  ms 
 * @param {boolean} [opts.auto=true] automatically converts time with 'year','month','week','day','hour','minute','seconds','ms' 
 * @param {array}   [opts.units=['h', 'm' ,'s']] array of wanted units
 * @param {boolean} [opts.showEmpty=false] show even if given unit is empty
 * @param {boolean} [opts.sortUnits=false] sorts units for execution priority. 
 * @return null if given units are wrong. (prints error to console)
 * 
 * Unlike https://github.com/shime/humanize-time/blob/master/index.js
 * 
 * Unlike https://github.com/EvanHahn/HumanizeDuration.js/blob/main/humanize-duration.js
 */
function msToTimeString(ms, opts) {
    if (!opts) {
        opts = {};
    }

    var options = {
        auto      : opts.auto      ?? true,
        // Array assignment creates reference not copy
        // Why spread first: options.units and opts.units are pointing to same object
        units     : (opts.auto ? ['year','month','week','day','hour','minute','second','ms'] : ( opts.units ? [...opts.units] : ['hour','minute','second'])),   
        showEmpty : opts.showEmpty ?? false,
        sortUnits : opts.sortUnits ?? false
    }

    if (options.sortUnits) {
        options.units.sort((firstEl, secondEl) => {
            if( Object.keys(units).indexOf(firstEl) < Object.keys(units).indexOf(secondEl) ) {
                return -1;
            }
            
            if( Object.keys(units).indexOf(firstEl) > Object.keys(units).indexOf(secondEl) ) {
                return 1;
            }

            return 0;
        })
    }

    // console.log("IMPORTANT: " + JSON.stringify(options.units));

    var time  = {
        y  : 0,
        mo : 0,
        w  : 0,
        d  : 0,
        h  : 0,
        m  : 0,
        s  : 0,
        ms : 0
    }

    const defaultUnits = [ 'y', 'mo' , 'w' , 'd', 'h', 'm' ,'s', 'ms' ];
    // var currentUnits = options.auto ? defaultUnits : options.units;   
    var currentUnits = options.units;   

    let time_str = '';
    let runnable = true;

    currentUnits.forEach(currentUnit => {
        // Verify options
        if (defaultUnits.indexOf(units[currentUnit]) < 0 ) {
            let max  = 0;
            let unit = 0;

            Object.keys(units).forEach(x => {
                let currentValue = similarity(currentUnit, x);

                if (currentValue >= max) {
                    max = currentValue;
                    unit = x;
                }
            });

            console.error(`\nError! Given unit \`${currentUnit}\` is not valid.\n       Did you mean \`${unit}\`?`);
            // process.exit(1);
            runnable = false;
        }
    });

    if (!runnable)
        return null;

    currentUnits.forEach(currentUnit => {
        // Run units.
        while ( ms >= timeConstants[units[currentUnit]] ) {
            ms -= timeConstants[units[currentUnit]];
            time[units[currentUnit]] += 1;
        }

        if (options.showEmpty) {
            time_str += time[units[currentUnit]] + ' ' + currentUnit + ' ';
        } else if (time[units[currentUnit]] > 0) {
            time_str += time[units[currentUnit]] + ' ' + currentUnit + ' ';
        }
        
    });
    // console.log(`Time: ${JSON.stringify(time)} | Current Units: ${JSON.stringify(currentUnits)}`);        
    // console.log(time_str);
    
    return time_str.trim();

}

function impreciseDurationAddedToNow(str) {
    let time = timeStringToMs(str);
    let now = Date.now();
    let added = time + now;
    return added;
}

module.exports = {
    timeStringToMs: timeStringToMs,
    msToTimeString: msToTimeString,
    impreciseDurationAddedToNow : impreciseDurationAddedToNow
};