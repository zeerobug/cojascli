# COJASCLIB

> COmmon JAvascript Standard for Charting LIBraries

_Note: This package is in active development and therefore should not be used until further notice_

<<<<<<< HEAD
### Introduction

With the increasing number of javascript libraries for data visualization, and the benefits and flaws of each of them, programmers are often obliged to use several libraries for the same project. These heterogeneity adds unnecessary complexity to the code and can lead to problems.
We developped this package as an intent to define a standard for data visualization with a system of pluggable adaptors for external libraries.

#### Quick start:

=======
## Introduction
With the increasing number of javascript libraries for data visualization, and the benefits and flaws of each of them, programmers are often obliged to use several libraries for the same project. These heterogeneity adds unnecessary complexity to the code and can lead to problems.
We developped this package as an intent to define a standard for data visualization with a system of pluggable adaptors for external libraries.

## Quick start:
>>>>>>> 280ad35c64eab2c56b73cfec1fb09debf2dc3fc6
`npm install cojasclib --save`

```javascript
let Cojasclib = require('cojasclib')

let chart = new Cojasclib.Chart(graphOptions)
let serie = new Cojasclib.Serie({ name: 'serie name', options: serieOptions)

serie.setDataPoint({ x: '', y: '', label: '', options: {} })

chart.setSerie(serie)
chart.render("chartjs").then(res => {
  this.renderChart(res[0], res[1]);
)

```

<<<<<<< HEAD
#### chart Object

setSerie(): Adds serie to final chart object. can be done several time for multi-series

#### chart serie object:

- name: name of the serie. Appears as serie legend
- opts:
  - sort: true is sorted, false not
  - order: defaults to numeric sort
    - 'array': sort according to the array
    - 'date': date sorted
    - 'alpha': alpha sorted
  - direction: 'ASC' or 'DESC'. Defaults to 'ASC'
  - fillNullDateValues: if a date are missing in the serie, replaces it with the point {label: date, x: date, y: 0}
  - dateFormat: defines the output of the label if it is moment object. see Moment formatting
  - cumulative: adds each value of serie to previous one
  - grouped: if 2 points have the same label, they are cumulated.

#### Data point

- x: the absciss value
- label: the x label (defaults to x)
- y: the ordinate value (defaults to label)
- z: the z coordinate for a 3d point (defaults to none)
- opts: datapoint options, passed transparently to the graph plugin

# Available plugins

- chartist
- chartjs

# Plugin Development

The idea is that the same settings will wwork with any Library

## Common Options:

| Option           | Type   | Description                                            |
| ---------------- | ------ | ------------------------------------------------------ |
| defaultFontColor | string | Defines font color for all graph text                  |
| legendDisplay    | Bool   | Wether legend should be displayed                      |
| xDisplay         | Bool   | If xaxis legends, ticks and labels should be displayed |
| yDisplay         | Bool   | If yaxis legends, ticks and labels should be displayed |
| xDisplayGrid     | Bool   | If xaxis grid should be displayed                      |
| yDisplayGrid     | Bool   | If yaxis grid should be displayed                      |

=======
 ### chart Object
 
 setSerie(): Adds serie to final chart object. can be done several time for multi-series
 
 
 ### chart serie object:
 * name: name of the serie. Appears as serie legend
 * opts: 
   * sort: true is sorted, false not
   * order: defaults to numeric sort
     * 'array': sort according to the array
     * 'date': date sorted
     * 'alpha': alpha sorted 
   * direction: 'ASC' or 'DESC'. Defaults to 'ASC'
   * fillNullDateValues: if a date are missing in the serie, replaces it with the point {label: date, x: date, y: 0}
   * dateFormat: defines the output of the label if it is moment object. see Moment formatting
   * cumulative: adds each value of serie to previous one
   * grouped: if 2 points have the same label, they are cumulated. 
 
 
 ### data point
 * x: the absciss value
 * label: the x label (defaults to x)
 * y: the ordinate value (defaults to label)
 * z: the z coordinate for a 3d point (defaults to none)
 * opts: datapoint options, passed translarently to the graph plugin

## Plugin Development
>>>>>>> 280ad35c64eab2c56b73cfec1fb09debf2dc3fc6
> TODO
