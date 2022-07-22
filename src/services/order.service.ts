import { Type, UserAsset } from '@prisma/client';
import IOrder from '../interfaces/order.interface';
import prisma from '../prisma';
import HttpError from '../utils/http.error';
import AccountService from './account.service';

export default class OrderService {
  public static buyAsset = async (order: IOrder): Promise<UserAsset> => {
    const { userId, assetId, quantity, price } = order;
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });

    if (!asset) throw new HttpError(404, 'Ativo indisponível na corretora.');
    if (asset.quantity < quantity) throw new HttpError(422, 'Quantidade indisponível na corretora.');

    const { balance } = await AccountService.getBalance(userId);
    if (Number(balance) < price * quantity) throw new HttpError(422, 'Saldo insuficiente.');

    // A execução de uma ordem impacta nas 3 tabelas, sendo necessária uma transaction
    const [position] = await prisma.$transaction([
      // caso a PK já exista, "upsert" atualiza a posição, caso contrário cria uma nova linha
      prisma.userAsset.upsert({ where: { userId_assetId: { userId, assetId } },
        update: { quantity: { increment: quantity } },
        create: { userId, assetId, quantity } }),
      prisma.asset.update({ where: { id: assetId },
        data: { quantity: { decrement: quantity } } }),
      prisma.user.update({ where: { id: userId },
        data: { balance: { decrement: price * quantity } } }),
      prisma.operation.create({
        data: { userId, assetId, type: Type.BUY, quantity, amount: -price * quantity },
      }),
    ]);

    return position;
  };

  public static sellAsset = async (order: IOrder): Promise<UserAsset> => {
    const { userId, assetId, quantity, price } = order;
    const userAsset = await prisma.userAsset.findUnique({
      where: { userId_assetId: { userId, assetId } },
      include: { asset: true },
    });

    if (!userAsset || userAsset.quantity === 0) throw new HttpError(404, 'Ativo não consta na carteira.');
    if (userAsset.quantity < quantity) throw new HttpError(422, 'Quantidade insuficiente na carteira.');

    // A execução de uma ordem impacta nas 3 tabelas, sendo necessária uma transaction
    const [position] = await prisma.$transaction([
      prisma.userAsset.update({ where: { userId_assetId: { userId, assetId } },
        data: { quantity: { decrement: quantity } } }),
      prisma.asset.update({ where: { id: assetId },
        data: { quantity: { increment: quantity } } }),
      prisma.user.update({ where: { id: userId },
        data: { balance: { increment: price * quantity } } }),
      prisma.operation.create({
        data: { userId, assetId, type: Type.SELL, quantity, amount: price * quantity },
      }),
    ]);

    return position;
  };
}
