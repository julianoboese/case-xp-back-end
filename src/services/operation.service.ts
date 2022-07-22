import IOperation from '../interfaces/operation.interface';
import prisma from '../prisma';

export default class OperationService {
  public static getOperations = async (id: number): Promise<IOperation[]> => {
    const operations = await prisma.operation.findMany({
      where: { userId: id },
    });

    const timeAdjustedOperations = operations.map((operation) => ({
      ...operation,
      createdAt: operation.createdAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    }));

    return timeAdjustedOperations;
  };
}
