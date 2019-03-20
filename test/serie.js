'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
const moment = require('moment');
chai.use(chaiAsPromised);
var expect = chai.expect;

const Cojascli = require('../lib');
const occurences = 100;

describe('#chartSerie tests', function() {
  it('Should not be able to create a serie without a name', function() {
    expect(() => {
      new Cojascli.Serie({});
    }).to.throw('Missing name');
	});
	it('Should be able to store ' + occurences + ' points without problem', function() {
		let serie = new Cojascli.Serie({ name: 'Test' });
		for (let index = 0; index < occurences; index++) {
			serie.setDataPoint({ x: index, label: index });
		}
		let res = serie.get();
		expect(res.data.length).to.equal(occurences);
  });
  it('Should populate the missing values with the option fillNullDateValues', function() {
    let serie = new Cojascli.Serie({ name: 'Test', opts: { fillNullDateValues: true } });
    let startDay = moment().subtract(9, 'days');
    let endDay =  moment();
    serie.setDataPoint({ x: startDay, y: 0});
    serie.setDataPoint({ x: endDay, y: 3});
    let res = serie.get();
    //console.log(res);
    expect(res.data).to.be.an('array') && expect(res.data.length).to.equal(10);
  });
  it('With the option fillNullDateValues, last value should be of the end Date', function() {
    let serie = new Cojascli.Serie({ name: 'Test', opts: { fillNullDateValues: true } });
    let startDay = moment().subtract(9, 'days');
    let endDay =  moment();
    serie.setDataPoint({ x: startDay, y: 0});
    serie.setDataPoint({ x: endDay, y: 345});
    let res = serie.get();
    expect(res.data).to.be.an('array') && expect(res.data[9]['y']).to.equal(345);
  });
  it('Should add all values with cumulative type', function() {
    let serie = new Cojascli.Serie({ name: 'Test', type: 'cumulative' });
    serie.setDataPoint({ x: '1', y: 2});
    serie.setDataPoint({ x: '2', y: 3});
    serie.setDataPoint({ x: '3', y: 123});
    let res = serie.get();
    expect(res.data[2].value).to.equal(128);
  });
  it('Should group values with grouped type', function() {
    let serie = new Cojascli.Serie({ name: 'Test', type: 'grouped' });
    serie.setDataPoint({ x: '1', y: 2});
    serie.setDataPoint({ x: '1', y: 3});
    serie.setDataPoint({ x: '1', y: 123});
    serie.setDataPoint({ x: '2', y: 12});
    let res = serie.get();
    expect(res.data[0].value).to.equal(128);
  });
  it('Should sort points alphanumerically', function() {
    let serie = new Cojascli.Serie({ name: 'Test', opts: { sort: true, order: 'alpha', direction: 'DESC' } });
    serie.setDataPoint({ x: 'r', y: 2});
    serie.setDataPoint({ x: 'z', y: 3});
    serie.setDataPoint({ x: 'd', y: 123});
    serie.setDataPoint({ x: 'p', y: 12});
    let res = serie.get();
    expect(res.data[0].value).to.equal(3);
  });
  it('Should sort points numerically', function() {
    let serie = new Cojascli.Serie({ name: 'Test', opts: { sort: true, direction: 'ASC' } });
    serie.setDataPoint({ x: 5, y: 2});
    serie.setDataPoint({ x: 111, y: 3});
    serie.setDataPoint({ x: 2, y: 123});
    serie.setDataPoint({ x: 7, y: 12});
    let res = serie.get();
    expect(res.data[0].value).to.equal(123);
	});
});
