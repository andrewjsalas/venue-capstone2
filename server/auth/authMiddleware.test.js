const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const authenticateUser = require('../middleware/authMiddleware');

// Mock the request and response objects
const mockRequest = () => {
  return {
    headers: {
      authorization: 'Bearer <valid_token>',
    },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authenticateUser middleware', () => {
  it('should authenticate a valid token and set the user in the request object', async () => {
    // Mock the token verification process
    const mockToken = '<valid_token>';
    const decodedToken = { userId: '<valid_user_id>' };
    jwt.verify = jest.fn().mockReturnValue(decodedToken);

    // Mock the user retrieval process
    const mockUser = { _id: '<valid_user_id>', name: 'John Doe' };
    Users.findById = jest.fn().mockResolvedValue(mockUser);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    // Call the middleware
    await authenticateUser(req, res, next);

    // Expectations
    expect(jwt.verify).toBeCalledWith(mockToken, process.env.SECRET_KEY);
    expect(Users.findById).toBeCalledWith(decodedToken.userId);
    expect(req.user).toEqual(mockUser);
    expect(next).toBeCalled();
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
  });

  it('should return 401 if authorization header is missing', async () => {
    const req = mockRequest();
    delete req.headers.authorization;
    const res = mockResponse();
    const next = jest.fn();

    await authenticateUser(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({ message: 'Authorization header missing' });
    expect(next).not.toBeCalled();
  });

  it('should return 401 if token is invalid', async () => {
    const mockToken = '<invalid_token>';
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await authenticateUser(req, res, next);

    expect(jwt.verify).toBeCalledWith(mockToken, process.env.SECRET_KEY);
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({ message: 'Invalid token' });
    expect(next).not.toBeCalled();
  });

  it('should return 401 if user is not found', async () => {
    const mockToken = '<valid_token>';
    const decodedToken = { userId: '<valid_user_id>' };
    jwt.verify = jest.fn().mockReturnValue(decodedToken);
    Users.findById = jest.fn().mockResolvedValue(null);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await authenticateUser(req, res, next);

    expect(jwt.verify).toBeCalledWith(mockToken, process.env.SECRET_KEY);
    expect(Users.findById).toBeCalledWith(decodedToken.userId);
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({ message: 'Invalid token or user not found' });
    expect(next).not.toBeCalled();
  });
});
