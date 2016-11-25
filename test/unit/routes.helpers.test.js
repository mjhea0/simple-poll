process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const helpers = require('../../src/server/routes/_helpers');

describe('routes : helpers', () => {

  describe('createCookie()', () => {
    it('should create a new cookie', (done) => {
      const cookie = helpers.createCookie({ cookies: {} }, 1);
      cookie.should.eql(1);
      done();
    });
    it('should update an existing cookie', (done) => {
      const cookie = helpers.createCookie({ cookies: {straw: 1} }, 1);
      cookie.should.eql('1,1');
      done();
    });
  });

});
