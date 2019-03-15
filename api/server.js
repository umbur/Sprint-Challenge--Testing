const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working' });
})

const games = [
    {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
    },
    {
        title: 'Final Fantasy',
        genre: 'RPG',
        releaseYear: 1997
    },
    {
        title: 'Parasite Eve',
        genre: 'Horror',
        releaseYear: 1995
    }
]

server.get('/games', (req, res) => {
    res.status(200).json(games)
})

server.post('/games', (req, res) => {
    const {title, genre, releaseYear} = req.body
    // checking for required fields
    if (!title || !genre){
        return res.status(422).json({ error: 'You must include title and genre.' })
    } else {
        return res.status(201).json({ message: `${title} added to games database.` })
    }
})



module.exports = server;