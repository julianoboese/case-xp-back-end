import { Type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import prismaMock from '../../prisma.mock';
import OperationService from '../../../src/services/operation.service';

describe('The AssetService getAllAssets function', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return the user assets', async () => {
    const operationsMock = [
      {
        id: 1,
        userId: 1,
        assetId: null,
        quantity: null,
        type: Type.DEPOSIT,
        amount: 4000 as unknown as Decimal,
        createdAt: '2022-07-22T16:19:40.396' as unknown as Date,
      },
      {
        id: 1,
        userId: 1,
        assetId: 1,
        type: Type.BUY,
        quantity: 100,
        amount: -2300.52 as unknown as Decimal,
        createdAt: '2022-07-22T16:19:43.396' as unknown as Date,
      },
    ];

    prismaMock.operation.findMany.mockResolvedValue(operationsMock);

    const assets = await OperationService.getOperations(1);

    expect(assets).toEqual(operationsMock);
  });
});
