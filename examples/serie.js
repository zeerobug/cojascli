const moment = require('moment');
const Cojascli = require('../lib');

let serie = new Cojascli.Serie({ name: 'Test Date', opts: { sort: true, order: 'date', direction: 'ASC', grouped: true, fillNullDateValues: true, dateFormat: 'YYYY/MM/DD' } });
serie.setDataPoint({ x: moment('2019-06-12', "YYYY-MM-DD"), y: 2 });
serie.setDataPoint({ x: moment('2019-06-12', "YYYY-MM-DD"), y: 15 });
serie.setDataPoint({ x: moment('2019-05-29', "YYYY-MM-DD"), y: 3 });
serie.setDataPoint({ x: moment('2019-05-28', "YYYY-MM-DD"), y: 123 });
serie.setDataPoint({ x: moment('2019-06-1', "YYYY-MM-DD"), y: 12 });
let res = serie.get();
// console.log(res);
