import { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import Routes from './routes';

export class UserRoutes extends Routes {
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
