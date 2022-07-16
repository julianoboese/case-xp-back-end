import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  public static buyAsset = async (req: Request, res: Response): Promise<void> => {
    const userOrder = await OrderService.buyAsset(req.body);

    res.status(200).json(userOrder);
  };

  public static sellAsset = async (req: Request, res: Response): Promise<void> => {
    const userAsset = await OrderService.sellAsset(req.body);

    res.status(200).json(userAsset);
  };
}
