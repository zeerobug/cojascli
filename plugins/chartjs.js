let chartUtils = require('../lib/chartUtils');

// Chartjs plugin
const chartjsPlugin = (chartClassObject) => {
    let ret = {};
    ret.datasets = []
    ret.labels = []
    let labelsDone = false;

    chartClassObject
        .series
        .forEach(serie => {
            let dataset = {
                data: [],
                label: serie.name,
                backgroundColor: serie.color || chartUtils.getRandomColor(),
                height: 400
            }
            //console.log(serie.name);
            serie
                .points
                .forEach(point => {
                    if (!labelsDone)
                        ret.labels.push(point.label
                            ? point.label
                            : point.x);
                    dataset
                        .data
                        .push(point.y);
                })
            labelsDone = true;
            ret
                .datasets
                .push(dataset);
        });
    return ret;
};

module.exports = chartjsPlugin;