exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('polls').del()
  ]);
};
