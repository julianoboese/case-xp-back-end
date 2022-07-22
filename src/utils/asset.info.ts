import fetch from 'cross-fetch';

export default class AssetInfo {
  public static fetchAssetInfo = async (ticker: string) => {
    const { B3_API_KEY } = process.env;

    const b3ApiUrl = `https://api.hgbrasil.com/finance/stock_price?key=${B3_API_KEY}&symbol=${ticker}`;
    const assetData = await (await fetch(b3ApiUrl)).json();

    // Em ambientes que não sejam de produção, o preço e a variação dos ativos são "mockados"
    if (assetData.results.error) {
      const randomPrice = +(Math.random() * 60).toFixed(2);
      const randomChange = +(Math.random() * 10 - 5).toFixed(2);

      return { price: randomPrice, change: randomChange };
    }

    const { price, change_percent: change } = assetData.results[ticker];
    return { price, change };
  };
}
