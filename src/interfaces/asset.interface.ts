import { UserAsset } from '@prisma/client';

export default interface IUserAsset extends UserAsset {
  ticker: string,
  price: number;
  change: number;
}
