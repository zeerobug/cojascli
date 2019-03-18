//See clips data object for charts for def

class chartClass {

  // Members definition
  constructor() {
    this.result = {};
    this.result.series = [];
    this.result.options = {};
  }

  setSerie(serie) {
    // If name already exists raise error
    if (serie.name !== '' && this._findSerieIdByName(serie.name) !== null) 
      throw new Error('Duplicate series name');
    this
      .result
      .series
      .push(serie)
  }

  // Get can receive a plugin as argument that transforms the data as needed by
  // the charting library
  async render(pluginName) {
    const plugin = await import('../plugins/' + pluginName);
    if (typeof plugin === 'function') {
      return Promise.resolve(plugin(this.result))
    }
    return Promise.resolve(this.result);
  }

  //Pivate functions
  _findSerieIdByName(serieName = '') {
    for (let index = 0; index < this.result.series.length; index++) {
      const element = this.result.series[index];
      if (element.name === serieName) 
        return index;
    }
    return null;
  }
}

module.exports = chartClass;