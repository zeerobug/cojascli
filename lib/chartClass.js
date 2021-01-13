// See clips data object for charts for def
const _ = require('lodash');
const chartSerie = require('./chartSerie');
const chartPoint = require('./chartPoint');
const chartUtils = require('./chartUtils');

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
      console.log(
        'Warning: Two series share the same name. "' +
          serie.name +
          '" This can lead to potential errors'
      );
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
  // the output library
  async render(pluginName, options = {}) {
    // Homogenize Absx by default
    if (!options.noConsolidation && this.result.series.length > 1) {
      this._consolidateX();
    }
    if (options.drawMediumLine) {
      this._drawMediumLine(options.drawMediumLine.options);
    }
    if (options.sort) {
      for (let i = 0; i < this.result.series.length; i++) {
        this.result.series[i].points = chartUtils.chartSort(
          this.result.series[i].points,
          options.order,
          options.direction
        );
      }
    }
    if (options.yLabel && options.yLabel.length > 0) {
      for (let i = 0; i < this.result.series.length; i++) {
        this.result.series[i].points = chartUtils.chartSort(
          this.result.series[i].points,
          (item) => chartUtils.fixOrder(options.yLabel, item),
          options.direction
        );
      }
    } else if (options.sortOrdinates) {
      this._sortOrdinates(options.sortOrdinates);
    }
    try {
      const plugin = await require(`../plugins/${pluginName}`);
      if (typeof plugin === 'function') {
        return Promise.resolve(plugin(this.result, options));
      }
    } catch (e) {
      console.log(e);
      throw new Error(
        `There was a problem with the plugin: ${pluginName}. ` + e
      );
    }
    // return Promise.resolve(this.result);
  }

  // Private functions
  _sortOrdinates(options) {
    // We sort only the 1st one
    this.result.series[0].points = chartUtils.chartSort(
      this.result.series[0].points,
      options.order,
      options.direction,
      'y'
    );
  }

  _findSerieIdByName(serieName = '') {
    for (let index = 0; index < this.result.series.length; index++) {
      const element = this.result.series[index];
      if (element.name === serieName) return index;
    }
    return null;
  }

  _consolidateX() {
    let allX = this._getAllX();
    this._populateMissingX(allX);
  }
  _getAllX() {
    let allX = [];
    this.result.series.forEach((serie) => {
      allX = _.union(allX, _.map(serie.points, 'x'));
    });
    return allX;
  }
  _populateMissingX(allX, value = null) {
    // Are there missing points?
    let opts = this.result.options.missingPointOptions
      ? this.result.options.missingPointOptions
      : {};
    this.result.series.forEach((serie) => {
      allX.forEach((xValue) => {
        // Search if x is defined in serie
        let found = _.find(serie.points, { x: xValue });
        if (!found) {
          //   console.log('NOT FOUND IN: ', serie.name, xValue, value);
          serie.points.push(new chartPoint({ x: xValue, y: value, opts }));
        }
      });
      //   let missingX = this._getMissingX(allX, serie.points);
      //   missingX.forEach((x) => {
      //     let opts = this.result.options.missingPointOptions
      //       ? this.result.options.missingPointOptions
      //       : {};
      //     serie.points.push(new chartPoint({ x, y: value, opts }));
      //   });

      //   this.result.series.points = _.union(serie.points, allX);
    });
  }
  _getMissingX(allX, points) {
    return _.difference(allX, _.map(points, 'x'));
  }
  _drawMediumLine(opts = {}) {
    // Calculate medium value
    let medium = chartUtils.getMediumValue(this.result.series);
    // Add serie with same value
    this._drawHLine(medium, 'Medium', opts);
  }

  _drawHLine(value, name, opts = {}) {
    let hLine = new chartSerie({
      name,
      options: opts,
    });
    try {
      this.result.series[0]['points'].forEach((p) => {
        hLine.setDataPoint({ x: p.x, y: value });
      });
    } catch (e) {
      console.log('Reference serie has no points. Need it to draw line');
    }
    hLine.type = 'line';
    hLine.options.fill = false;
    this.setSerie(hLine);
  }
}

module.exports = chartClass;
