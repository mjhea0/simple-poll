const knex = require('./connection');

function addPoll(obj) {
  return knex('polls').insert(obj).returning('*');
}

function addVote(pollID) {
  return knex('votes').insert({ poll_id: parseInt(pollID) }).returning('*');
}

module.exports = {
  addPoll,
  addVote
};
