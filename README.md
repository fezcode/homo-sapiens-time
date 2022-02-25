# Homo Sapiens Time

A simple time utility for Node.js

Human-style time descriptions to milliseconds and vice versa.

_Quite a Simple One_

## Installation
```bash
npm install homo-sapiens-time
#or
yarn add homo-sapiens-time
```

## Usage
#### Node
```js
const hst = require("homo-sapiens-time")
```
#### HTML/JS
```html
<script type="text/javascript" src="homo-sapiens-time.js"> </script>
<div id="message"> </div>
<script> 
    var x = msToTimeString(31557601000, {auto: false, units: ['seconds', 'year'], sortUnits: true}); 
    document.getElementById("message").innerHTML=x;
</script>
```

## Description
There are three main functions.

- `msToTimeString`
- `timeStringToMs`
- `impreciseDurationAddedToNow`

Defined time units are not as precise as calendar. 
| Unit          | Milliseconds | Equivalent To |
|---------------|--------------|---------------|
| 1 year        | 31557600000  | 365.25 days   |     
| 1 month       | 2629800000   | 30.4375 days  |      
| 1 week        | 604800000    | 7 days        |     
| 1 day         | 86400000     | 24 hours      |     
| 1 hour        | 3600000      | 60 minutes    |    
| 1 minute      | 60000        | 60 seconds    |     
| 1 seconds     | 1000         | 1000 ms       |     
| 1 millisecond | 1            | 1 ms          |  

## Time String Format
A single **time part** consists of the following format:
- Positive or Negative Integer
- Time Unit

There can only be one or zero spaces between each part.
**Time part** can repeat as much as needed.

All available time units are: 

| Plural        | Singular     | Short | Maps To|
|---------------|--------------|-------|:------:|
| years         | year         | y     | 'y'    |     
| months        | month        | mo    | 'mo'   |      
| weeks         | week         | w     | 'w'    |     
| days          | day          | d     | 'd'    |     
| hours         | hour         | h     | 'h'    |    
| minutes       | minute       | m     | 'm'    |     
| seconds       | second       | s     | 's'    |     
| milliseconds  | millisecond  | ms    | 'ms'   |     

Plural, singular or short version of unit doesn't affect calculation,
it just affects printed text. Integer value is not checked for plural or singular units either.

### Example

- "1year" = "1 year" = "1 y"
- "2 year 3 months"
- "31557601000 milliseconds"
- "1year -6 month" = "6 months"

-----------------------

## 1. msToTimeString

### Summary
This function takes `ms` and converts it to string that consists of given units.

This method has FIFO execution for `units` which means order of units matter.
For example, if `ms` is given as the first value of `units` array then result will be same as `ms` parameter's value since `ms` in `units` will consume all value.

This function will detect any unit type typos given and will suggestions. For example:
`msToTimeString(31557601000, {auto: false, units: ['seconds', 'yeer']})` will produce
```text
Error! Given unit `yeer` is not valid.
           Did you mean `year`?
```
String similarity function is taken from [David from StackOverflow](https://stackoverflow.com/a/36566052).
Thanks David. 👍

### Parameters

##### 1.1 `ms`
Number containing time in milliseconds.

##### 1.2 `opts`
```JS
opts = {
    auto: boolean,
    units: array of string,
    showEmpty: boolean,
    sortUnits: boolean
}
```
##### 1.2.1 `opts.auto` 

when set to `true` units will be overwritten as `['year','month','week','day','hour','minute','seconds','ms']`

##### 1.2.2 `opts.units`
any valid set of time units. Following are the available units:
```JS
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
```
> Default value is `['year','month','week','day','hour','minute','second','ms']` if `auto` is `true` else `['hour','minute','second']`.

##### 1.2.3 `opts.showEmpty`
when set to `true`, if a unit with no value exists in the result, it will be written regardless. 

> Default value is `false`.

##### 1.2.4 `opts.sortUnits`
Since order of `opts.units` matters, you can sort units to make longer time units (like year being longer than month) to have higher priority.
Priority: `y > mo > w > d > h > m > s > ms`
Units with higher priority will be closer to beginning of array.

> Default value is `false`.

##### Return
Returns time string in **Time String Format** or `null` if any error occurred.

#### Examples
```JS
msToTimeString(31557601000, {auto: false, units: ['seconds', 'year'], sortUnits: true}) == '1 year 1 seconds'
msToTimeString(31557601001, {auto : true, units: [ 'year', 'month' ], showEmpty: false}) == '1 year 1 seconds 1 ms'
msToTimeString(74580249002, {auto: true}) == '2 year 4 month 1 week 3 day 22 hour 44 minute 9 second 2 ms'

```

## 2. timeStringToMs
### Summary
Takes a time string similar to ones produced in `msToTimeString` and converts it to milliseconds.

### Parameters

##### 1. `str`:
String containing time in **Time String Format**.

##### Return
Returns ms converted from `str`.

#### Examples
```JS
timeStringToMs("1 year -6 month") == timeStringToMs("6 month")
timeStringToMs("2 years 4 months 10 days 22 hours 44 minutes 9 seconds 2 ms") == 74580249002
timeStringToMs("1 year 1 month 1 week 1 day 1 hour -1 hour -1 day -1mo -1y") == timeStringToMs("1 week")
timeStringToMs("1 week") == timeStringToMs("7 days")
```

## 3. impreciseDurationAddedToNow

### Summary

This method adds given time string `str` to `Date.now()` value.
Time string must be in **Time String Format**.

Internally calls `timeStringToMs` to convert `str` to ms.

### Parameters

##### 1. `str`:
String containing time in **Time String Format**.


##### Return
Millisecond value of `Date.now() + timeStringToMs(str)`.

## Notes
> This library is perfect for durations. Since it is not precise I highly **recommend being careful** about using
> it for precise calendar operations.
