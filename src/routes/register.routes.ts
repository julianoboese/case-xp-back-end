import { Router } from 'express';
import RegisterController from '../controllers/register.controller';

class RegisterRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
  }

  public routes(): Router {
    this._router.post('/register', RegisterController.register);

    return this._router;
  }
}

export default new RegisterRoutes();
