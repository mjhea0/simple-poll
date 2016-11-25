process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');
const queries = require('../../src/server/db/queries');

describe('routes : index', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });
  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /', () => {
    it('should render the index', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('text/html');
        res.text.should.contain('<h2 class="text-center">Create a new poll</h2>');
        done();
      });
    });
  });

  describe('GET /polls/:id', () => {
    it('should render the poll page', () => {
      return queries.addVote(1)
      .then(() => {
        chai.request(server)
        .get('/polls/1')
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          res.text.should.contain('Do you like Python?');
        });
      });
    });
    it('should throw an error if there are no votes', (done) => {
      chai.request(server)
      .get('/polls/1')
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
      .get('/polls/9999')
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
      .get('/polls/jhdsdsjh')
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

  describe('GET /404', () => {
    it('should throw an error', (done) => {
      chai.request(server)
      .get('/404')
      .end((err, res) => {
        should.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.message.should.eql('Not Found');
        done();
      });
    });
  });

});
