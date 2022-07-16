import { Router } from 'express';
import { ObjectSchema } from 'joi';
import LoginController from '../controllers/login.controller';
import ValidationMiddleware from '../middlewares/validation.middleware';
import loginValidator from '../validators/login.validator';

class LoginRoutes {
  private _router: Router;

  private _validator: ObjectSchema;

  constructor() {
    this._router = Router();
    this._validator = loginValidator;
  }

  public routes(): Router {
    const loginValidation = new ValidationMiddleware(this._validator);

    this._router.post('/login', loginValidation.validate, LoginController.login);

    return this._router;
  }
}

export default new LoginRoutes();
