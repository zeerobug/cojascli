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
  yDisplay: 'scales.yAxes[0].display',
  xDisplay: 'scales.xAxes[0].display',
  xDisplayGrid: 'scales.xAxes[0].gridLines.display',
};

const chartjsPlugin = (chartClassObject) => {
  let ret = {};
  let pointBackgroundColors = [];
  ret.datasets = [];
  ret.labels = [];
  ret.options = chartClassObject.options;
  let labelsDone = false;

  // Adding series
  chartClassObject.series.forEach((serie) => {
    let dataset = {
      data: [],
      label: serie.name,
      backgroundColor: serie.color || chartUtils.getRandomColor(),
    };
    // We merge options
    if (serie.opts) {
      dataset = _.merge(dataset, serie.opts);
      // Default values here
      dataset.backgroundColor = dataset.backgroundColor
        ? dataset.backgroundColor
        : chartUtils.getRandomColor();
      dataset.borderColor = dataset.borderColor
        ? dataset.borderColor
        : chartUtils.getRandomColor();
    }
    serie.points.forEach((point) => {
      if (!labelsDone) ret.labels.push(point.label ? point.label : point.x);
      if (point.options) {
        // We process point options
        // Colors
        if (point.options.color) {
          pointBackgroundColors.push(point.options.color);
        }
      }
      if (chartClassObject.options.graphType == '3D') {// 3D case
        dataset.data.push({x: point.x, y: point.y, r: point.z});
      } else dataset.data.push(point.y);
    });

    // We merge with points properties
    if (pointBackgroundColors.length > 0)
      dataset.backgroundColor = pointBackgroundColors;

    //else dataset.backgroundColor = serie.color || chartUtils.getRandomColor();
    labelsDone = true;
    ret.datasets.push(dataset);
  });

  let chartOptions = chartUtils.transformOptions(
    chartClassObject.options,
    dictionary
  );
  return [ret, chartOptions];
};

module.exports = chartjsPlugin;
