const request = require('supertest');
const app = require('../app');

describe('GET /books - return list of books', () => {
  it('should return a JSON list of books', async () => {
    const response = await request(app).get('/books');

    expect(response.status).toBe(200);

    expect(response.body.length).toBeGreaterThan(0); 
  });
});

describe('GET /books - book has the properties id, title, author', () => {
  it('books should have the properties id, title, author', async () => {
    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
 
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('author');
  });
});