import fetch from 'cross-fetch';

export default class AssetInfo {
  public static fetchAssetPrice = async (ticker: string) => {
    const { B3_API_KEY } = process.env;
    const b3ApiUrl = `https://api.hgbrasil.com/finance/stock_price?key=${B3_API_KEY}&symbol=${ticker}`;
    const assetData = await (await fetch(b3ApiUrl)).json();

    const { price, change_percent: change } = assetData.results[ticker];
    return { price, change };
  };

  public static mockFetchAssetPrice = async () => ({ price: 25.6, change: -1.2 });
}
