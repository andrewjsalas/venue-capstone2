const mongoose = require('mongoose');
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const { Types: { ObjectId } } = require('mongoose');
const postAuth = require('../middleware/postAuth');

// Mock the request and response objects
const mockRequest = (params = {}, body = {}) => {
  return {
    params,
    body,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('postAuth middleware', () => {
  beforeAll(() => {
    // Mock the database connection and models
    mongoose.connect = jest.fn();
  });

  afterAll(() => {
    // Restore the original functions
    jest.restoreAllMocks();
  });

  it('should get all posts and return them in the response', async () => {
    const mockPosts = [{ title: 'Post 1' }, { title: 'Post 2' }];
    Posts.find = jest.fn().mockResolvedValue(mockPosts);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await postAuth.getAllPosts(req, res, next);

    expect(Posts.find).toBeCalledWith({});
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ posts: mockPosts });
    expect(next).not.toBeCalled();
  });

  it('should return 404 if no posts are found', async () => {
    Posts.find = jest.fn().mockResolvedValue(null);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await postAuth.getAllPosts(req, res, next);

    expect(Posts.find).toBeCalledWith({});
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ message: 'No posts found' });
    expect(next).not.toBeCalled();
  });


});
