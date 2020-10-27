const tablePlugin = (chartClassObject, options) => {
  if (options.addRank)
    chartClassObject.series[0].points.map((elt, i) => (elt.r = i + 1));
  return [
    chartClassObject.series[0].points,
    { ...chartClassObject.options, ...options },
  ];
};

module.exports = tablePlugin;
