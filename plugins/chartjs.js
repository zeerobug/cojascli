const _ = require('lodash');
let chartUtils = require('../lib/chartUtils');

// Chartjs plugin
let dictionary = {
  legendDisplay: 'legend.display',
  dummyTest: 'dummy[0].test',

  defaultFontColor: [
    'scales.xAxes[0].ticks.fontColor',
    'scales.yAxes[0].ticks.fontColor',
  ],
  reverse: 'scales.yAxes[0].ticks.reverse',
  ticksMinimum: 'ticks.min',
  yDisplay: 'scales.yAxes[0].display',
  xDisplay: 'scales.xAxes[0].display',
  xDisplayGrid: 'scales.xAxes[0].gridLines.display',
};

const chartjsPlugin = (chartClassObject, chartClassOptions) => {
  let ret = {};
  let pointBackgroundColors = [];
  ret.datasets = [];
  ret.labels = [];
  ret.options = chartClassObject.options;

  // Define list of laabels
  ret.labels = chartUtils.getLabels(chartClassObject.series);
  // Adding series
  chartClassObject.series.forEach((serie) => {
    pointBackgroundColors = [];
    let dataset = {
      data: [],
      label: serie.name,
      backgroundColor: serie.color || chartUtils.getRandomColor(),
      type: serie.type ? serie.type : null,
      order: serie.order ? serie.order : null,
    };
    // We merge options
    if (serie.options) {
      dataset = _.merge(dataset, serie.options);
      // Default values here
      dataset.backgroundColor = dataset.backgroundColor
        ? dataset.backgroundColor
        : chartUtils.getRandomColor();
      dataset.borderColor = dataset.borderColor
        ? dataset.borderColor
        : dataset.backgroundColor;
      if (serie.options.layer) {
        dataset.order = serie.options.layer;
      }
    }
    let n = 0;
    // Add points according to ret.labels
    ret.labels.forEach((label) => {
      // Is there a value for that point?
      let point = _.find(serie.points, { x: label });
      if (point) {
        if (point.options) {
          // We process point options
          // Colors
          if (point.options.color) {
            pointBackgroundColors.push(point.options.color);
          } else if (serie.options.backgroundColor) {
            pointBackgroundColors.push(serie.options.backgroundColor[n++]);
          }
        }
        if (chartClassObject.options.graphType == '3D') {
          //TODO
          // 3D case
          dataset.data.push({
            x: point.x,
            y: point.y,
            r: point.z,
          });
        } else dataset.data.push(point.y);
      } else {
        dataset.data.push(0);
      }
    });

    if (pointBackgroundColors.length > 0 && serie.options.type != 'radar')
      // We merge with points properties
      dataset.backgroundColor = pointBackgroundColors;

    //else dataset.backgroundColor = serie.color || chartUtils.getRandomColor();
    ret.datasets.push(dataset);
  });
  let chartOptions = chartUtils.transformOptions(
    chartClassObject.options,
    dictionary
  );
  // Apply function to labels if set
  if (_.isFunction(chartClassOptions.labelFunction)) {
    ret.labels = ret.labels.map(chartClassOptions.labelFunction);
  }
  // Split labels if needed
  let lengthXMax = chartClassOptions.lengthXMax;

  if (lengthXMax > 0) {
    ret.labels = chartUtils.processXLabels(ret.labels, lengthXMax);
  }
  return [ret, chartOptions];
};

module.exports = chartjsPlugin;
