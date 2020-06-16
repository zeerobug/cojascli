'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var { serie1, serie2 } = require('./data');

chai.use(chaiAsPromised);

// Then either:
var expect = chai.expect;

const Cojascli = require('../lib');

describe('#chartjs plugin tests', function() {
  it('Should return a valid chartjs object', async function() {
    let chart = new Cojascli.Chart();
    let serie = new Cojascli.Serie(serie1);
    chart.setSerie(serie);
    let res = await chart.render('chartjs');
    expect(res[0]).to.have.property('datasets');
    expect(res[0]).to.have.property('labels');
    expect(res[0]['datasets'][0]).to.have.property('label');
    expect(res[0]['datasets'][0]).to.have.property('backgroundColor');
    expect(res[0]['datasets'][0]).to.have.property('data');
    expect(res[0]['datasets'][0]['data'].length).to.equal(2);
  });
});
