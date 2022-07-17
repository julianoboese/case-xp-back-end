import { Router } from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

class UserRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.get(
      '/user',
      AuthMiddleware.authenticate,
      UserController.getUser,
    );

    return this._router;
  }
}

export default new UserRoutes();
