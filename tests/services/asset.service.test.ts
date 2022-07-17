import { prismaMock } from ".././prisma.mock";
import AssetService from '../../src/services/asset.service';

describe('The AssetService getAssets function', () => {

  afterEach(() => jest.clearAllMocks());

  it('should return the user assets', async () => {
    const assetsMock = [{
      userId: 1,
      assetId: 1,
      quantity: 100,
      asset: {
        ticker: 'PRIO3',
      },
    },
    {
      userId: 1,
      assetId: 2,
      quantity: 200,
      asset: {
        ticker: 'AMBP3',
      },
    }]

    prismaMock.userAsset.findMany.mockResolvedValue(assetsMock);

    jest.spyOn(AssetService, <any>'mockFetchAssetPrice')
      .mockResolvedValueOnce({price: 20.57, change: -1.5})
      .mockResolvedValue({price: 5.6, change: 0.23})

    const expectedReturn = [{
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
    }]

    const assets = await AssetService.getAssets(1);
  
    expect(assets).toEqual(expectedReturn);
  });
});

describe('The AssetService getAsset function', () => {

  afterEach(() => jest.clearAllMocks());

  it('should throw an error if the user doesn\'t own it', async () => {
    prismaMock.userAsset.findUnique.mockResolvedValue(null);

    await expect(AssetService.getAsset(1, 3))
        .rejects.toThrow('Ativo não consta na carteira.');
  });

  it('should return the asset if the user owns it', async () => {
    const assetMock = {
      userId: 1,
      assetId: 1,
      quantity: 100,
      asset: {
        ticker: 'PRIO3',
      }
    }

    prismaMock.userAsset.findUnique.mockResolvedValue(assetMock);

    jest.spyOn(AssetService, <any>'mockFetchAssetPrice')
      .mockResolvedValue({price: 20.57, change: -1.5})

    const expectedReturn = {
      userId: 1,
      assetId: 1,
      ticker: 'PRIO3',
      quantity: 100,
      price: 20.57,
      change: -1.5,
    }

    const assets = await AssetService.getAsset(1, 1);
  
    expect(assets).toEqual(expectedReturn);
  });
});
