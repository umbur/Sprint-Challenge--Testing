const server = require('./api/server.js');

const request = require('supertest');

describe('tests for GET and POST server endpoints', () => {

    describe('GET /games endpoint tests', () => {
        it('should return status code 200(OK)', async () => {
            const response = await request(server).get('/games')

            expect(response.status).toBe(200)
        })
        it('should return JSON', async () => {
            const response = await request(server).get('/games')

            expect(response.type).toBe('application/json')
        })
        it('should return correct array of game objects', async () => {
            const response = await request(server).get('/games')

            const expected = [
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

            expect(response.body).toEqual(expected);
            expect(Array.isArray(response.body)).toBe(true)
        })
    })

    describe('POST /games endpoint tests', () => {
        it('should return a 422 code if the object being sent is incomplete', async () => {
            const newGame = {
                title: 'Sonic',
                releaseYear: 1991
            }
            const response = await request(server).post('/games').send(newGame)

            expect(response.status).toBe(422)
        })
        it('should return status 201 if the object has required fields', async () => {
            const newGame = {
                title: 'Sonic',
                genre: 'Platform',
                releaseYear: 1991
            }
            const response = await request(server).post('/games').send(newGame)

            expect(response.status).toBe(201)
        })
        it('should  return JSON', async () => {
            const newGame = {
                title: 'Sonic',
                genre: 'Platform',
                releaseYear: 1991
            }

            const response = await request(server).post('/games').send(newGame)

            expect(response.type).toBe('application/json')
        })
        it('should return a message with the game title indicating the post was successful', async () => {
            const newGame = {
                title: 'Sonic',
                genre: 'Platform',
                releaseYear: 1991
            }

            const response = await request(server).post('/games').send(newGame)

            expect(response.body).toEqual({ message: 'Sonic added to games database.' })
        })
    })
}) 