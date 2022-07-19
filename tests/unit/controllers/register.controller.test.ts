import RegisterService from '../../../src/services/register.service';
import RegisterController from '../../../src/controllers/register.controller';
import { Request, Response } from 'express';

describe('The registerController register function', () => {

  const registerData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@email.com',
    password: '12345678',
  };
  
  const requestMock = { body: registerData};
  const responseMock = {
    status: jest.fn(),
    json: jest.fn(),
  }
  
  beforeEach(() => {
    jest.spyOn(RegisterService, 'register').mockResolvedValue({ token: 'q1w2e3r4t5' });
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 201', async () => {
    await RegisterController.register(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(201);
  });

  it('should respond with a token', async () => {
    await RegisterController.register(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({ token: 'q1w2e3r4t5' });
  });
});
