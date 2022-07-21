import { Router } from 'express';
import AssetController from '../controllers/asset.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ARoutes from './abs.routes';

export class AssetRoutes extends ARoutes {
  public routes(): Router {
    this.router.get(
      '/assets/all',
      AuthMiddleware.authenticate,
      AssetController.getAllAssets,
    );

    this.router.get(
      '/assets',
      AuthMiddleware.authenticate,
      AssetController.getAssets,
    );

    this.router.get(
      '/assets/:id',
      AuthMiddleware.authenticate,
      AssetController.getAsset,
    );

    return this.router;
  }
}

export default new AssetRoutes();
