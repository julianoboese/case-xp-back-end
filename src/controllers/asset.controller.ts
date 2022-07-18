import { Request, Response } from 'express';
import AssetService from '../services/asset.service';

export default class AssetController {
  public static getAllAssets = async (_req: Request, res: Response): Promise<void> => {
    const assets = await AssetService.getAllAssets();

    res.status(200).json(assets);
  };

  public static getAssets = async (_req: Request, res: Response): Promise<void> => {
    const userAssets = await AssetService.getAssets(res.locals.user.id);

    res.status(200).json(userAssets);
  };

  public static getAsset = async (req: Request, res: Response): Promise<void> => {
    const userAsset = await AssetService.getAsset(res.locals.user.id, Number(req.params.id));

    res.status(200).json(userAsset);
  };
}
