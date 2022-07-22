import { Request, Response } from 'express';
import { Type } from '@prisma/client';
import OperationService from '../../../src/services/operation.service';
import OperationController from '../../../src/controllers/operation.controller';

describe('The OperationController getOperations function', () => {
  const requestMock = {};
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  };

  const operationsMock = [
    {
      id: 1,
      userId: 1,
      assetId: null,
      quantity: null,
      type: Type.DEPOSIT,
      amount: 4000,
      createdAt: '22/07/2022 16:19:40',
      ticker: null,
    },
    {
      id: 1,
      userId: 1,
      assetId: 1,
      type: Type.BUY,
      quantity: 100,
      amount: -2300.52,
      createdAt: '22/07/2022 16:19:43',
      ticker: 'RRRP3',
    },
  ];

  beforeEach(() => {
    jest.spyOn(OperationService, 'getOperations').mockResolvedValue(operationsMock);
    responseMock.status.mockReturnValue(responseMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await OperationController.getOperations(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with the operations', async () => {
    await OperationController.getOperations(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(operationsMock);
  });
});
