import { UserAsset } from '@prisma/client';
import IOrder from '../interfaces/order.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';

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

    const userAsset = await prisma.userAsset.findUnique({
      where: { userId_assetId: { userId, assetId } },
    });

    if (!userAsset) throw new HttpError(404, 'Ativo não consta na carteira.');

    if (userAsset.quantity < amount) throw new HttpError(400, 'Quantidade insuficiente na carteira.');

    const position = await prisma.userAsset.update({
      where: { userId_assetId: { userId, assetId } },
      data: { quantity: { decrement: amount } },
    });

    return position;
  };
}
