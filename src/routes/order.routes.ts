import { Router } from 'express';
import { ObjectSchema } from 'joi';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ValidationMiddleware from '../middlewares/validation.middleware';
import orderValidator from '../validators/order.validator';

class AccountRoutes {
  private _router: Router;

  private _validator: ObjectSchema;

  constructor() {
    this._router = Router();
    this._validator = orderValidator;
  }

  public routes(): Router {
    const orderValidation = new ValidationMiddleware(this._validator);

    this._router.post(
      '/order/buy',
      AuthMiddleware.authenticate,
      orderValidation.validate,
      OrderController.buyAsset,
    );

    this._router.post(
      '/order/sell',
      AuthMiddleware.authenticate,
      orderValidation.validate,
      OrderController.sellAsset,
    );

    return this._router;
  }
}

export default new AccountRoutes();
