const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

afterEach(async () => {
    await db('users').truncate();
    await db('plants').truncate();
});

describe('server', () => {
    describe('GET server /',  () =>  {
        it('should return 200 OK',  () =>  {
            return request(server)
                .get('/')
                .then((res) => {
                    expect(res.status).toBe(400);
                });
        });
        it('should return JSON', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });
    });
});

