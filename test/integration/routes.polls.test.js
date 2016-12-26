process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app').server;
const knex = require('../../src/server/db/connection');
const queries = require('../../src/server/db/queries');

describe('routes : polls', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET api/v1/polls/:id', () => {
    it('should return a poll', () => {
      return queries.addVote(1)
      .then(() => {
        chai.request(server)
        .get('/api/v1/polls/1')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.poll.should.eql(1);
          res.body.data.question.should.eql('Do you like Python?');
          res.body.data.votes.yay.should.eql(0);
          res.body.data.votes.nay.should.eql(0);
          res.body.message.should.eql('Poll found');
          res.body.should.be.instanceof(Object);
        });
      });
    });
    it('should throw an error if there are no votes', (done) => {
      chai.request(server)
      .get('/api/v1/polls/1')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        done();
      });
    });
    it('should throw an error if the poll does not exit', (done) => {
      chai.request(server)
      .get('/api/v1/polls/9999')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        done();
      });
    });
    it('should throw an error if the :id is not an integer', (done) => {
      chai.request(server)
      .get('/api/v1/polls/jhdsdsjh')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('An ID is required');
        done();
      });
    });
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
        res.body.data.should.be.eql(2);
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
    it('should not add a poll if the question is not a string', (done) => {
      const poll = { question: true };
      chai.request(server)
      .post('/api/v1/polls')
      .send(poll)
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('Question must be a string');
        done();
      });
    });
  });

  describe('PUT api/v1/polls/:id/vote', () => {
    it('should update a poll', () => {
      return queries.addVote(1)
      .then(() => {
        chai.request(server)
        .put('/api/v1/polls/1/vote')
        .send({ type: 'yay' })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.status.should.eql('success');
          res.body.data.votes.yay.should.eql(1);
          res.body.data.votes.nay.should.eql(0);
          res.body.message.should.eql('Poll updated');
          res.body.should.be.instanceof(Object);
        });
      });
    });
    it('should not update a poll if the type is missing', (done) => {
      const type = {};
      chai.request(server)
      .put('/api/v1/polls/1/vote')
      .send({})
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        done();
      });
    });
    it('should not update a poll if the type is incorrect', (done) => {
      const type = {};
      chai.request(server)
      .put('/api/v1/polls/1/vote')
      .send({ type: false })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        done();
      });
    });
    it('should throw an error if the poll does not exit', (done) => {
      chai.request(server)
      .put('/api/v1/polls/9999/vote')
      .send({ type: 'yay' })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(500);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        done();
      });
    });
    it('should throw an error if the :id is not an integer', (done) => {
      chai.request(server)
      .put('/api/v1/polls/jhdsdsjh/vote')
      .send({ type: 'yay' })
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.body.message.should.eql('An ID is required');
        done();
      });
    });
  });

});
