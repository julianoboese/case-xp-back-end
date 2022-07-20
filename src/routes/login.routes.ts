import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidator from '../validators/login.validator';
import AValidatedRoutes from './abs.validated.routes';

export class LoginRoutes extends AValidatedRoutes {
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
