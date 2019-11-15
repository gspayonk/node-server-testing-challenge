const request = require('supertest');
const db = require('./data/dbConfig');

const server = require('./server');

beforeEach(async () => {
    await db('puppies').truncate();
});

describe('server', () => {
    describe('GET /', () => {
        it('needs to return 200', async () => {
            const res = await request(server).get('/');
            return expect(res.status).toBe(200);
        });

    it('needs to return JSON formatted response', async () => {
        const res = await request(server).get('/');
        return expect(res.type).toMatch(/json/i);
    });

    it('needs to return an array of puppies with length of 0', async () => {
        const res = await request(server).get('/');
        return expect(res.body).toHaveLength(0);
    });
});

describe('POST /', () => {
    it('needs to return a 201', async () => {
        const newPuppy = { name: 'Clifford' };
        const res = await request(server)
            .post('/')
            .send(newPuppy)
            .set('Accept', 'application/json');

        return expect(res.status).toBe(201);
    });

    it('needs to return a puppy object with name property', async () => {
        const newPuppy = { name: 'Clifford' };
        const res = await request(server)
            .post('/')
            .send(newPuppy)
            .set('Accept', 'application/json');

        return expect(res.body.name).toBe('Clifford');
    });

    it('needs to return puppy object with id property', async () => {
        const newPuppy = { name: 'Clifford' };
        const res = await request(server)
            .post('/')
            .send(newPuppy)
            .set('Accept', 'application/json');

        return expect(res.body.id).toBe(1);
    });
});

describe('DELETE /:id', () => {
    it('needs to return 202', async () => {
        const newPuppy = { name: 'Clifford' };
        const res = await request(server)
            .post('/')
            .send(newPuppy)
            .set('Accept', 'application/json');

        const deleted = await request(server).delete(`/${res.body.id}`);

        return expect(deleted.status).toBe(202);
    });

    it('needs to return number of deleted puppies', async () => {
        const newPuppy = { name: 'Clifford' };
        const res = await request(server)
            .post('/')
            .send(newPuppy)
            .set('Accept', 'application/json');

        const deleted = await request(server).delete(`/${res.body.id}`);

        return expect(deleted.body).toBe(1);
    });
});
});