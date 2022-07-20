import { NextFunction, Request, Response } from 'express';
import ErrorMiddleware from '../../../src/middlewares/error.middleware';
import HttpError from '../../../src/utils/http.error';

describe('The AuthMiddleware "auth" function', () => {
  const requestMock = {};
  const responseMock = {
    status: jest.fn(),
    json: jest.fn(),
  };
  const nextMock = jest.fn();

  beforeEach(() => {
    responseMock.status.mockReturnValue(responseMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 401', async () => {
    const errorMock = { status: 401, message: 'Acesso não autorizado.' };

    ErrorMiddleware.handleError(
      errorMock as HttpError,
      requestMock as Request,
      responseMock as unknown as Response,
      nextMock as NextFunction,
    );

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(401);
  });

  it('should respond with a custom error message', async () => {
    const errorMock = { status: 401, message: 'Acesso não autorizado.' };

    ErrorMiddleware.handleError(
      errorMock as HttpError,
      requestMock as Request,
      responseMock as unknown as Response,
      nextMock as NextFunction,
    );

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Acesso não autorizado.',
    });
  });

  it('should respond with status code 500', async () => {
    const errorMock = { message: 'Internal Server Error' };

    ErrorMiddleware.handleError(
      errorMock as HttpError,
      requestMock as Request,
      responseMock as unknown as Response,
      nextMock as NextFunction,
    );

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(500);
  });

  it('should respond with a standard error message', async () => {
    const errorMock = { message: 'Internal Server Error' };

    ErrorMiddleware.handleError(
      errorMock as HttpError,
      requestMock as Request,
      responseMock as unknown as Response,
      nextMock as NextFunction,
    );

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
