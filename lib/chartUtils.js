let _ = require('lodash');
let chartPoint = require('../lib/chartPoint');

let chartUtils = {
  getRandomColor: function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  transformOptions: function(opts, dictionary) {
    let ret = {};
    for (const key in opts) {
      if (_.isUndefined(dictionary[key])) {
        // we merge with options
        ret[key] = opts[key];
        //console.log('Key ', key, ' is undefined in translation dictionary');
      } else {
        if (!_.isNull(dictionary[key])) {
          if (_.isArray(dictionary[key])) {
            dictionary[key].forEach((val) => {
              _.set(ret, val, opts[key]);
            });
          } else {
            _.set(ret, dictionary[key], opts[key]);
          }
        }
      }
    }
    return ret;
  },
  /**
   * For plugins like chartjs which separate arrays of absciss and ordenate
   * and in the case of multiple series, extracts all absciss values
   * and adds mssing null points
   * @param  {array} series array of cojasclib series
   * @param  {string} sort If and how to sort x. "numeric", "alpha", "date" or false
   * @return {array} the same series with the missing points
   */
  consolidX(series, sort = 'numeric') {
    // Get all values for xç
    let absx = [];
    series.forEach((serie) => {
      let xs = serie.points.map((a) => a.x);
      if (sort) absx = _.union(absx, xs).sort();
    });
    series.forEach((serie) => {
      //let points = {};
      absx.forEach((value) => {
        // Is there a value for this year:
        let found = serie.points.find((o) => o.x == value);
        // if there is no value for this year we add it
        if (!found)
          serie.points.push(
            new chartPoint({ label: value, x: value, y: null })
          );
      });
      if (sort) serie.points = _.sortBy(serie.points, ['x']);
    });
    return series;
  },

  chartSort(points, order = '', direction = 'ASC', property = 'x') {
    direction = direction ? direction : 'ASC';
    if (order == 'alpha' || order == '') {
      points.sort((a, b) => {
        if (direction == 'ASC') return a[property] > b[property] ? 1 : -1;
        else if (direction == 'DESC') return a[property] < b[property] ? 1 : -1;
      });
    } else if (_.isFunction(order)) {
      points = _.orderBy(points, order, direction ? direction : 'ASC');
    } else if (_.isArray(order)) {
      if (direction == 'ASC')
        points.sort((a, b) =>
          order.indexOf(a[property]) > order.indexOf(b[property]) ? 1 : -1
        );
      else if (direction == 'DESC')
        points.sort((a, b) =>
          order.indexOf(a[property]) > order.indexOf(b[property]) ? -1 : 1
        );
    } else if (order == 'date') {
      if (direction == 'ASC')
        points.sort((a, b) => (a[property] > b[property] ? 1 : -1));
      else if (direction == 'DESC')
        points.sort((a, b) => (a[property] > b[property] ? -1 : 1));
    }
    return points;
  },
  getMediumValue(series) {
    // set an array with all y values
    let ys = [];
    series.every((serie) => {
      console.log('SERIe', serie);
      ys = [...ys, ...serie.points.map((p) => p.y)];
    });
    return ys.reduce((acc, val) => acc + val) / ys.length;
  },
};

module.exports = chartUtils;
