# COJASCLIB
> COmmon JAvascript Standard for Charting LIBraries

*Note: This package is in active development and therefore should not be used until further notice*

## Introduction
With the increasing number of javascript libraries for data visualization, and the benefits and flaws of each of them, programmers are often obliged to use several libraries for the same project. These heterogeneity adds unnecessary complexity to the code and can lead to problems.
We developped this package as an intent to define a standard for data visualization with a system of pluggable adaptors for external libraries.

## Quick start:
`npm install cojasclib --save`

```javascript
let Cojasclib = require('cojasclib')

let chart = new Cojasclib.Chart()
let serie = new Cojasclib.Serie({ name: 'serie name', opts: {}})

serie.setDataPoint({ x: '', y: '', label: '', opts: {} })

chart.setSerie(serie.get())
chart.render(chartVendorTranslatorPlugin).then(res => {
  chartValues=res
)
            
```

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
> TODO
