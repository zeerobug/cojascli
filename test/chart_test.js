'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

// Then either:
var expect = chai.expect;

const Cojascli = require('../lib');

describe('#chartClass tests', function() {
  it('Should store 100 series in result', function() {
    let chart = new Cojascli.Chart();
    for (let n = 0; n < 100; n++) {
      const serie = new Cojascli.Serie({ name: 'Test' + n });
      chart.setSerie(serie);
    }
    expect(chart.result.series.length).to.equal(100);
  });

  it('Should take a plugin as argument and return a valid object', function() {
    let chart = new Cojascli.Chart();
    const serie = new Cojascli.Serie({ name: 'Test' });
    serie.setDataPoint({ x: 1, y: 1, label: 'test' });
    chart.setSerie(serie);
    return expect(chart.render('chartist')).to.eventually.have.property(
      'datasets'
    );
  });
  it('Should sort points of 2 series with same x according to a function', async function() {
    // TODO
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie({
      name: 'Test',
      options: { sort: true, order: sortFunction, direction: 'ASC' },
    });
    serie.setDataPoint({ x: 'Very Good 10', y: 87 });
    serie.setDataPoint({ x: 'Not Good 1', y: 2 });
    serie.setDataPoint({ x: '7', y: 15 });
    serie.setDataPoint({ x: '6', y: 13 });
    serie.setDataPoint({ x: '4', y: 123 });
    serie.setDataPoint({ x: '5', y: 12 });
    chart.setSerie(serie);
    let serie2 = new Cojascli.Serie({
      name: 'Test2',
      options: { sort: true, order: sortFunction, direction: 'ASC' },
    });
    serie2.setDataPoint({ x: 'Very Good 10', y: 41 });
    serie2.setDataPoint({ x: 'Not Good 1', y: 21 });
    serie2.setDataPoint({ x: '7', y: 151 });
    serie2.setDataPoint({ x: '6', y: 132 });
    serie2.setDataPoint({ x: '4', y: 99 });
    serie2.setDataPoint({ x: '5', y: 76 });
    chart.setSerie(serie2);
    let res = await chart.render('chartjs');
    expect(res[0].datasets[0].data[0]).to.equal(2);
    expect(res[0].datasets[1].data[1]).to.equal(99);
    expect(res[0].datasets[1].data[3]).to.equal(132);
  });
  it("Should create the missing points if 2 series don't share the same x and sort it at the chart level", async function() {
    // TODO
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie({ name: 'Test' });
    serie.setDataPoint({ x: '4', y: 123 });
    serie.setDataPoint({ x: '5', y: 12 });
    chart.setSerie(serie);
    let serie2 = new Cojascli.Serie({ name: 'Test2' });

    serie2.setDataPoint({ x: '1', y: 99 });
    serie2.setDataPoint({ x: '2', y: 99 });
    serie2.setDataPoint({ x: '3', y: 76 });
    chart.setSerie(serie2);
    let res = await chart.render('chartjs', { sort: true, direction: 'DESC' });
    expect(res[0].datasets[0].data[0]).to.equal(12);
    expect(res[0].datasets[1].data[2]).to.equal(76);
    expect(res[0].datasets[1].data[3]).to.equal(99);
  });
});

function sortFunction(elt) {
  if (elt.x.includes('Not')) return 1;
  else if (elt.x.includes('Very')) return 10;
  else return parseInt(elt.x);
}
