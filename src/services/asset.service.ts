import { Asset } from '@prisma/client';
import IUserAsset from '../interfaces/asset.interface';
import prisma from '../prisma';
import AssetInfo from '../utils/asset.info';
import HttpError from '../utils/http.error';

export default class AssetService {
  public static getAllAssets = async (): Promise<Omit<Asset, 'quantity'>[]> => {
    const assets = await prisma.asset.findMany({
      select: { id: true, ticker: true, name: true },
    });

    return assets;
  };

  public static getAssets = async (userId: number): Promise<IUserAsset[]> => {
    const userAssets = await prisma.userAsset.findMany({
      where: { userId },
      select: {
        userId: true,
        assetId: true,
        quantity: true,
        asset: { select: { ticker: true } },
      },
    });

    const userAssetsWithInfo = await Promise.all(
      userAssets.map(async (userAsset) => {
        const { assetId, quantity, asset } = userAsset;
        const { ticker } = asset;
        const { price, change } = await AssetInfo.mockFetchAssetPrice();

        return { userId, assetId, ticker, quantity, price, change };
      }),
    );

    return userAssetsWithInfo;
  };

  public static getAsset = async (userId: number, assetId: number): Promise<IUserAsset | null> => {
    const userAsset = await prisma.userAsset.findUnique({
      where: { userId_assetId: { userId, assetId } },
      select: {
        userId: true,
        assetId: true,
        quantity: true,
        asset: { select: { ticker: true } },
      },
    });

    // Caso a pessoa usuária não possua o ativo, ele é buscado na base da corretora
    if (!userAsset) {
      const asset = await prisma.asset.findUnique({
        where: { id: assetId },
        select: { id: true, ticker: true },
      });

      if (!asset) throw new HttpError(404, 'Ativo indisponível na corretora.');

      const { ticker } = asset;
      const { price, change } = await AssetInfo.mockFetchAssetPrice();

      return { userId, assetId, ticker, quantity: 0, price, change };
    }

    const { quantity, asset } = userAsset;
    const { ticker } = asset;

    const { price, change } = await AssetInfo.mockFetchAssetPrice();

    return { userId, assetId, ticker, quantity, price, change };
  };
}
