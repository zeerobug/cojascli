// See clips data object for charts for def
const chartSerie = require('./chartSerie');

class chartClass {
  // Members definition
  constructor(options = {}) {
    this.result = {};
    this.result.series = [];
    this.result.options = options;
  }

  setSerie(serie) {
    // If name already exists raise error
    if (serie.name !== '' && this._findSerieIdByName(serie.name) !== null)
      throw new Error('Duplicate series name');
    this.result.series.push(serie.get());
  }

  prepareData(rawData) {
    for (const dataSet of rawData.data) {
      let serie = new chartSerie({
        name: dataSet.name,
        options: dataSet.options ? dataSet.options : {},
      });
      for (var point of dataSet.data) {
        serie.setDataPoint(point);
      }
      this.setSerie(serie);
    }
  }

  // Get can receive a plugin as argument that transforms the data as needed by
  // the charting library
  async render(pluginName) {
    try {
      const plugin = await require(`../plugins/${pluginName}`);
      if (typeof plugin === 'function') {
        return Promise.resolve(plugin(this.result));
      }
    } catch (e) {
      throw new Error('There was a problem with the plugin');
    }
    // return Promise.resolve(this.result);
  }

  // Pivate functions
  _findSerieIdByName(serieName = '') {
    for (let index = 0; index < this.result.series.length; index++) {
      const element = this.result.series[index];
      if (element.name === serieName) return index;
    }
    return null;
  }
}

module.exports = chartClass;
