import { Operation } from '@prisma/client';

export default interface IOperation extends Omit<Operation, 'amount' | 'createdAt'> {
  ticker: string | null,
  amount: number,
  createdAt: string,
}
