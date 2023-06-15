const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

// Test the server routes and endpoints
describe('Server Routes', () => {
  // Connect to MongoDB before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  // Disconnect from the MongoDB database after running tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Test the '/api/user' route
  describe('User Routes', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/user')
        .send({ username: 'testuser', password: 'testpass' });

      expect(response.statusCode).toBe(201);
      expect(response.body.username).toBe('testuser');
      expect(response.body.password).toBeUndefined();
    });

    it('should get user details', async () => {
      const response = await request(app).get('/api/user/testuser');

      expect(response.statusCode).toBe(200);
      expect(response.body.username).toBe('testuser');
      expect(response.body.password).toBeUndefined();
    });

  });

  // Test the '/api/post' route
  describe('Post Routes', () => {
    it('should create a new post', async () => {
      const response = await request(app)
        .post('/api/post')
        .send({ title: 'Test Post', body: 'This is a test post' });

      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe('Test Post');
      expect(response.body.body).toBe('This is a test post');
    });

    it('should get post details', async () => {
      const response = await request(app).get('/api/post/1');

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe('Test Post');
      expect(response.body.body).toBe('This is a test post');
    });
  });
});
