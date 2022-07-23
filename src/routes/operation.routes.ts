import { Router } from 'express';
import OperationController from '../controllers/operation.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import Routes from './routes';

export class OperationRoutes extends Routes {
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
