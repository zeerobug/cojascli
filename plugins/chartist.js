const chartistPlugin = (chartClassObject) => {
    chartClassObject.datasets = chartClassObject.series;
    let ret = chartClassObject;
    let labels = [];
    // Get the labels
    for (let serie of chartClassObject.series) {
        for (let point of serie.points) {
            labels.push(point.label);
            delete (point.label);
        }
    }
    ret.labels = labels;
    return ret;
}

module.exports = chartistPlugin;