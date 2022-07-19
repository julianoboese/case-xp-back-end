import { Router } from 'express';
import { ObjectSchema } from 'joi';
import RegisterController from '../controllers/register.controller';
import ValidationMiddleware from '../middlewares/validation.middleware';
import registerValidator from '../validators/register.validator';

export class RegisterRoutes {
  private _router: Router;

  private _validator: ObjectSchema;

  constructor(router: Router = Router()) {
    this._router = router;
    this._validator = registerValidator;
  }

  public routes(): Router {
    const registerValidation = new ValidationMiddleware(this._validator);

    this._router.post(
      '/register',
      registerValidation.validate,
      RegisterController.register,
    );

    return this._router;
  }
}

export default new RegisterRoutes();
