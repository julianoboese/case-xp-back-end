import { Router } from 'express';
import { ObjectSchema } from 'joi';
import AccountController from '../controllers/account.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ValidationMiddleware from '../middlewares/validation.middleware';
import accountValidator from '../validators/account.validator';

class AccountRoutes {
  private _router: Router;

  private _validator: ObjectSchema;

  constructor() {
    this._router = Router();
    this._validator = accountValidator;
  }

  public routes(): Router {
    const accountValidation = new ValidationMiddleware(this._validator);

    this._router.get(
      '/account',
      AuthMiddleware.authenticate,
      AccountController.getBalance,
    );

    this._router.post(
      '/account/deposit',
      AuthMiddleware.authenticate,
      accountValidation.validate,
      AccountController.deposit,
    );

    this._router.post(
      '/account/withdraw',
      AuthMiddleware.authenticate,
      accountValidation.validate,
      AccountController.withdraw,
    );

    return this._router;
  }
}

export default new AccountRoutes();
