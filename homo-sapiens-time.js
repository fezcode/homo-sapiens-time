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

    months : 'm',
    month : 'm',
    mo : 'm',

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

const getMSEquivalent = (type, count) => {
    return count * timeConstants[units[type]]
}

const millisecondConversionRegex = new RegExp('((\\d+)\\s*(milliseconds|seconds|minutes|hours|days|weeks|months|years|millisecond|second|minute|hour|day|week|month|year|ms|mo|m|s|h|d|y|w)\\s*)', 'g')
const sec = new RegExp('\\d', 'g')
function timeToMilliseconds() {
    var str = "1years1w 1mo";
    let milliseconds = 0;
    let myArray;
    while ((myArray = millisecondConversionRegex.exec(str)) !== null) {
        var type = myArray[3];
        var count = parseInt(myArray[2]);

        console.log(type + " " + count)

        milliseconds += getMSEquivalent(type, count);


        // console.log(myArray);
        // let msg = 'Found ' + myArray[0] + '. ';
        // msg += 'Next match starts at ' + millisecondConversionRegex.lastIndex;
        // console.log(msg);
    }

    // const shit = str.matchAll(millisecondConversionRegex);
    // console.log(shit);
}

timeToMilliseconds();