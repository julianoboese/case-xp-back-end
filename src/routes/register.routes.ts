import { Router } from 'express';
import RegisterController from '../controllers/register.controller';
import registerValidator from '../validators/register.validator';
import ValidatedRoutes from './validated.routes';

export class RegisterRoutes extends ValidatedRoutes {
  public routes(): Router {
    this.router.post(
      '/register',
      this.validation.validate,
      RegisterController.register,
    );

    return this.router;
  }
}

export default new RegisterRoutes(registerValidator);
