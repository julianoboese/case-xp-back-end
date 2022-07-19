import { Router } from 'express';
import AssetController from '../controllers/asset.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

export class AssetRoutes {
  private _router: Router;

  constructor(router: Router = Router()) {
    this._router = router;
  }

  public routes(): Router {
    this._router.get(
      '/assets/all',
      AuthMiddleware.authenticate,
      AssetController.getAllAssets,
    );

    this._router.get(
      '/assets',
      AuthMiddleware.authenticate,
      AssetController.getAssets,
    );

    this._router.get(
      '/assets/:id',
      AuthMiddleware.authenticate,
      AssetController.getAsset,
    );

    return this._router;
  }
}

export default new AssetRoutes();
