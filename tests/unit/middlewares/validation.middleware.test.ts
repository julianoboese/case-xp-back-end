import { NextFunction, Request, Response } from 'express';
import ValidationMiddleware from '../../../src/middlewares/validation.middleware';
import loginValidator from '../../../src/validators/login.validator';

describe('The ValidationMiddleware "validate" function', () => {
  const sampleValidation = new ValidationMiddleware(loginValidator);

  const responseMock = {};
  const nextMock = jest.fn();

  it('should throw an error if request is invalid', async () => {
    const requestMock = { body: { email: 'fulano.silva@email.com' } };

    expect(() => {
      sampleValidation.validate(
        requestMock as Request,
        responseMock as unknown as Response,
        nextMock as NextFunction,
      );
    }).toThrow('"password" is required');
  });

  it('should call "next" function if request is valid', async () => {
    const requestMock = {
      body: { email: 'fulano.silva@email.com', password: '12345678' },
    };

    sampleValidation.validate(
      requestMock as Request,
      responseMock as unknown as Response,
      nextMock as NextFunction,
    );

    expect(nextMock).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith();
  });
});
