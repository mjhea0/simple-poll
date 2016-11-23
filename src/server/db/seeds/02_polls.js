exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('polls').insert({
      question: 'Do you like Python?'
    })
  ]);
};
