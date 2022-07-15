import { Router } from 'express';
import AssetsController from '../controllers/assets.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

class AssetsRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.use(AuthMiddleware.authenticate);
    this._router.get('/ativos', AssetsController.getAssets);
    this._router.get('/ativos/:id', AssetsController.getAsset);

    return this._router;
  }
}

export default new AssetsRoutes();
