import { Request, Response } from 'express';
import AssetsService from '../services/assets.service';

export default class AssetsController {
  public static getAssets = async (_req: Request, res: Response): Promise<void> => {
    const userAssets = await AssetsService.getAssets(res.locals.user.id);

    res.status(200).json(userAssets);
  };

  public static getAsset = async (req: Request, res: Response): Promise<void> => {
    const userAsset = await AssetsService.getAsset(res.locals.user.id, Number(req.params.id));

    res.status(200).json(userAsset);
  };
}
