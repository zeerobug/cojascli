const tablePlugin = (chartClassObject, options) => {
  let ret = {};
  if (options.addRank)
    chartClassObject.series[0].points.map((elt, i) => (elt.r = i + 1));
  ret.datasets = chartClassObject.series;
  return [ret, { ...chartClassObject.options, ...options }];
};

module.exports = tablePlugin;
