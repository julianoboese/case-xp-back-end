import AuthMiddleware from '../../../src/middlewares/auth.middleware';
import { NextFunction, Request, Response } from 'express';
import Jwt from '../../../src/utils/jwt';

describe('The AuthMiddleware "auth" function', () => {
  
  const requestMock = { headers: { authorization: 'q1w2e3r4t5' } };
  const responseMock = { locals: { user: {} } };
  const nextMock = jest.fn();
  
  beforeEach(() => {
    jest.spyOn(Jwt, 'authenticateToken').mockResolvedValue({ id: 1, email: 'felipe.silva@email.com' });
  })

  afterEach(() => jest.clearAllMocks());

  it('should place user data in response object', async () => {
    await AuthMiddleware.authenticate(requestMock as Request, responseMock as unknown as Response, nextMock as NextFunction)

    expect(responseMock.locals.user).toEqual({ id: 1, email: 'felipe.silva@email.com' })
  });

  it('should call "next" function', async () => {
    await AuthMiddleware.authenticate(requestMock as Request, responseMock as unknown as Response, nextMock as NextFunction)

    expect(nextMock).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith();
  });
});
