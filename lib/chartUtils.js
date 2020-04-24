let _ = require('lodash');

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
};

module.exports = chartUtils;
