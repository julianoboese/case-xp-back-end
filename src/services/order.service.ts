import { UserAsset } from '@prisma/client';
import IOrder from '../interfaces/order.interface';
import prisma from '../prisma';

export default class OrderService {
  public static buyAsset = async (order: IOrder): Promise<UserAsset> => {
    const { userId, assetId, amount } = order;

    const position = await prisma.userAsset.upsert({
      where: { userId_assetId: { userId, assetId } },
      update: { quantity: { increment: amount } },
      create: { userId, assetId, quantity: amount },
    });

    return position;
  };

  public static sellAsset = async (order: IOrder): Promise<UserAsset> => {
    const { userId, assetId, amount } = order;

    const position = await prisma.userAsset.upsert({
      where: { userId_assetId: { userId, assetId } },
      update: { quantity: { decrement: amount } },
      create: { userId, assetId, quantity: -amount },
    });

    return position;
  };
}
