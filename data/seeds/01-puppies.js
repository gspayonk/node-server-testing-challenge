
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('puppies').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('puppies').insert([
        {id: 1, name: 'Marley'},
        {id: 2, name: 'Scooby Doo'},
        {id: 3, name: 'Yeller'}
      ]);
    });
};
