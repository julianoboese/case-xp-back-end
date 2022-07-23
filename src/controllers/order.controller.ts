import { UserAsset } from '@prisma/client';
import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public static buyAsset = async (req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const position: UserAsset = await OrderService.buyAsset({ userId: id, ...req.body });

    res.status(201).json(position);
  };

  public static sellAsset = async (req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const position: UserAsset = await OrderService.sellAsset({ userId: id, ...req.body });

    res.status(201).json(position);
  };
}
