import { Router } from 'express';
import { ObjectSchema } from 'joi';
import LoginController from '../controllers/login.controller';
import ValidationMiddleware from '../middlewares/validation.middleware';
import loginValidator from '../validators/login.validator';

export class LoginRoutes {
  private _router: Router;

  private _validator: ObjectSchema;

  constructor(router: Router = Router()) {
    this._router = router;
    this._validator = loginValidator;
  }

  public routes(): Router {
    const loginValidation = new ValidationMiddleware(this._validator);

    this._router.post(
      '/login',
      loginValidation.validate,
      LoginController.login,
    );

    return this._router;
  }
}

export default new LoginRoutes();
