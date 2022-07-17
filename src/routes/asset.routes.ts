import { Router } from 'express';
import AssetController from '../controllers/asset.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

class AssetRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.use(AuthMiddleware.authenticate);
    this._router.get('/ativos', AssetController.getAssets);
    this._router.get('/ativos/:id', AssetController.getAsset);

    return this._router;
  }
}

export default new AssetRoutes();
