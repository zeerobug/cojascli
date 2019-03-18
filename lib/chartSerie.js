const moment = require('moment');
const chartPoint = require('./chartPoint');
//See clips data object for charts for def

class chartSerie {
  // Members definition
  constructor({
    name = '',
    type = '',
    opts = {}
  }) {
    if(name == '') throw new Error('Missing name');
    this.name = name;
    this.type = type;
    this.opts = opts;
    this.data = [];
    this.cumulatedTotal = 0;
  }

  setDataPoint(dataPoint = {}) {
    this._setDataPoint(dataPoint);
  }

  // EndPOINT !
  get() {
    if (this.opts.fillNullDateValues) {
      this.points = this._processChartdates(this.points, this.opts.dateFornat)
    }

    this.data = this._labelize(this.points);
    if (this.opts.sort) {
      this.data = this._chartSort(this.data, this.opts.order, this.opts.direction)
      // console.log('after',this)
    }
    // Remove unecessary data
    delete(this.points);
    return this;
  }

  _setDataPoint(dataPoint) {
    if (this.points === undefined) {
      this.points = {};
    }

    if (this.opts.dateFormat !== undefined) {
      if (dataPoint['label']._isAMomentObject) {
        dataPoint['label'] = dataPoint['label'].format(this.opts.dateFormat)
      }
    }

    if (this.points[dataPoint['label']] === undefined) 
      this.points[dataPoint['label']] = dataPoint['y']
        ? dataPoint['y']
        : 1
    else {
      if (this._isGrouped() || this._isCumulative()) {
        this.points[dataPoint['label']] += dataPoint['y']
          ? dataPoint['y']
          : 0;
      } else {
        this.points[dataPoint['label']] = dataPoint['y']
          ? dataPoint['y']
          : 0;
      }
    }
  }

  _isCumulative() {
    if (this.type === 'cumulative') 
      return true;
    else 
      return false;
    }
  
  _isGrouped() {
    if (this.type === 'grouped') 
      return true;
    else 
      return false;
    }
  
  _labelize(points) {
    let res = [];
    let y = 0;
    for (let key in points) {
      if (this._isCumulative()) {
        this.cumulatedTotal += this.points[key];
        y = this.cumulatedTotal;
      } else 
        y = this.points[key];
      let point = new chartPoint({label: key, x: key, y: y})
      res.push(point);
    }
    return res;
  }

  // Add missing values if series has dates as x
  _processChartdates(objOfDates, format = "YYYY-MM-DD") {
    let minMax = this._getMinMax(objOfDates, format);
    let ret = {};
    for (var m = moment(minMax.min); m.isBefore(minMax.max); m.add(1, 'days')) {
      ret[m.format(format)] = objOfDates[m.format(format)]
        ? objOfDates[m.format(format)]
        : 0;
    }
    return ret;
  }

  _getMinMax(objOfDates, format) {
    let min = moment();
    let max = 0;
    for (let prop in objOfDates) {
      let date = moment(prop, format)
      if (date < min) 
        min = date;
      if (date > max) 
        max = date;
      }
    return {min: min, max: max};
  }

  _chartSort(serie, order, direction = 'ASC') {
    if (order == 'alpha') {
      serie.sort((a, b) => {
        if (direction == 'ASC') 
          return a.label - b.label;
        else if (direction == 'DESC') 
          return b.label - a.label;
        }
      )
    } else if (_.isArray(order)) {
      if (direction == 'ASC') 
        serie.sort((a, b) => (order.indexOf(a.label) > order.indexOf(b.label))
          ? 1
          : -1)
      else if (direction == 'DESC') 
        serie.sort((a, b) => (order.indexOf(a.label) > order.indexOf(b.label))
          ? -1
          : 1)
      } else if (order == 'date') { //alphabetic sort
      if (direction == 'ASC') 
        serie.sort((a, b) => (a > b)
          ? 1
          : -1)
      else if (direction == 'DESC') 
        serie.sort((a, b) => (a > b)
          ? -1
          : 1)
      }
    // console.log('serie sorted: ',serie);
    return serie;
  }

}

module.exports = chartSerie;