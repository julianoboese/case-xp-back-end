import { Router } from 'express';
import OperationController from '../controllers/operation.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ARoutes from './abs.routes';

export class OperationRoutes extends ARoutes {
  public routes(): Router {
    this.router.get(
      '/operations',
      AuthMiddleware.authenticate,
      OperationController.getOperations,
    );

    return this.router;
  }
}

export default new OperationRoutes();
