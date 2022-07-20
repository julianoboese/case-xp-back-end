import { Router } from 'express';
import AccountController from '../controllers/account.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import accountValidator from '../validators/account.validator';
import AValidatedRoutes from './abs.validated.routes';

export class AccountRoutes extends AValidatedRoutes {
  public routes(): Router {
    this.router.get(
      '/account',
      AuthMiddleware.authenticate,
      AccountController.getBalance,
    );

    this.router.post(
      '/account/deposit',
      AuthMiddleware.authenticate,
      this.validation.validate,
      AccountController.deposit,
    );

    this.router.post(
      '/account/withdraw',
      AuthMiddleware.authenticate,
      this.validation.validate,
      AccountController.withdraw,
    );

    return this.router;
  }
}

export default new AccountRoutes(accountValidator);
