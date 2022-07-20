import { Asset } from '@prisma/client';
import prismaMock from '../../prisma.mock';
import AssetService from '../../../src/services/asset.service';
import AssetInfo from '../../../src/utils/asset.info';

describe('The AssetService getAllAssets function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return the user assets', async () => {
    const assetsMock = [
      {
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
      },
    ];

    prismaMock.asset.findMany.mockResolvedValue(assetsMock as Asset[]);

    const assets = await AssetService.getAllAssets();

    expect(assets).toEqual(assetsMock);
  });
});

describe('The AssetService getAssets function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return the user assets', async () => {
    const assetsMock = [
      {
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
      },
    ];

    prismaMock.userAsset.findMany.mockResolvedValue(assetsMock);

    jest
      .spyOn(AssetInfo, 'fetchAssetInfo')
      .mockResolvedValueOnce({ price: 20.57, change: -1.5 })
      .mockResolvedValue({ price: 5.6, change: 0.23 });

    const expectedReturn = [
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
    ];

    const assets = await AssetService.getAssets(1);

    expect(assets).toEqual(expectedReturn);
  });
});

describe('The AssetService getAsset function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw an error if the asset is unavailable at the broker', async () => {
    prismaMock.userAsset.findUnique.mockResolvedValue(null);
    prismaMock.asset.findUnique.mockResolvedValue(null);

    await expect(AssetService.getAsset(1, 3)).rejects.toThrow(
      'Ativo indisponível na corretora.',
    );
  });

  it("should return the asset if the user doesn't own it", async () => {
    const assetMock = {
      id: 3,
      ticker: 'CASH3',
    };

    prismaMock.userAsset.findUnique.mockResolvedValue(null);
    prismaMock.asset.findUnique.mockResolvedValue(assetMock as Asset);

    jest
      .spyOn(AssetInfo, 'fetchAssetInfo')
      .mockResolvedValue({ price: 20.57, change: -1.5 });

    const expectedReturn = {
      userId: 1,
      assetId: 3,
      ticker: 'CASH3',
      quantity: 0,
      price: 20.57,
      change: -1.5,
    };

    const assets = await AssetService.getAsset(1, 3);

    expect(assets).toEqual(expectedReturn);
  });

  it('should return the user asset if he owns it', async () => {
    const assetMock = {
      userId: 1,
      assetId: 1,
      quantity: 100,
      asset: {
        ticker: 'PRIO3',
      },
    };

    prismaMock.userAsset.findUnique.mockResolvedValue(assetMock);

    jest
      .spyOn(AssetInfo, 'fetchAssetInfo')
      .mockResolvedValue({ price: 20.57, change: -1.5 });

    const expectedReturn = {
      userId: 1,
      assetId: 1,
      ticker: 'PRIO3',
      quantity: 100,
      price: 20.57,
      change: -1.5,
    };

    const assets = await AssetService.getAsset(1, 1);

    expect(assets).toEqual(expectedReturn);
  });
});
