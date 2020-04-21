const db = require('./dbConfig');
const dbModel = require('./puppies-model');

beforeEach(async () => {
  await db('puppies').truncate();
});

describe('functions', () => {
  describe('get()', () => {
    it('needs to get an array of puppies', async () => {
      await db('puppies').insert({ name: 'Clifford' });
      await db('puppies').insert({ name: 'Beans' });

      const puppies = await dbModel.get();
      return expect(puppies).toHaveLength(2);
    });
  });

  describe('add()', () => {
    it('needs to add puppy', async () => {
      await dbModel.add({ name: 'Clifford' });

      const puppies = await db('puppies');
      return expect(puppies).toHaveLength(1);
    });

    it('needs to return the added puppy including name and id', async () => {
      const puppy = await dbModel.add({ name: 'Clifford' });

      expect(puppy.name).toBe('Clifford');
      expect(puppy.id).toBe(1);
    });
  });

  describe('delete()', () => {
    it('deletes the puppy with that id', async () => {
      const puppy = await dbModel.add({ name: 'Clifford' });
      await dbModel.remove(puppy.id);

      const puppies = await db('puppies');
      return expect(puppies).toHaveLength(0);
    });

    it('needs to tell you amount of deleted puppies', async () => {
      const puppy = await dbModel.add({ name: 'Clifford' });
      const deleted = await dbModel.remove(puppy.id);

      return expect(deleted).toBe(1);
    });
  });
});