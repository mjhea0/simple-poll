const knex = require('./connection');

function getSinglePoll(pollID) {
  return knex('polls').where('id', pollID).first();
}

function addPoll(obj) {
  return knex('polls').insert(obj).returning('*');
}

function getVotes(pollID) {
  return knex('votes').where('poll_id', pollID).first();
}

function addVote(pollID) {
  return knex('votes').insert({ poll_id: parseInt(pollID) }).returning('*');
}

function updateVote(pollID, type) {
  return knex('votes')
  .increment(type, 1)
  .where('poll_id', parseInt(pollID))
  .returning('*');
}

module.exports = {
  getSinglePoll,
  addPoll,
  getVotes,
  addVote,
  updateVote
};
