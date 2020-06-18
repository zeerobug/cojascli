// Use csv_writer: https://www.npmjs.com/package/csv-writer
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

const csvPlugin = (chartClassObject, options = {}) => {
  let [headers, records] =
    options && options.horizontal
      ? generateHorizontalArrayOfObject(chartClassObject)
      : generateVerticalArrayOfObject(chartClassObject);
  let csvHeaders = headers.map((h) => {
    return { id: h, title: h };
  });

  const csvStringifier = createCsvStringifier({
    header: csvHeaders,
  });
  let text =
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  return text;
};

function generateHorizontalArrayOfObject(chartClassObject) {
  let records = [];
  let etiqs = chartClassObject.series.map((o) => o.name);
  let headersObj = {};

  // foreach etiqs, we search the series and create the columns
  etiqs.forEach((etiq) => {
    let m = {};
    m.Serie = etiq;
    chartClassObject.series
      .filter((o) => o.name == etiq)
      .forEach((s) => {
        s.points.forEach((p) => {
          let l = p.label ? p.label : p.x;
          headersObj[l] = 1;
          m[l] = p.y;
        });
        records.push(m);
      });
  });
  let headers = ['Serie', ...Object.keys(headersObj)];
  return [headers, records];
}

function generateVerticalArrayOfObject(chartClassObject) {
  let records = [];
  chartClassObject.series.forEach((o) => {
    let res = {};
    o.points.forEach((p) => {
      res = {};
      res.name = o.name;
      p.x ? (res.x = p.x) : null;
      p.y ? (res.y = p.y) : null;
      p.label ? (res.label = p.label) : null;
      p.z ? (res.z = p.z) : null;
      records.push(res);
    });
  });
  let headers = records.length > 0 ? Object.keys(records[0]) : null;
  return [headers, records];
}

module.exports = csvPlugin;
