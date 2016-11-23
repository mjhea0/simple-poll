exports.up = (knex, Promise) => {
  return knex.schema.createTable('polls', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.json('choices').notNullable();
    table.string('url').notNullable();
    table.boolean('valid').notNullable().defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('polls');
};

/*

choices: [{
  choice: String,
  votes: Integer
}]

*/
