import { Operation } from '@prisma/client';

export default interface IOperation extends Omit<Operation, 'createdAt'> {
  createdAt: string,
}
