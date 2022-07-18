import AssetService from '../../../src/services/asset.service';
import AssetController from '../../../src/controllers/asset.controller';
import { Request, Response } from 'express';

describe('The AssetController getAllAssets function', () => {
  
  const requestMock = {};
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const assetsMock = [{
    id: 1,
    ticker: 'PRIO3',
    name: 'Petrorio',
  },
  {
    id: 1,
    ticker: 'AMBP3',
    name: 'Ambipar',
  },
  {
    id: 3,
    ticker: 'CASH3',
    name: 'Méliuz',
  },
  {
    id: 4,
    ticker: 'RENT3',
    name: 'Localiza',
  }]
  
  beforeEach(() => {
    jest.spyOn(AssetService, 'getAllAssets').mockResolvedValue(assetsMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await AssetController.getAllAssets(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with all assets in broker', async () => {
    await AssetController.getAllAssets(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(assetsMock));
  });
});

describe('The AssetController getAssets function', () => {
  
  const requestMock = {};
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const assetsMock = [
      {
      userId: 1,
      assetId: 1,
      ticker: 'PRIO3',
      quantity: 100,
      price: 20.57,
      change: -1.5,
    },
    {
      userId: 1,
      assetId: 2,
      ticker: 'AMBP3',
      quantity: 200,
      price: 5.6,
      change: 0.23,
    },
  ]
  
  beforeEach(() => {
    jest.spyOn(AssetService, 'getAssets').mockResolvedValue(assetsMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await AssetController.getAssets(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with user assets', async () => {
    await AssetController.getAssets(requestMock as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(assetsMock));
  });
});

describe('The AssetController getAsset function', () => {
  
  const requestMock = { params: { id: 1 } };
  const responseMock = {
    locals: { user: { id: 1 } },
    status: jest.fn(),
    json: jest.fn(),
  }

  const assetMock = {
      userId: 1,
      assetId: 1,
      ticker: 'PRIO3',
      quantity: 100,
      price: 20.57,
      change: -1.5,
    }
  
  beforeEach(() => {
    jest.spyOn(AssetService, 'getAsset').mockResolvedValue(assetMock);
    responseMock.status.mockReturnValue(responseMock);
  })

  afterEach(() => jest.clearAllMocks());

  it('should respond with status code 200', async () => {
    await AssetController.getAsset(requestMock as unknown as Request, responseMock as unknown as Response)

    expect(responseMock.status).toHaveBeenCalled();
    expect(responseMock.status).toHaveBeenCalledTimes(1);
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });

  it('should respond with user asset', async () => {
    await AssetController.getAsset(requestMock as unknown as Request, responseMock as unknown as Response)

    expect(responseMock.json).toHaveBeenCalled();
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(responseMock.json).toHaveBeenCalledWith(expect.objectContaining(assetMock));
  });
});
