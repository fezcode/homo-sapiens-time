# Homo Sapiens Time

A simple time utility.

Human-style time descriptions to milliseconds.

_Quite a Simple One_

## Installation
... To be written ...
## Description
There are three main functions.

- `msToTimeString`
- `timeStringToMs`
- `impreciseDurationAddedToNow`

## Time String Format
A single time part consists of the following format:
- Positive or Negative Integer
- Time Unit

There can only be one or zero spaces between each part.
Time part can repeat as much as needed.

All time units are: 

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

- "1year"
- "1 year"
- "2 year 3 months"
- "31557601000 milliseconds"
- "1year -6 month" = "6 months"

### I. msToTimeString

#### Summary
This function takes `ms` and converts it to string that consists of given units.

This method has FIFO execution for `units` which means order of units matter.
For example, if `ms` is given as the first value of `units` array then result will be same as `ms` parameter's value since `ms` in `units` will consume all value.

#### Parameters

#### 1. `ms`
Number containing time in milliseconds.

#### 2. `opts`
```JS
opts = {
    auto: boolean,
    units: array of string,
    showEmpty: boolean,
    sortUnits: boolean
}
```
#### 2.1 `opts.auto` 

when set to `true` units will be overwritten as `['year','month','week','day','hour','minute','seconds','ms']`

#### 2.2 `opts.units`
any valid set of time units. Any of the following can be unit:
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
> Default value is `['year','month','week','day','hour','minute','seconds','ms']` if `auto` is `true` else `['hour','minute','second']`.

#### 2.3 `opts.showEmpty`
when set to `true`, if a unit with no value exists in the result, it will be written regardless. 
> Default value is `false`.

#### 2.4 `opts.sortUnits`
Since order of `opts.units` matters, you can sort units to make longer units to have higher priority.
Priority: `y > mo > w > d > h > m > s > ms`
Units with higher priority will be closer to beginning of array.

> Default value is `false`.

#### Return
Returns time string in **Time String Format** or `null` if any error occurred.


#### Examples.
```JS
msToTimeString(31557601000, {auto: false, units: ['seconds', 'year'], sortUnits: true} == '1 year 1 seconds'

```

### II. timeStringToMs
#### Summary
Takes a time string similar to ones produced in `msToTimeString` and converts it to milliseconds.

#### Parameters

#### 1. `str`:
String containing time in **Time String Format**.

#### Return
Returns ms converted from `str`.


### III. impreciseDurationAddedToNow

#### Summary

This method adds given time string `str` to `Date.now()` value.
Time string must be in **Time String Format**.

Internally calls `timeStringToMs` to convert `str` to ms.

#### Parameters

#### 1. `str`:
String containing time in **Time String Format**.


#### Return
Millisecond value of `Date.now() + str`.