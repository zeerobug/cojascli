'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var { serie1, serie2, pieSerie } = require('./data');

chai.use(chaiAsPromised);

// Then either:
var expect = chai.expect;

const Cojascli = require('../lib');

describe('#CSV plugin tests', function() {
  it('Should return a valid csv', async function() {
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie(serie1);
    chart.setSerie(serie);
    serie = new Cojascli.Serie(serie2);
    chart.setSerie(serie);
    let res = await chart.render('csvPlugin');
    expect(res.length).to.equal(79);
  });
  it('Should return a horizontal csv', async function() {
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie(serie1);
    chart.setSerie(serie);
    serie = new Cojascli.Serie(serie2);
    chart.setSerie(serie);
    let res = await chart.render('csvPlugin', { horizontal: true });

    expect(res.split('\n').length).to.equal('3');
  });
  it.only('Should work with pie type series', async function() {
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie(pieSerie);
    chart.setSerie(serie);
    let res = await chart.render('csvPlugin', { horizontal: true });
    console.log(res);
  });
});
