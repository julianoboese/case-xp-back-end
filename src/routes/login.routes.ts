import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidator from '../validators/login.validator';
import ValidatedRoutes from './validated.routes';

export class LoginRoutes extends ValidatedRoutes {
  public routes(): Router {
    this.router.post(
      '/login',
      this.validation.validate,
      LoginController.login,
    );

    return this.router;
  }
}

export default new LoginRoutes(loginValidator);
