import { Router } from 'express';
import LoginController from '../controllers/login.controller';

class LoginRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.post('/login', LoginController.login);

    return this._router;
  }
}

export default new LoginRoutes();
