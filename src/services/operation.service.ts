import IOperation from '../interfaces/operation.interface';
import prisma from '../prisma';

export default class OperationService {
  public static getOperations = async (id: number): Promise<IOperation[]> => {
    const operations = await prisma.operation.findMany({
      where: { userId: id },
    });

    const formattedOperations = Promise.all(
      operations.map(async (operation) => {
        let asset;
        if (operation.assetId) {
          asset = await prisma.asset.findUnique({
            where: { id: operation.assetId },
            select: { ticker: true },
          });
        }

        return {
          ...operation,
          ticker: asset?.ticker || null,
          amount: Number(operation.amount),
          createdAt: operation.createdAt.toLocaleString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          }),
        };
      }),
    );

    return formattedOperations;
  };
}
