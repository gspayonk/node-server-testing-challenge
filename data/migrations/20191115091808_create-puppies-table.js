exports.up = function(knex) {
    return knex.schema.createTable('puppies', tbl => {
        tbl.increments();
        tbl
            .string('name', 255)
            .notNullable()
            .unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('puppies');
};