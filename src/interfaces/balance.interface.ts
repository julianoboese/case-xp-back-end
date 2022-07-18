import { Decimal } from '@prisma/client/runtime';

export default interface IBalance {
  id: number,
  balance: Decimal,
}
