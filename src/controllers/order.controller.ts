import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public static buyAsset = async (req: Request, res: Response): Promise<void> => {
    const position = await OrderService.buyAsset({ userId: res.locals.user.id, ...req.body });

    res.status(200).json(position);
  };

  public static sellAsset = async (req: Request, res: Response): Promise<void> => {
    const position = await OrderService.sellAsset({ userId: res.locals.user.id, ...req.body });

    res.status(200).json(position);
  };
}
