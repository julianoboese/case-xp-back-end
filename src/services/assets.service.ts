import fetch from 'cross-fetch';
import IUserAsset from '../interfaces/asset.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';

export default class AssetsService {
  private static fetchAssetPrice = async (ticker: string) => {
    const { B3_API_KEY } = process.env;
    const b3ApiUrl = `https://api.hgbrasil.com/finance/stock_price?key=${B3_API_KEY}&symbol=${ticker}`;
    const assetData = await (await fetch(b3ApiUrl)).json();

    return assetData.results[ticker].price;
  };

  public static getAssets = async (userId: number): Promise<IUserAsset[]> => {
    const userAssets = await prisma.userAsset.findMany({
      where: { userId },
      select: { userId: true, assetId: true, quantity: true, asset: { select: { ticker: true } } },
    });

    const userAssetsWithPrice = await Promise.all(userAssets.map(async (userAsset) => {
      const { assetId, quantity, asset } = userAsset;
      const { ticker } = asset;
      const price = await AssetsService.fetchAssetPrice(ticker);

      return { userId, assetId, quantity, price };
    }));

    return userAssetsWithPrice;
  };

  public static getAsset = async (userId: number, assetId: number): Promise<IUserAsset | null> => {
    const userAsset = await prisma.userAsset.findUnique({
      where: { userId_assetId: { userId, assetId } },
      select: { userId: true, assetId: true, quantity: true, asset: { select: { ticker: true } } },
    });

    if (!userAsset) throw new HttpError(404, 'Ativo não consta na carteira.');

    const { quantity, asset } = userAsset;
    const { ticker } = asset;

    const price = await AssetsService.fetchAssetPrice(ticker);

    return { userId, assetId, quantity, price };
  };
}
