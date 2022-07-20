import { Request, Response } from 'express';
import LoginService from '../../../src/services/login.service';
import LoginController from '../../../src/controllers/login.controller';

describe('The LoginController login function', () => {
  const requestMock = {
    body: { email: 'felipe.silva@email.com', password: '12345678' },
  };
  const responseMock = {
    status: jest.fn(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest
      .spyOn(LoginService, 'login')
      .mockResolvedValue({ token: 'q1w2e3r4t5' });
    responseMock.status.mockReturnValue(responseMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await LoginController.login(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with a token', async () => {
    await LoginController.login(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({ token: 'q1w2e3r4t5' });
  });
});
