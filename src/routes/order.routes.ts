import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import orderValidator from '../validators/order.validator';
import AValidatedRoutes from './abs.validated.routes';

export class OrderRoutes extends AValidatedRoutes {
  public routes(): Router {
    this.router.post(
      '/order/buy',
      AuthMiddleware.authenticate,
      this.validation.validate,
      OrderController.buyAsset,
    );

    this.router.post(
      '/order/sell',
      AuthMiddleware.authenticate,
      this.validation.validate,
      OrderController.sellAsset,
    );

    return this.router;
  }
}

export default new OrderRoutes(orderValidator);
