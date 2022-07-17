import { UserAsset } from '@prisma/client';

export default interface IUserAsset extends UserAsset {
  price: number;
  change: number;
}
