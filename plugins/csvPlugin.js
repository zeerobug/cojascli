// Use csv_writer: https://www.npmjs.com/package/csv-writer
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

const csvPlugin = (chartClassObject, options = {}) => {
  let [headers, records] =
    options && options.horizontal
      ? generateArrayOfObject(chartClassObject)
      : generateArrayOfObject(chartClassObject);
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

function generateArrayOfObject(chartClassObject) {
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
