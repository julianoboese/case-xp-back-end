import { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ARoutes from './abs.routes';

export class UserRoutes extends ARoutes {
  public routes(): Router {
    this.router.get(
      '/user',
      AuthMiddleware.authenticate,
      UserController.getUser,
    );

    return this.router;
  }
}

export default new UserRoutes();
