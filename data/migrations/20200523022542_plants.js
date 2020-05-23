exports.up = function (knex) {
    return knex.schema
        .createTable('users', (users) => {
            users.increments();

            users.string('username', 255).notNullable().unique();

            users.string('email', 255).notNullable().unique();

            users.string('password', 255).notNullable();
        })
        .createTable('plants', (plants) => {
            plants.increments();
            plants
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            plants.string('nickname').notNullable().unique();
            plants.string('image');
        })
        .createTable('species', (species) => {
            species.increments();
            species
                .integer('plant_id')
                .notNullable()
                .references('id')
                .inTable('plants')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            species.string('species').notNullable().unique();
            species.integer('h2o_frequency').notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('species')
        .dropTableIfExists('plants')
        .dropTableIfExists('users');
};
