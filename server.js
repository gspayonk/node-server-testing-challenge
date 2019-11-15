const express = require('express');
const db = require('./data/puppies-model');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const puppies = await db.get();

        res.status(200).json(characters);
    } catch {
        res.status(500).json({ error: 'No puppies found!' });
    }
});

server.post('/', async (req, res) => {
    try {
        const puppy = await db.add(req.body);
        res.status(201).json(puppy);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Not able to add puppy. Sad.' });
    }
});

server.delete('/:id', async (req, res) => {
    try {
        const deleted = await db.remove(req.params.id);
        res.status(202).json(deleted);
    } catch {
        res.status(500).json({ error: 'Not able to delete puppy!' });
    }
});

module.exports = server;