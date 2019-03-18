'use strict';

const expect = require('chai').expect;
const Cojascli = require('../lib');

describe('#chartClass tests', function () {
  it('Should create a chart in one single line', function () {
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie({name: 'Test'});
    chart.setSerie(serie);
    expect(chart.get()).to.have.property('series');
  });
  it('Should not accept 2 series with the same name', function () {
    let chart = new Cojascli.Chart();
    const serie1 = new Cojascli.Serie({name: 'Test'});
    const serie2 = new Cojascli.Serie({name: 'Test'});
    chart.setSerie(serie1);
    
    expect(() => {
      chart.setSerie(serie2);
    })
      .to
      .throw('Duplicate series name');
  });

  it('Should store 100 series in result', function () {
    let chart = new Cojascli.Chart();
    for (let n = 0; n < 100; n++) {
      const serie = new Cojascli.Serie({name: 'Test'+n});
      chart.setSerie(serie);
    } 
    expect(chart.result.series.length)
      .to
      .equal(100);
  });

  it('Should take a plugin as argument and return a valid object', function () {
    let chart = new Cojascli.Chart();
    const serie = new Cojascli.Serie({name: 'Test'});
    let res = chart.get(() => {
      return chart.result;
    })
    expect(chart.result.series.length)
      .to
      .equal(0);
  });

});