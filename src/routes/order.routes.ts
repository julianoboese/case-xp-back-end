import { Router } from 'express';
import { ObjectSchema } from 'joi';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ValidationMiddleware from '../middlewares/validation.middleware';
import orderValidator from '../validators/order.validator';

export class OrderRoutes {
  private _router: Router;

  private _validator: ObjectSchema;

  constructor(router: Router = Router()) {
    this._router = router;
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

export default new OrderRoutes();
