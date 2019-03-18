'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
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
			serie.setDataPoint({ x: 1, label: index });
		}
		let res = serie.get();
		expect(res.data.length).to.equal(occurences);
	});
});
