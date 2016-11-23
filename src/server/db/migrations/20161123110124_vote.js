exports.up = (knex, Promise) => {
  return knex.schema.createTable('votes', (table) => {
    table.increments();
    table.integer('yes').notNullable().defaultTo(0);
    table.integer('no').notNullable().defaultTo(0);
    table.integer('poll_id').references('id').inTable('polls').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('votes');
};
