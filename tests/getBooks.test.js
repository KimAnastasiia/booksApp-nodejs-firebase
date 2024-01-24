const request = require('supertest');
const app = require('../app');
let bookTestId = ""
describe('GET /books - return list of books', () => {
  it('should return a JSON list of books', async () => {
    const response = await request(app)
    .get('/books')
    .set('token', '1')
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('GET /books - book has the properties id, title, author, userId', () => {
  it('books should have the properties id, title, author, userId', async () => {
    const response = await request(app)
    .get('/books')
    .set('token', '1')

    expect(response.status).toBe(200);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('author');
    expect(response.body[0]).toHaveProperty('userId');
  });
});

describe('POST /books - create a book', () => {
  it('should return book id', async () => {
    const bookData = {
      author: 'testAuthor',
      title: 'testTitle',
    };
    const response = await request(app)
      .post('/books')
      .send(bookData)
      .set('Accept', 'application/json')
      .set('token', '1')

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    bookTestId = response.body.id
  });
});

describe('GET /books/:id - return a book', () => {
  it('should return a JSON book', async () => {

    const response = await request(app)
    .get('/books/' + bookTestId)
    .set('token', '1')

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "author": "testAuthor", "title": "testTitle", "userId": "3dV63GEHstfXeTMJCmVBtpD0j7s1" });
  });
});

describe('PUT /books/:id - return updated book', () => {
  it('should return a JSON book', async () => {

    const bookData = {
      author: 'testAuthorNew',
      title: 'testTitleNew'
    };
    const response = await request(app)
      .put('/books/'+bookTestId)
      .send(bookData)
      .set('Accept', 'application/json')
      .set('token', '1')

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "author": "testAuthorNew", "title": "testTitleNew","userId": "3dV63GEHstfXeTMJCmVBtpD0j7s1", });
  });
});

describe('GET /books/:id - return a book', () => {
  it('should return a JSON book', async () => {

    const response = await request(app)
    .get('/books/' + bookTestId)
    .set('token', '1')

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "author": "testAuthorNew", "title": "testTitleNew", "userId":'3dV63GEHstfXeTMJCmVBtpD0j7s1' });
  });
});

describe('DELETE /books/:id - return message', () => {
  it('should return a message indicating that the book was successfully deleted', async () => {
    const response = await request(app)
    .delete('/books/'+bookTestId)
    .set('token', '1')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({"message":"Book deleted successfully"});
  });
});

describe('DELETE /books/:id - return error message', () => {
  it('should return a error message indicating that the book not exists', async () => {
    const response = await request(app)
    .delete('/books/11111111')
    .set('token', '1')
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      "error": [
          {
              "msg": "not possible get book by id",
              "code": 500
          }
      ]
  });
  });
});

