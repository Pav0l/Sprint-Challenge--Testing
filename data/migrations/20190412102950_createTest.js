exports.up = function(knex, Promise) {
  return knex.schema.createTable('test', table => {
    table.increments();

    table
      .string('title')
      .unique()
      .notNullable();

    table.string('genre').notNullable();

    table.integer('releaseYear');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('test');
};
