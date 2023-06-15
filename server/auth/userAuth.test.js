const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const userAuth = require('../middleware/userAuth');

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

describe('userAuth middleware', () => {
  beforeAll(() => {
    // Mock the necessary functions or modules
    Users.findOne = jest.fn();
    bcrypt.compareSync = jest.fn();
  });

  afterAll(() => {
    // Restore the original functions
    jest.restoreAllMocks();
  });

  it('should get all users and return them in the response', async () => {
    const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];
    Users.find = jest.fn().mockResolvedValue(mockUsers);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await userAuth.getAllUsers(req, res, next);

    expect(Users.find).toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ users: mockUsers });
    expect(next).not.toBeCalled();
  });

  it('should return 404 if no users are found', async () => {
    Users.find = jest.fn().mockResolvedValue(null);

    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    await userAuth.getAllUsers(req, res, next);

    expect(Users.find).toBeCalled();
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ message: 'No user found' });
    expect(next).not.toBeCalled();
  });

});
