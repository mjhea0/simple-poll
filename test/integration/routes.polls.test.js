process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

describe('routes : polls', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); });
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('POST api/v1/polls', () => {
    it('should add a poll', (done) => {
      const poll = { question: 'Do you like Python?' };
      chai.request(server)
      .post('/api/v1/polls')
      .send(poll)
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.eql('success');
        res.body.data.should.eql(1);
        res.body.message.should.eql('Poll created');
        res.body.should.be.instanceof(Object);
        done();
      });
    });
    it('should not add a poll if the question is missing', (done) => {
      const poll = {};
      chai.request(server)
      .post('/api/v1/polls')
      .send(poll)
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('A question is required');
        done();
      });
    });
  });

});
