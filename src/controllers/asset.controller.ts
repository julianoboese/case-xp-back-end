import { Asset } from '@prisma/client';
import { Request, Response } from 'express';
import IUserAsset from '../interfaces/asset.interface';
import AssetService from '../services/asset.service';

export default class AssetController {
  public static getAllAssets = async (_req: Request, res: Response): Promise<void> => {
    const assets: Omit<Asset, 'quantity'>[] = await AssetService.getAllAssets();

    res.status(200).json(assets);
  };

  public static getAssets = async (_req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const userAssets: IUserAsset[] = await AssetService.getAssets(id);

    res.status(200).json(userAssets);
  };

  public static getAsset = async (req: Request, res: Response): Promise<void> => {
    const { locals: { user: { id } } } = res;
    const userAsset: IUserAsset = await AssetService.getAsset(id, Number(req.params.id));

    res.status(200).json(userAsset);
  };
}
