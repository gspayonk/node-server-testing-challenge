const db = require('./dbConfig');

module.exports = { 
  get, 
  findById, 
  add, 
  remove 
};

function get() {
  return db('puppies');
}

function findById(id) {
  return null;
}

async function add(puppy) {
  const [id] = await db('puppies')
  .insert(puppy);

  return await db('puppies')
    .where({ id })
    .first();
}

function remove(id) {
  return db('puppies')
    .where({ id })
    .del();
}