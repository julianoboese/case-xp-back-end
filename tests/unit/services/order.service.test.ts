import prismaMock from '../prisma.mock';
import OrderService from '../../../src/services/order.service';
import AccountService from '../../../src/services/account.service';

describe('The OrderService buyAsset function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should throw an error if the asset is unavailable at the broker', async () => {
    prismaMock.asset.findUnique.mockResolvedValue(null);

    const order = {
      userId: 1,
      assetId: 1000000000,
      quantity: 100,
      price: 25.56,
    };

    await expect(OrderService.buyAsset(order)).rejects.toThrow(
      'Ativo indisponível na corretora.',
    );
  });

  it("should throw an error if the broker doesn't have enough quantity", async () => {
    const assetMock = {
      id: 1,
      name: 'Petrorio',
      ticker: 'PRIO3',
      quantity: 1000,
    };

    prismaMock.asset.findUnique.mockResolvedValue(assetMock);

    const order = {
      userId: 1,
      assetId: 1,
      quantity: 1100,
      price: 25.56,
    };

    await expect(OrderService.buyAsset(order)).rejects.toThrow(
      'Quantidade indisponível na corretora.',
    );
  });

  it("should throw an error if the user doesn't have enough funds", async () => {
    const assetMock = {
      id: 1,
      name: 'Petrorio',
      ticker: 'PRIO3',
      quantity: 1000000000,
    };

    prismaMock.asset.findUnique.mockResolvedValue(assetMock);

    const balance = {
      id: 1,
      balance: 2000.0,
    };

    jest.spyOn(AccountService, 'getBalance').mockResolvedValue(balance);

    const order = {
      userId: 1,
      assetId: 1,
      quantity: 100,
      price: 25.56,
    };

    await expect(OrderService.buyAsset(order)).rejects.toThrow(
      'Saldo insuficiente.',
    );
  });

  it('should return the new asset position if the order is successful', async () => {
    const assetMock = {
      id: 1,
      name: 'Localiza',
      ticker: 'RENT3',
      quantity: 1000000000,
    };

    prismaMock.asset.findUnique.mockResolvedValue(assetMock);

    const balance = {
      id: 1,
      balance: 5000.0,
    };

    jest.spyOn(AccountService, 'getBalance').mockResolvedValue(balance);

    const expectedReturn = {
      userId: 1,
      assetId: 3,
      quantity: 100,
    };

    prismaMock.$transaction.mockResolvedValue([expectedReturn, null]);

    const order = {
      userId: 1,
      assetId: 3,
      quantity: 100,
      price: 25.56,
    };

    const position = await OrderService.buyAsset(order);

    expect(position).toEqual(expectedReturn);
  });

  it('should return the updated asset position if the order is successful', async () => {
    const assetMock = {
      id: 1,
      name: 'Petrorio',
      ticker: 'PRIO3',
      quantity: 1000000000,
    };

    prismaMock.asset.findUnique.mockResolvedValue(assetMock);

    const expectedReturn = {
      userId: 1,
      assetId: 1,
      quantity: 300,
    };

    prismaMock.$transaction.mockResolvedValue([expectedReturn, null]);

    const order = {
      userId: 1,
      assetId: 1,
      quantity: 100,
      price: 25.56,
    };

    const position = await OrderService.buyAsset(order);

    expect(position).toEqual(expectedReturn);
  });
});

describe('The OrderService sellAsset function', () => {
  afterEach(() => jest.clearAllMocks());

  it("should throw an error if user doesn't have the asset", async () => {
    prismaMock.userAsset.findUnique.mockResolvedValue(null);

    const order = {
      userId: 1,
      assetId: 1,
      quantity: 100,
      price: 25.56,
    };

    await expect(OrderService.sellAsset(order)).rejects.toThrow(
      'Ativo não consta na carteira.',
    );
  });

  it("should throw an error if user doesn't have enough quantity", async () => {
    const userAssetMock = {
      userId: 1,
      assetId: 1,
      quantity: 100,
    };

    prismaMock.userAsset.findUnique.mockResolvedValue(userAssetMock);

    const order = {
      userId: 1,
      assetId: 1,
      quantity: 200,
      price: 25.56,
    };

    await expect(OrderService.sellAsset(order)).rejects.toThrow(
      'Quantidade insuficiente na carteira.',
    );
  });

  it('should return the updated asset position if the order is successful', async () => {
    const userAssetMock = {
      userId: 1,
      assetId: 1,
      quantity: 300,
    };

    prismaMock.userAsset.findUnique.mockResolvedValue(userAssetMock);

    const expectedReturn = {
      userId: 1,
      assetId: 1,
      quantity: 200,
    };

    prismaMock.$transaction.mockResolvedValue([expectedReturn, null]);

    const order = {
      userId: 1,
      assetId: 1,
      quantity: 100,
      price: 25.56,
    };

    const position = await OrderService.sellAsset(order);

    expect(position).toEqual(expectedReturn);
  });
});
