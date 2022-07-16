import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

class AccountRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.use(AuthMiddleware.authenticate);
    this._router.post('/investimentos/comprar', OrderController.buyAsset);
    this._router.post('/investimentos/vender', OrderController.sellAsset);

    return this._router;
  }
}

export default new AccountRoutes();
