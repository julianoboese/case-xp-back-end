import { Request, Response } from 'express';
import OrderService from '../../../src/services/order.service';
import OrderController from '../../../src/controllers/order.controller';

describe('The OrderController buyAsset function', () => {
  const requestMock = { body: { quantity: 100 } };
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  };

  const positionMock = {
    userId: 1,
    assetId: 1,
    quantity: 200,
  };

  beforeEach(() => {
    jest.spyOn(OrderService, 'buyAsset').mockResolvedValue(positionMock);
    responseMock.status.mockReturnValue(responseMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 201', async () => {
    await OrderController.buyAsset(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(201);
  });

  it('should respond with user asset position', async () => {
    await OrderController.buyAsset(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(positionMock);
  });
});

describe('The OrderController sellAsset function', () => {
  const requestMock = { body: { quantity: 100 } };
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  };

  const positionMock = {
    userId: 1,
    assetId: 1,
    quantity: 0,
  };

  beforeEach(() => {
    jest.spyOn(OrderService, 'sellAsset').mockResolvedValue(positionMock);
    responseMock.status.mockReturnValue(responseMock);
  });

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 201', async () => {
    await OrderController.sellAsset(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(201);
  });

  it('should respond with user asset position', async () => {
    await OrderController.sellAsset(
      requestMock as Request,
      responseMock as unknown as Response,
    );

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(positionMock);
  });
});
