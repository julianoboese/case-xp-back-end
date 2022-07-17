import UserService from '../../src/services/user.service';
import UserController from '../../src/controllers/user.controller';
import { Request, Response } from 'express';

describe('The UserController getUser function', () => {
  
  const requestMock = {};
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const userMock = {
    firstName: 'Joe',
    lastName: 'Doe'
  }
  
  beforeEach(() => {
    jest.spyOn(UserService, 'getUser').mockResolvedValue(userMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await UserController.getUser(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with user name', async () => {
    await UserController.getUser(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(userMock));
  });
});
